import { Module } from '@nestjs/common';
import { DynamicModuleUtils } from 'src/utils/dynamic.module.utils';
import { AuthController } from './auth/auth.controller';
import { EndpointsServicesModule } from './endpoints.services.module';
import { ExampleController } from './example/example.controller';
import { TokensController } from './tokens/token.controller';
import { TransferController } from './transfer/transfer.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [EndpointsServicesModule],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
  controllers: [AuthController, ExampleController, TokensController, TransferController, UserController],
})
export class EndpointsControllersModule {}
