import { ConnectionService } from 'src/app/services/connection/connection.service';
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { UserData } from '../../models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public account: any = null;
  public onAccountChange!: () => Promise<void>;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.window.ethereum.on('accountsChanged', () => {
      this.account = null;
      if (this.onAccountChange !== null) this.onAccountChange();
    });
   }

  public async getUserData(): Promise<UserData | undefined> {
    try {
      const address: string = await this.getAccountAddress();
      const balance: number = await this.connectionService.window.web3.eth.getBalance(address);
      const userData: UserData = { address, balance };
      return userData;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  private async getAccountAddress(): Promise<string> {
    try {
      let accounts = await this.connectionService.window.web3.eth.getAccounts();
      if (accounts.length < 1) {
        //alert('transfer.service :: getAccount :: no accounts found.');
        throw new Error('No accounts found.');
      }
      this.account = accounts[0];
      return this.account;
    } catch (error) {
      //alert('transfer.service :: getAccount :: error retrieving account');
      throw new Error('Error retrieving account');
    }
}
}
