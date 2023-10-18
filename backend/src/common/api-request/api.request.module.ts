import { MetricsModule } from '@multiversx/sdk-nestjs-monitoring';
import { Global, Module } from '@nestjs/common';
import { ApiRequestService } from './api.request.service';
import { ApiConfigModule } from '../api-config/api.config.module';

@Global()
@Module({
  imports: [MetricsModule],
  providers: [ApiRequestService],
  exports: [ApiRequestService],
})
export class ApiRequestModule {}
