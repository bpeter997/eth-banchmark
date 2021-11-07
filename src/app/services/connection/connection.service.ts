import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { UserData } from '../../models/userData';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  public account: any = null;
  readonly web3!: any;
  private enable: any;

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      window.web3 = new Web3(window.ethereum);
      this.enable = this.enableMetaMaskAccount();
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  private async getAccount(): Promise<string> {
    if (this.account == null) {
      this.account = (await new Promise((resolve, reject) => {
        window.web3.eth.getAccounts((err: Error, retAccount: string) => {
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      })) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  public async getUserData(): Promise<UserData> {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function (err: any, balance: number) {
        if (!err) {
          const retVal: UserData = { address: account, balance: +balance };
          resolve(retVal);
        } else {
          reject({ account: 'error', balance: 0 });
        }
      });
    }) as Promise<UserData>;
  }
}
