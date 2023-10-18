import { ApiProperty } from '@nestjs/swagger';
import { ContractEndpointDto } from './contractEndpointDto';

export class WhitelistTransactionDto extends ContractEndpointDto {
  @ApiProperty({
    description: 'The identifier of the token',
    isArray: false,
    required: true,
    type: String,
  })
  readonly tokenIdentifier!: string;
}
