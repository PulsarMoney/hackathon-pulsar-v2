import { ApiProperty } from '@nestjs/swagger';

export class ContractEndpointDto {
  @ApiProperty({
    description: 'The name of the endpoint in the contract',
    isArray: false,
    required: true,
    type: String,
  })
  readonly endpoint!: string;
}
