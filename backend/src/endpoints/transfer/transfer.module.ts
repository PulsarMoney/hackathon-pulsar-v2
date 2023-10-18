import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransactionUtilsService } from 'src/utils/transaction.utils.service';
import { ApiRequestService } from 'src/common/api-request/api.request.service';

@Module({
  imports: [],
  providers: [TransferService, TransactionUtilsService, ApiRequestService],
  exports: [TransferService],
})
export class TransferModule {}
