#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

mod payment;
use payment::Payment;

const FEE_DENOMINATOR: u64 = 10_000u64;
const MAX_FEE: u64 = 500u64;
const MINIMUM_DURATION: u64 = 300u64; // 5 minutes

#[multiversx_sc::contract]
pub trait PaymentLinks{
    #[init]
    fn init(&self, fee: u64, fee_address: ManagedAddress) {
        self.set_fee(fee);
        self.fee_address().set(&fee_address);
    }

    #[endpoint(create)]
    #[payable("*")]
    fn create_payment_link(
        &self,
        duration: u64,
        #[payment_token] token: EgldOrEsdtTokenIdentifier, 
        #[payment_nonce] nonce: u64,
        #[payment_amount] amount_with_fee: BigUint,
    ) -> SCResult<u64> {
        require!(self.is_whitelisted(&token), "Cannot create payment link with {}, because it is not whitelisted!", token);
        require!(duration >= MINIMUM_DURATION, "Duration must be at least {} seconds.", MINIMUM_DURATION);

        let current_timestamp = self.blockchain().get_block_timestamp();
        let expiration_timestamp = current_timestamp + duration;
        let creator = self.blockchain().get_caller();

        let (amount, tax) = self.separate_amount_and_fee(amount_with_fee);

        let payment = Payment {
            token: token.clone(),
            nonce,
            amount,
            expiration_timestamp,
            creator
        };

        let id = self.increment_last_id();

        self.payment_links(id).set(&payment);

        let fee_address = self.fee_address().get();
        self.pay_egld_esdt(token, nonce, fee_address, tax.clone());

        Ok(id)
    }

    #[endpoint(claim)]
    #[only_owner]
    fn claim_payment(&self, id: u64, address: ManagedAddress) {
        let current_timestamp = self.blockchain().get_block_timestamp();
        let payment = self.try_get_payment(id);
        let caller = self.blockchain().get_caller();
        let owner = self.blockchain().get_owner_address();

        require!(current_timestamp <= payment.expiration_timestamp, "Payment link expired.");
        require!(payment.creator != address, "The creator of the payment link cannot claim it.");
        require!(caller == owner, "Only the owner can call this function!");

        self.send_payment(id, address);
    }

    #[endpoint(withdraw)]
    fn withdraw_payment(&self, id: u64) {
        // let current_timestamp = self.blockchain().get_block_timestamp();
        let payment = self.try_get_payment(id);
        let caller = self.blockchain().get_caller();

        // require!(current_timestamp > payment.expiration_timestamp, "Payment link has not expired yet.");
        require!(payment.creator == caller, "Only the creator of the payment can withdraw the payment.");

        self.send_payment(id, payment.creator);
    }

    #[endpoint(whitelistToken)]
    #[only_owner]
    fn whitelist_token_internal(&self, token: EgldOrEsdtTokenIdentifier) {
        require!(!self.is_whitelisted(&token), "Cannot whitelist {} twice!", token);
        let caller = self.blockchain().get_caller();
        let owner = self.blockchain().get_owner_address();

        require!(caller == owner, "Only the owner can whitelist tokens!");
        // if !self.pending_whitelist_requests(&token).is_empty() {
        //     self.clear_pending_and_send_fee_to(&token, self.fee_address().get());
        // } 

        self.whitelisted_tokens_and_collections().insert(token);
    }

    #[endpoint(unwhitelistToken)]
    #[only_owner]
    fn unwhitelist_token_internal(&self, token: EgldOrEsdtTokenIdentifier) {
        require!(self.is_whitelisted(&token), "Cannot unwhitelist because it is not whitelisted!");
        let caller = self.blockchain().get_caller();
        let owner = self.blockchain().get_owner_address();

        require!(caller == owner, "Only the owner can unwhitelist tokens!");
        
        self.whitelisted_tokens_and_collections().swap_remove(&token);
    }

    #[endpoint(setFee)]
    #[only_owner]
    fn set_fee(&self, fee: u64) {
        require!(fee <= MAX_FEE, "Maximum fee exceeded.");

        self.fee().set(fee);
    }

    fn separate_amount_and_fee(&self, amount_with_fee: BigUint) -> (BigUint, BigUint) {
        let fee = self.fee().get();
        
        let denom = FEE_DENOMINATOR + &fee;
        let tax = &amount_with_fee * fee / denom;
        let amount = amount_with_fee - &tax;

        (amount, tax)
    }

    fn is_whitelisted(&self, token: &EgldOrEsdtTokenIdentifier) -> bool {
        self.whitelisted_tokens_and_collections().contains(token)
    }

    fn send_payment(&self, id: u64, address: ManagedAddress) {
        let payment = self.try_get_payment(id);

        self.pay_egld_esdt(payment.token, payment.nonce, address, payment.amount);
        self.payment_links(id).clear();
    }

    fn pay_egld_esdt(&self, token: EgldOrEsdtTokenIdentifier, nonce: u64, receiver: ManagedAddress, amount: BigUint) {
        if amount == 0u32 {
            return;
        }
        
        if token.is_egld() {
            self.send().direct_egld(&receiver, &amount);
        } else {
            self.send().direct_esdt(&receiver, &token.unwrap_esdt(), nonce, &amount);
        }
    }

    fn try_get_payment(&self, id: u64) -> Payment<Self::Api> {
        require!(!self.payment_links(id).is_empty(), "Payment link with id: {}, does not exist.", id);
        let payment = self.payment_links(id).get();

        payment
    }

    fn increment_last_id(&self) -> u64 {
        let last_id = self.last_id().get();
        self.last_id().set(&last_id + 1);

        last_id + 1
    }


    #[view(getFee)]
    #[storage_mapper("fee")]
    fn fee(&self) -> SingleValueMapper<u64>;

    #[view(getMinimumDuration)]
    fn get_minimum_duration(&self) -> u64 {
        MINIMUM_DURATION
    }

    #[view(getFeeAddress)]
    #[storage_mapper("fee_address")]
    fn fee_address(&self) -> SingleValueMapper<ManagedAddress>;

    #[storage_mapper("last_id")]
    fn last_id(&self) -> SingleValueMapper<u64>;

    #[view(getPaymentLinks)]
    #[storage_mapper("payment_links")]
    fn payment_links(&self, identifier: u64) -> SingleValueMapper<Payment<Self::Api>>;

    #[view(getWhitelistedTokensAndCollections)]
    #[storage_mapper("whitelisted_tokens_and_collections")]
    fn whitelisted_tokens_and_collections(&self) -> UnorderedSetMapper<EgldOrEsdtTokenIdentifier>;
}