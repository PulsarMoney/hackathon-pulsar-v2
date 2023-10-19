export class AccountToken {
  identifier: string = '';
  attributes?: string;
  balance: string = '';
  decimals: number = 0;
  collection?: string;
  nonce?: number;
  ticker: string = '';
  assets?: any;
  name: string = '';

  constructor(data: Partial<AccountToken> = {}) {
    Object.assign(this, data);
  }
}
