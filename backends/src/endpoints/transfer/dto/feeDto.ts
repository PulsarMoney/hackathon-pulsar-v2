import { ApiProperty } from '@nestjs/swagger';
import { ContractEndpointDto } from './contractEndpointDto';

export class FeeDto extends ContractEndpointDto {
  @ApiProperty({
    description: 'The fee percentage',
    isArray: false,
    required: true,
    type: Number,
  })
  readonly feePercentage!: number;
}
