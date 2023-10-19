use multiversx_sc::types::Address;
use multiversx_sc_scenario::{rust_biguint, DebugApi, testing_framework::{BlockchainStateWrapper, ContractObjWrapper}, managed_egld_token_id,  managed_biguint, managed_token_id_wrapped};
use invoice_contract::*;


const WASM_PATH: &'static str = "output/invoice-contract.wasm";
pub const LOCKED_HATOM_TOKEN_ID: &[u8] = b"LKHTM-abcdef";


struct InvoiceContractSetup<InvoiceContractObjBuilder>
where 
    InvoiceContractObjBuilder: 
        'static + Copy + Fn() -> invoice_contract::ContractObj<DebugApi>,
{
    pub blockchain_wrapper: BlockchainStateWrapper,
    pub owner_address: Address,
    pub random_dude: Address,
    pub invoice_wrapper: ContractObjWrapper<invoice_contract::ContractObj<DebugApi>,InvoiceContractObjBuilder>,
}


fn setup_invoice_contract<InvoiceContractObjBuilder>(
    invoice_builder: InvoiceContractObjBuilder,
) -> InvoiceContractSetup<InvoiceContractObjBuilder> 
where 
    InvoiceContractObjBuilder: 
        'static + Copy + Fn() -> invoice_contract::ContractObj<DebugApi>,
{
    let rust_zero = rust_biguint!(0u64);
    let mut blockchain_wrapper = BlockchainStateWrapper::new();
    let owner_address = blockchain_wrapper.create_user_account(&rust_zero);
    let random_dude = blockchain_wrapper.create_user_account(&rust_zero);

    // Create the InvoiceContract account
    let invoice_wrapper = blockchain_wrapper.create_sc_account(
        &rust_zero,
        Some(&owner_address),
        invoice_builder,
        WASM_PATH,
    );

    // Define the initial fee and invoice_id
    let initial_fee = 20u64;
    let initial_invoice_id = 0u64;

    // Call the init function of the InvoiceContract
    blockchain_wrapper
        .execute_tx(&owner_address, &invoice_wrapper, &rust_zero, |sc| {
            sc.init(initial_fee, initial_invoice_id);
        })
        .assert_ok();

    // Optionally, add the contract account to the generated scenario
    blockchain_wrapper.add_mandos_set_account(invoice_wrapper.address_ref());

    blockchain_wrapper.set_esdt_balance(&random_dude, LOCKED_HATOM_TOKEN_ID, &rust_biguint!(150));
    blockchain_wrapper.set_esdt_balance(&owner_address, LOCKED_HATOM_TOKEN_ID, &rust_biguint!(150));

    InvoiceContractSetup {
        blockchain_wrapper,
        owner_address,
        random_dude,
        invoice_wrapper,
    }
}
 

#[test]
fn init_test() {
    // Define the builder function for the InvoiceContract
    
    // Call the setup function to initialize the blockchain state and deploy the InvoiceContract
    let setup = setup_invoice_contract(invoice_contract::contract_obj);
    setup.blockchain_wrapper.write_mandos_output("_generated_init.scen.json");
}




#[test]
fn test_add_invoice() {
    let mut setup = setup_invoice_contract(invoice_contract::contract_obj);

    let b_wrapper =&mut setup.blockchain_wrapper;
    let owner = &setup.owner_address;
   
    let nonce = 0u64;

    // Call the add_invoice method on the contract
    b_wrapper.execute_tx(&setup.random_dude, &setup.invoice_wrapper, &rust_biguint!(0u64), |sc| {
        sc.add_invoice(owner.clone().into(), managed_egld_token_id!(), nonce, managed_biguint!(100));
    }).assert_ok();

    // Query the contract to retrieve the added invoice
    b_wrapper.execute_query(&setup.invoice_wrapper, |sc| {
        let invoice = sc.invoices(0u64).get();
        // Assert that the invoice has been added with the expected values
        assert_eq!(invoice.creator, owner.clone().into());
        assert_eq!(invoice.token_identifier, managed_egld_token_id!());
        assert_eq!(invoice.nonce, nonce);
        assert_eq!(invoice.amount, managed_biguint!(100));
    }).assert_ok();
    

    // Optionally, write the generated scenario to a file
    setup.blockchain_wrapper.write_mandos_output("_generated_add_invoice.scen.json");
}



#[test]
fn test_add_two_invoices() {
    let mut setup = setup_invoice_contract(invoice_contract::contract_obj);

    let b_wrapper =&mut setup.blockchain_wrapper;
    let owner = &setup.owner_address;
   
    let nonce = 0u64;

    // Call the add_invoice method on the contract
    b_wrapper.execute_tx(&setup.random_dude, &setup.invoice_wrapper, &rust_biguint!(0u64), |sc| {
        sc.add_invoice(owner.clone().into(), managed_egld_token_id!(), nonce, managed_biguint!(100));
    }).assert_ok();

    // Call the add_invoice method on the contract
    b_wrapper.execute_tx(&setup.random_dude, &setup.invoice_wrapper, &rust_biguint!(0u64), |sc| {
        sc.add_invoice(owner.clone().into(), managed_egld_token_id!(), nonce, managed_biguint!(200));
    }).assert_ok();

    // Query the contract to retrieve the added invoice
    b_wrapper.execute_query(&setup.invoice_wrapper, |sc| {
        let invoice = sc.invoices(0u64).get();
        // Assert that the invoice has been added with the expected values
        assert_eq!(invoice.creator, owner.clone().into());
        assert_eq!(invoice.token_identifier, managed_egld_token_id!());
        assert_eq!(invoice.nonce, nonce);
        assert_eq!(invoice.amount, managed_biguint!(100));
    }).assert_ok();
    
     // Query the contract to retrieve the added invoice
     b_wrapper.execute_query(&setup.invoice_wrapper, |sc| {
        let invoice = sc.invoices(1u64).get();
        // Assert that the invoice has been added with the expected values
        assert_eq!(invoice.creator, owner.clone().into());
        assert_eq!(invoice.token_identifier, managed_egld_token_id!());
        assert_eq!(invoice.nonce, nonce);
        assert_eq!(invoice.amount, managed_biguint!(200));
    }).assert_ok();

    // Optionally, write the generated scenario to a file
    setup.blockchain_wrapper.write_mandos_output("_generated_add_invoice.scen.json");
}




#[test]
fn test_add_and_pay_invoice() {
    let mut setup = setup_invoice_contract(invoice_contract::contract_obj);

    let b_wrapper =&mut setup.blockchain_wrapper;
    let owner = &setup.owner_address;
   
    let nonce = 0u64;

    // Call the add_invoice method on the contract
    b_wrapper.execute_tx(&setup.random_dude, &setup.invoice_wrapper, &rust_biguint!(0u64), |sc| {
        sc.add_invoice(owner.clone().into(), managed_token_id_wrapped!(LOCKED_HATOM_TOKEN_ID), nonce, managed_biguint!(100));
    }).assert_ok();

    // Call the add_invoice method on the contract
    b_wrapper.execute_esdt_transfer(&setup.random_dude, &setup.invoice_wrapper, LOCKED_HATOM_TOKEN_ID, 0u64, 
    &rust_biguint!(100), |sc| {
        sc.pay_invoice(0u64, managed_token_id_wrapped!(LOCKED_HATOM_TOKEN_ID), nonce, managed_biguint!(100));
    }).assert_ok();

    

    // Query the contract to retrieve the added invoice
    b_wrapper.execute_query(&setup.invoice_wrapper, |sc| {
        assert!(sc.invoices(0u64).is_empty());
    }).assert_ok();

    // Optionally, write the generated scenario to a file
    setup.blockchain_wrapper.write_mandos_output("_generated_add_invoice.scen.json");
}




#[test]
fn test_fee() {
    let mut setup = setup_invoice_contract(invoice_contract::contract_obj);

    let b_wrapper =&mut setup.blockchain_wrapper;
    let owner = &setup.owner_address;

    let random_dude = &setup.random_dude;

   
    let nonce = 0u64;

    // Call the add_invoice method on the contract
    b_wrapper.execute_tx(&setup.random_dude, &setup.invoice_wrapper, &rust_biguint!(0u64), |sc| {
        sc.add_invoice(random_dude.clone().into(), managed_token_id_wrapped!(LOCKED_HATOM_TOKEN_ID), nonce, managed_biguint!(100));
    }).assert_ok();

    // Call the add_invoice method on the contract
    b_wrapper.execute_esdt_transfer(&setup.owner_address, &setup.invoice_wrapper, LOCKED_HATOM_TOKEN_ID, 0u64, 
    &rust_biguint!(100), |sc| {
        sc.pay_invoice(0u64, managed_token_id_wrapped!(LOCKED_HATOM_TOKEN_ID), nonce, managed_biguint!(100));
    }).assert_ok();

    b_wrapper.check_esdt_balance(owner, LOCKED_HATOM_TOKEN_ID, &rust_biguint!(52));
    b_wrapper.check_esdt_balance(random_dude, LOCKED_HATOM_TOKEN_ID, &rust_biguint!(248));

    // Optionally, write the generated scenario to a file
    setup.blockchain_wrapper.write_mandos_output("_generated_add_invoice.scen.json");
}

