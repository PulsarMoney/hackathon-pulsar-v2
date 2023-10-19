multiversx_sc::derive_imports!();
multiversx_sc::imports!();

#[derive(NestedEncode, NestedDecode, TypeAbi, TopEncode, TopDecode, ManagedVecItem, Clone)]
pub struct Payment<M: ManagedTypeApi> {
  pub token: EgldOrEsdtTokenIdentifier<M>,
  pub nonce: u64,
  pub amount: BigUint<M>,
  pub expiration_timestamp: u64,
  pub creator: ManagedAddress<M>,
}
