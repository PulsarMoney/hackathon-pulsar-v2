use crate::{invoice_state::InvoiceState};


multiversx_sc::derive_imports!();
multiversx_sc::imports!();

#[derive(NestedEncode, NestedDecode, TypeAbi, TopEncode, TopDecode, Clone)]
pub struct Invoice<M: ManagedTypeApi> {
  pub creator: ManagedAddress<M>,
  pub token_identifier: EgldOrEsdtTokenIdentifier<M>,
  pub nonce: u64,
  pub amount: BigUint<M>,
  pub state: InvoiceState,
}



