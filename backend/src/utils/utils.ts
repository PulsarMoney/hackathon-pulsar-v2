import BigNumber from 'bignumber.js';
import { INetworkProvider } from '@multiversx/sdk-network-providers/out/interface';
import { Account, Address } from '@multiversx/sdk-core/out';

export const nominate = (value: number | string, decimals = 0): number => {
  if (decimals < 0) {
    throw Error('Decimals cannot be negative');
  }

  if (decimals > 18) {
    throw Error('Decimals cannot be greater than 18');
  }

  const nomination = 10 ** decimals;

  // IMPORVE THIS
  return Number(new BigNumber(value).dividedBy(new BigNumber(nomination)).toFixed(DECIMALS_FRONTEND));
};

export const getCurrentTimestamp = (): number => {
  return Math.round(Date.now() / 1000);
};

export const isEgld = (tokenName: string): boolean => {
  return tokenName?.toUpperCase() === 'EGLD';
};

export const getAccount = async (addressStr: string, networkProvider: INetworkProvider): Promise<Account> => {
  const address = new Address(addressStr);
  const account = new Account(address);
  const accountOnNetwork = await networkProvider.getAccount(address);
  account.update(accountOnNetwork);

  return account;
};

export const createDateFromUTCString = (dateString: string): Date => {
  const date = new Date(dateString);
  const timestamp = date.getTime();
  const offset = date.getTimezoneOffset();
  const utcTimestamp = timestamp - offset * 1000 * 60;

  return new Date(utcTimestamp);
};

// call to social pay api
export const EGLD_DECIMALS = 18;
export const DECIMALS_FRONTEND = 18;
export const FEE_PERCENTAGE_TIMES_TEN = 2;

export const MAXIMUM_BALANCE = 1000;
export const GAS_LIMIT = 12000000;
