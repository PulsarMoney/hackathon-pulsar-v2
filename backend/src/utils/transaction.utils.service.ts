import {
  IAddress,
  INonce,
  IPlainTransactionObject,
  ITransactionValue,
  Transaction,
  TransactionPayload,
} from '@multiversx/sdk-core/out';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/common/api-config/api.config.service';
// import { GAS_LIMIT } from './utils';

@Injectable()
export class TransactionUtilsService {
  constructor(private readonly apiConfigService: ApiConfigService) {}

  currentChain = this.apiConfigService.getNetwork();
  GAS_LIMIT = 100000;

  createFinalTransaction(
    nonce: INonce,
    value: ITransactionValue | undefined,
    receiver: IAddress,
    sender: IAddress,
    gasLimit: number,
    data: TransactionPayload,
    chainID: string,
  ): IPlainTransactionObject {
    return new Transaction({
      nonce,
      value,
      receiver,
      sender,
      gasLimit,
      data,
      chainID,
    }).toPlainObject();
  }
}
