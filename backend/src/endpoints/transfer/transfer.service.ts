import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/common/api-config/api.config.service';

import { ConvertersUtils } from 'src/utils/ConvertersUtils';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { AddressUtils, BinaryUtils } from '@multiversx/sdk-nestjs-common';
import { Address } from '@multiversx/sdk-core/out/address';
import { GAS_LIMIT, getAccount } from 'src/utils/utils';
import { TransactionPayload } from '@multiversx/sdk-core/out';
import { TransactionUtilsService } from 'src/utils/transaction.utils.service';

import { ApiRequestService } from 'src/common/api-request/api.request.service';
import { ContractFunctions } from './contractFunctions';

@Injectable()
export class TransferService {
  constructor(
    private readonly apiConfigService: ApiConfigService,
    private readonly transactionUtilsService: TransactionUtilsService,
    private readonly apiRequestService: ApiRequestService,
  ) {}

  apiUrl = this.apiConfigService.getApiUrl();
  networkProvider = new ProxyNetworkProvider(this.apiUrl);
  scAddressString = this.apiConfigService.getPulsarPageContract();
  scAddress = new Address(this.scAddressString);

  updateContractTx = async (endpoint: string, payload: string | number, ownerAddress: string) => {
    const ownerAccount = await getAccount(ownerAddress, this.networkProvider);
    const transactionPayload = this.processPayload(payload);
    return this.transactionUtilsService.createFinalTransaction(
      ownerAccount.nonce,
      undefined,
      ownerAccount.address,
      Address.fromString(this.apiConfigService.getPulsarPageContract()),
      GAS_LIMIT,
      new TransactionPayload(`${endpoint}@${transactionPayload}`),
      this.transactionUtilsService.currentChain,
    );
  };

  processPayload = (payload: string | number): string | undefined => {
    if (typeof payload === 'number') {
      return ConvertersUtils.numberToHex(payload);
    }
    if (AddressUtils.isAddressValid(payload)) {
      return ConvertersUtils.addressToHex(payload);
    }
    return ConvertersUtils.stringToHex(payload.toString());
  };

  getFeePercentage = async () => {
    const result = await this.apiRequestService.vmQueryFunctionWithArgs(
      this.apiConfigService.getPulsarPageContract(),
      ContractFunctions.GET_FEE_PERCENTAGE,
      [],
    );
    const parsed = BinaryUtils.hexToNumber(result);
    return parsed;
  };

  getFeeAddress = async () => {
    const result = await this.apiRequestService.vmQueryFunctionWithArgs(
      this.apiConfigService.getPulsarPageContract(),
      ContractFunctions.GET_FEE_ADDRESS,
      [],
    );
    const parsed = BinaryUtils.hexToBase64(result);
    return BinaryUtils.base64ToAddress(parsed);
  };
}
