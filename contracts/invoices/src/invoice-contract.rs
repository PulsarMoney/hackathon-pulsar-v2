#![no_std]

multiversx_sc::imports!();

mod invoice;
use invoice::Invoice;

use invoice_state::InvoiceState;

mod invoice_state;

const FEE_DENOMINATOR: u64 = 10_000u64;
const MAX_FEE: u64 = 500u64;

#[multiversx_sc::contract]
pub trait InvoiceContract: multiversx_sc_modules::pause::PauseModule {
    #[init]
    fn init(&self, fee: u64, fee_address: ManagedAddress) {
        self.set_fee(fee);
        self.fee_address().set(&fee_address);
    }

    #[endpoint(addInvoice)]
    fn add_invoice(&self, creator: ManagedAddress, token_id: EgldOrEsdtTokenIdentifier, amount: BigUint, nonce: u64) -> SCResult<u64> {
        self.require_not_paused();

        require!(self.is_whitelisted(&token_id), "Cannot create invoice with {}, because it is not whitelisted!", token_id);

        let invoice_id = self.increment_invoice_id();

        let invoice = Invoice {
            creator,
            token_identifier: token_id,
            nonce,
            amount,
            state: InvoiceState::Pending,
        };
        self.invoices(invoice_id).set(&invoice);

        Ok(invoice_id)
    }

    #[endpoint(payInvoice)]
    #[payable("*")]
    fn pay_invoice(
        &self,
        invoice_id: u64,
        #[payment_token] token: EgldOrEsdtTokenIdentifier, 
        #[payment_nonce] nonce: u64,
        #[payment_amount] amount: BigUint
    ) {
        self.require_not_paused();

        let invoice = self.try_get_invoice(invoice_id);

        require!(invoice.state == InvoiceState::Pending, "Invoice is not pending.");

        let invoice_identifier = invoice.token_identifier.clone();
        let invoice_nonce = invoice.nonce.clone();
        let invoice_amount = invoice.amount.clone();

        require!(invoice_identifier == token, "Wrong token, wanted {}, got {}.", invoice_identifier, token);
        require!(invoice_nonce == nonce, "Wrong nonce, wanted {}, got {}.", invoice_nonce, nonce);
        require!(invoice_amount == amount, "Wrong amount, wanted {}, got {}.", invoice_amount, amount);

        let tax = amount.clone() * self.fee().get() / FEE_DENOMINATOR;

        let fee_address = self.fee_address().get();

        if tax.clone() > 0u64 {
            self.pay_egld_esdt(token.clone(), nonce, fee_address, tax.clone());
        }

        let amount_without_tax = invoice_amount.clone() - tax.clone();
        self.pay_egld_esdt(token, nonce, invoice.creator.clone(), amount_without_tax);
        let invoice = Invoice {
            creator: invoice.creator,
            token_identifier: invoice.token_identifier,
            nonce: invoice.nonce,
            amount: invoice.amount,
            state: InvoiceState::Paid,
        };
        self.invoices(invoice_id).set(&invoice);
    }

    #[endpoint(cancelInvoice)]
    fn cancel_invoice(&self, invoice_id: u64) {
        self.require_not_paused();

        let caller = self.blockchain().get_caller();
        let invoice = self.try_get_invoice(invoice_id);
        
        require!(invoice.creator == caller, "Only the creator can cancel the invoice.");
        require!(invoice.state == InvoiceState::Pending, "Invoice is not pending.");

        let invoice = Invoice {
            creator: invoice.creator,
            token_identifier: invoice.token_identifier,
            nonce: invoice.nonce,
            amount: invoice.amount,
            state: InvoiceState::Cancelled,
        };
        self.invoices(invoice_id).set(&invoice);
    }

    #[endpoint(setFee)]
    #[only_owner]
    fn set_fee(&self, fee: u64) {
        self.require_not_paused();

        require!(fee <= MAX_FEE, "Maximum fee exceeded.");

        self.fee().set(fee);
    }

    #[endpoint(whitelistToken)]
    #[only_owner]
    fn whitelist_token_internal(&self, token: EgldOrEsdtTokenIdentifier) {
        require!(!self.is_whitelisted(&token), "Cannot whitelist {} twice!", token);
        
        // if !self.pending_whitelist_requests(&token).is_empty() {
        //     self.clear_pending_and_send_fee_to(&token, self.fee_address().get());
        // } 

        self.whitelisted_tokens_and_collections().insert(token);
    }

    #[endpoint(unwhitelistToken)]
    #[only_owner]
    fn unwhitelist_token_internal(&self, token: EgldOrEsdtTokenIdentifier) {
        require!(self.is_whitelisted(&token), "Cannot unwhitelist because it is not whitelisted!");
        
        self.whitelisted_tokens_and_collections().swap_remove(&token);
    }

    fn try_get_invoice(&self, invoice_id: u64) -> Invoice<Self::Api> {
        require!(!self.invoices(invoice_id).is_empty(), "Invoice with id: {}, does not exist.", invoice_id);
        let invoice = self.invoices(invoice_id).get();

        invoice
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

    fn increment_invoice_id(&self) -> u64 {
        let invoice_id = self.invoice_id().get();
        self.invoice_id().set(&invoice_id + 1);

        invoice_id + 1
    }

    fn is_whitelisted(&self, token: &EgldOrEsdtTokenIdentifier) -> bool {
        self.whitelisted_tokens_and_collections().contains(token)
    }

    #[view(getInvoiceStatus)]
    fn get_invoice_status(&self, invoice_id: u64) -> InvoiceState {
        let invoice = self.try_get_invoice(invoice_id);
        
        invoice.state
    }

    #[view(getFee)]
    #[storage_mapper("fee")]
    fn fee(&self) -> SingleValueMapper<u64>;

    #[view(getFeeAddress)]
    #[storage_mapper("fee_address")]
    fn fee_address(&self) -> SingleValueMapper<ManagedAddress>;

    #[view(getInvoiceId)]
    #[storage_mapper("invoice_id")]
    fn invoice_id(&self) -> SingleValueMapper<u64>;

    #[view(getInvoice)]
    #[storage_mapper("invoices")]
    fn invoices(&self, invoice_id: u64) -> SingleValueMapper<Invoice<Self::Api>>;

    #[view(getWhitelistedTokensAndCollections)]
    #[storage_mapper("whitelisted_tokens_and_collections")]
    fn whitelisted_tokens_and_collections(&self) -> UnorderedSetMapper<EgldOrEsdtTokenIdentifier>;
}
