import { Module } from '@nestjs/common';
import { ExampleModule } from './example/example.module';
import { TokenModule } from './tokens/token.module';
import { TransferModule } from './transfer/transfer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ExampleModule, TokenModule, TransferModule, UserModule],
  exports: [ExampleModule, TokenModule, TransferModule, UserModule],
})
export class EndpointsServicesModule {}
