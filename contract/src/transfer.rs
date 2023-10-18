#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

const FEE_DENOMINATOR: u64 = 10_000;
const MAX_FEE: u64 = 2500;

const ONE: u64 = 1u64;

const BRONZE_TIER_PATH: &[u8] = b"https://ipfs.io/ipfs/QmXzbh1rhM5ep879buDkySWBm8MKEBEsyWbSNSe47TS5KX";
const SILVER_TIER_PATH: &[u8] = b"https://ipfs.io/ipfs/QmXzbh1rhM5ep879buDkySWBm8MKEBEsyWbSNSe47TS5KX";
const GOLD_TIER_PATH: &[u8] = b"https://ipfs.io/ipfs/QmXzbh1rhM5ep879buDkySWBm8MKEBEsyWbSNSe47TS5KX";

#[multiversx_sc::contract]
pub trait TransferContract {

    #[init]
    fn init(&self, fee_percentage: u32, fee_address: ManagedAddress) {
        self.set_fee_percentage(fee_percentage);
        self.set_fee_address(fee_address);
    }

    #[endpoint(setFeePercentage)]
    #[only_owner]
    fn set_fee_percentage(&self, fee_percentage: u32) {
        require!(fee_percentage >= 0 as u32, "The fee percentage can't be a negative number!");
        require!(fee_percentage <= MAX_FEE as u32, "The fee percentage can't be higher than 2.5%!");
        self.fee_percentage().set(fee_percentage)
    }

    #[endpoint(setFeeAddress)]
    #[only_owner]
    fn set_fee_address(&self, fee_address: ManagedAddress) {
        self.fee_address().set(&fee_address)
    }

    #[only_owner]
    #[endpoint(setNftIdentifier)]
    fn set_nft_identifier(&self, nft_identifier: EgldOrEsdtTokenIdentifier) {
        self.nft_identifier().set(nft_identifier);
    }

    #[endpoint(addTokenToWhitelist)]
    #[only_owner]
    fn add_token_to_whitelist(&self, token: EgldOrEsdtTokenIdentifier) {
        require!(!self.is_whitelisted(&token), "The token is already whitelisted!");
        self.whitelisted_tokens().insert(token);
    }

    #[endpoint(removeTokenFromWhitelist)]
    #[only_owner]
    fn remove_token_from_whitelist(&self, token: EgldOrEsdtTokenIdentifier) {
        require!(self.is_whitelisted(&token), "Can't remove token from whitelist, as it is not whitelisted!");
        self.whitelisted_tokens().swap_remove(&token);
    }

    #[endpoint(setNftPrice)]
    #[only_owner]
    fn set_nft_price(&self, price: BigUint, nft_path: ManagedBuffer) {
        self.nft_path(price).set(nft_path);
    }

    #[endpoint(setInitialPrices)]
    #[only_owner]
    fn set_initial_prices(&self)  {
        self.set_nft_price(BigUint::from(100000000u32), ManagedBuffer::from(BRONZE_TIER_PATH));
        self.set_nft_price(BigUint::from(200000000u32), ManagedBuffer::from(SILVER_TIER_PATH));
        self.set_nft_price(BigUint::from(400000000u32), ManagedBuffer::from(GOLD_TIER_PATH));
    }

    #[endpoint(buyNft)]
    #[payable("EGLD")]
    fn buy_nft(&self, influencer_address: ManagedAddress) {
        let price = self.call_value().egld_value().clone_value();

        let nft_path = self.nft_path(price.clone()).get();
        require!(nft_path.len() > 0, "No NFT available for this price!");

        let uris: ManagedVec<ManagedBuffer> = ManagedVec::from_single_item(ManagedBuffer::from(nft_path));
        let nft_token_id = self.nft_identifier().get().unwrap_esdt();

        let serialized_attributes = ManagedBuffer::new();
        let attributes_sha256 = self.crypto().sha256(&serialized_attributes);
        let attributes_hash = attributes_sha256.as_managed_buffer();
        let attributes: ManagedVec<ManagedBuffer> = ManagedVec::new();

        let nft_nonce = self.send().esdt_nft_create(
            &nft_token_id,
            &BigUint::from(ONE),
            &ManagedBuffer::from(b"bronze tier"),
            &BigUint::from(0u32),
            attributes_hash,
            &attributes,
            &uris,
        );
        // transfer nft to caller
        self.send().direct_esdt(&self.blockchain().get_caller(), &nft_token_id, nft_nonce, &BigUint::from(ONE));
        // transfer egld to influencer

        self.transfer_with_fee(&influencer_address, &price, EgldOrEsdtTokenIdentifier::egld(), 0u64);

        // self.send().direct_egld(self.blockchain().get_caller(), &price);
    }

    // do something with "name" of an influencer, but do not allow to put anything, decentralized (do not allow to put anything, benimincu for example, maybe a prewhitelist?)
    #[endpoint(register)]
    fn register(&self) {
        let influencer = self.blockchain().get_caller();    
        let is_registered = self.influencers().contains(&influencer);
        require!(!is_registered, "The influencer is already registered!");

        self.influencers().insert(influencer);
    }

    #[payable("*")]
    #[endpoint(transfer)]
    fn transfer(&self, receiver_address: &ManagedAddress) {
        let egld_value = self.call_value().egld_value().clone_value();
        if egld_value > 0u64 {
            let token = EgldOrEsdtTokenIdentifier::egld();
            self.transfer_with_fee(&receiver_address, &egld_value, token, 0u64);
        } else {
            let transfers = self.call_value()
                .all_esdt_transfers()
                .clone_value();

            for transfer in &transfers {
                let token = EgldOrEsdtTokenIdentifier::esdt(transfer.token_identifier);
                let transfer_amount = transfer.amount;
                self.transfer_with_fee(&receiver_address, &transfer_amount, token.clone(), transfer.token_nonce);
            }
        }
    }

    fn transfer_with_fee(&self, receiver: &ManagedAddress, amount: &BigUint, token: EgldOrEsdtTokenIdentifier, nonce: u64) {
        require!(self.whitelisted_tokens().contains(&token), "Can't transfer {} token as it is not whitelisted.", token);
        // require!(0u64 == 1u64, "{}", );
        let fee_amount = amount * &BigUint::from(self.fee_percentage().get()) / BigUint::from(FEE_DENOMINATOR);
        let remaining_amount = amount - &fee_amount;
        if fee_amount > 0u32 {
            self.pay_egld_esdt(token.clone(), nonce, &self.fee_address().get(), &fee_amount);
        }
        self.pay_egld_esdt(token.clone(), nonce, receiver, &remaining_amount);
    }

    fn pay_egld_esdt(&self, token: EgldOrEsdtTokenIdentifier, nonce: u64, receiver: &ManagedAddress, amount: &BigUint) {
        if token.is_egld() {
            self.send().direct_egld(receiver, amount);
        } else {
            self.send().direct_esdt(receiver, &token.unwrap_esdt(), nonce, amount);
        }
    }

    fn is_whitelisted(&self, token: &EgldOrEsdtTokenIdentifier) -> bool {
        self.whitelisted_tokens().contains(token)
    }

    #[view(getFeePercentage)]
    #[storage_mapper("feePercentage")]
    fn fee_percentage(&self) -> SingleValueMapper<u32>;

    #[view(getFeeAddress)]
    #[storage_mapper("feeAddress")]
    fn fee_address(&self) -> SingleValueMapper<ManagedAddress>;

    #[view(getWhitelistedTokens)]
    #[storage_mapper("whitelistedTokens")]
    fn whitelisted_tokens(&self) -> UnorderedSetMapper<EgldOrEsdtTokenIdentifier>;

    #[storage_mapper("nft_path")]
    fn nft_path(&self, price: BigUint) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("nft_identifier")]
    fn nft_identifier(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[storage_mapper("influencers")]
    fn influencers(&self) -> UnorderedSetMapper<ManagedAddress>;
}
