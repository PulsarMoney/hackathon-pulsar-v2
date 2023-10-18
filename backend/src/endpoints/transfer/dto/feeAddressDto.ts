import { ApiProperty } from '@nestjs/swagger';
import { ContractEndpointDto } from './contractEndpointDto';

export class FeeAddressDto extends ContractEndpointDto {
  @ApiProperty({
    description: 'The fee address, where the fee taken from each transaction will be sent',
    isArray: false,
    required: true,
    type: String,
  })
  readonly feeAddress!: string;
}
