import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransferService } from './transfer.service';
import { WhitelistTransactionDto } from './dto/whitelistTransactionDto';
import { FeeDto } from './dto/feeDto';
import { FeeAddressDto } from './dto/feeAddressDto';
import { NativeAuth, NativeAuthAdminGuard, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

@Controller('transfer')
@ApiTags('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/addTokenToWhitelist')
  @ApiResponse({
    status: 200,
    description: 'The caller of the endpoint can add a token to the whitelist of the contract',
  })
  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @ApiExcludeEndpoint()
  async addTokenToWhiteList(@Body() whitelistTransaction: WhitelistTransactionDto, @NativeAuth('address') ownerAddress: string) {
    return await this.transferService.updateContractTx(whitelistTransaction.endpoint, whitelistTransaction.tokenIdentifier, ownerAddress);
  }

  @Post('/removeTokenFromWhitelist')
  @ApiResponse({
    status: 200,
    description: 'The caller of the endpoint can remove a token from the whitelist of the contract',
  })
  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @ApiExcludeEndpoint()
  async removeTokenFromWhiteList(
    @Body() whitelistTransactionDto: WhitelistTransactionDto,
    @NativeAuth('ownerAddress') ownerAddress: string,
  ) {
    return await this.transferService.updateContractTx(
      whitelistTransactionDto.endpoint,
      whitelistTransactionDto.tokenIdentifier,
      ownerAddress,
    );
  }

  @Post('/setFeePercentage')
  @ApiResponse({
    status: 200,
    description: '',
  })
  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @ApiExcludeEndpoint()
  async setFeePercentage(@Body() feeDto: FeeDto, @NativeAuth('address') ownerAddress: string) {
    return await this.transferService.updateContractTx(feeDto.endpoint, feeDto.feePercentage, ownerAddress);
  }

  @Post('/setFeeAddress')
  @ApiResponse({
    status: 200,
    description: '',
  })
  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @ApiExcludeEndpoint()
  async setFeeAddress(@Body() feeAddressDto: FeeAddressDto, @NativeAuth('address') ownerAddress: string) {
    return await this.transferService.updateContractTx(feeAddressDto.endpoint, feeAddressDto.feeAddress, ownerAddress);
  }

  @Get('/getFeePercentage')
  @ApiResponse({
    status: 200,
    description: '',
  })
  async getFeePercentage() {
    return await this.transferService.getFeePercentage();
  }
}
