import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '../api-config/api.config.service';
import { AccountToken } from './entities/account.token';
import { CacheService } from '@multiversx/sdk-nestjs-cache';
import { Constants } from '@multiversx/sdk-nestjs-common';
import { ConvertersUtils } from 'src/utils/ConvertersUtils';
import axios from 'axios';
@Injectable()
export class ApiRequestService {
  constructor(private readonly apiConfigService: ApiConfigService, private readonly cachingService: CacheService) {}

  private async get(url: string): Promise<any> {
    const baseUrl = this.apiConfigService.getApiUrl();
    const { data } = await axios.get(`${baseUrl}/${url}`);

    return data;
  }

  private async post(url: string, body: any = {}): Promise<any> {
    const baseUrl = this.apiConfigService.getApiUrl();

    const { data } = await axios.post(`${baseUrl}/${url}`, body);

    return data;
  }

  async getAccountNfts(address: string): Promise<any[]> {
    return await this.get(`accounts/${address}/nfts?size=1000&type=NonFungibleESDT,SemiFungibleESDT`);
  }

  async getAccountTokens(address: string): Promise<AccountToken[]> {
    return await this.get(`accounts/${address}/tokens?includeMetaESDT=true&size=1000`);
  }

  async getAccountBalance(address: string): Promise<string> {
    const result = await this.get(`accounts/${address}`);

    return result.balance;
  }

  async getEgldPriceRaw(): Promise<number> {
    let baseUrl = this.apiConfigService.getApiUrl();
    if (baseUrl.includes('blast')) {
      baseUrl = 'https://api.multiversx.com';
    }

    const { data: price } = await axios.get(`${baseUrl}/economics?extract=price`);

    return price;
  }

  async getEgldPrice(): Promise<number> {
    return await this.cachingService.getOrSet(
      'tokenPrice:EGLD',
      async () => {
        const price = await this.getEgldPriceRaw();
        return price;
      },
      Constants.oneMinute() * 1,
    );
  }

  async getDexPairs(): Promise<any[]> {
    return await this.cachingService.getOrSet(`mexPairs`, async () => await this.get(`mex/pairs?size=100`), Constants.oneHour());
  }

  async getPrice(tokenIdentifier: string): Promise<number> {
    return await this.cachingService.getOrSet(
      `tokenPrice:${tokenIdentifier}`,
      async () => {
        if (tokenIdentifier.toUpperCase() === 'EGLD') {
          return await this.getEgldPriceRaw();
        }

        if (tokenIdentifier.split('-').length > 2) {
          return 0;
        }

        const price = await this.getTokenPriceRaw(tokenIdentifier);

        return price;
      },
      Constants.oneMinute() * 10,
    );
  }

  async getTokenPriceRaw(tokenId: string): Promise<number> {
    let baseUrl = this.apiConfigService.getApiUrl();
    if (baseUrl.includes('blast')) {
      baseUrl = 'https://api.multiversx.com';
    }

    const { data: price } = await axios.get(`${baseUrl}/tokens/${tokenId}?extract=price`);

    if (!price) {
      return 0;
    }

    return Number(price);
  }

  async vmQueryString(address: string, functionName: string): Promise<string> {
    const result = await this.vmQuery({
      scAddress: address,
      funcName: functionName,
    });
    return ConvertersUtils.base64Decode(result[0]);
  }

  private async vmQueryNumber(address: string, functionName: string): Promise<number> {
    const result = await this.vmQuery({
      scAddress: address,
      funcName: functionName,
    });
    if (!result || !result[0]) {
      return 0;
    }

    const zeroStrBase64 = 'MA==';
    const bigInt = ConvertersUtils.base64ToBigInt(result[0] || zeroStrBase64);

    return Number(bigInt);
  }

  private async vmQuery(query: any): Promise<any> {
    const result = await this.post(`vm-values/query`, query);

    return result.data.data.returnData;
  }

  async vmQueryFunctionWithArgs(address: string, functionName: string, args: string[]): Promise<string> {
    const result = await this.vmQuery({
      scAddress: address,
      funcName: functionName,
      args: args,
    });

    return ConvertersUtils.base64ToHex(result[0]);
  }
}
