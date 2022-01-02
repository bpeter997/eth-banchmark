import { ConnectionService } from 'src/app/services/connection/connection.service';
import { Injectable } from '@angular/core';
import { UserData } from '../../models/userData';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public accountAddress: any = null;
  private onUserChange = new Subject<string>(); // Source
  onUserChange$ = this.onUserChange.asObservable(); // Stream

  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {
    if (localStorage.getItem('authError')) return;
    this.connectionService.window.ethereum.on('accountsChanged', () => {
      this.accountAddress = null;
      this.onUserChange.next();
    });
  }

  public async getUserData(): Promise<UserData | undefined> {
    try {
      const address: string = await this.getAccountAddress();
      const balance: number =
        await this.connectionService.window.web3.eth.getBalance(address);
      const userData: UserData = { address, balance };
      localStorage.removeItem('authError');
      return userData;
    } catch (error) {
      localStorage.setItem('authError', (error as Error).message);
      this.router.navigateByUrl('/login');
      return undefined;
    }
  }

  private async getAccountAddress(): Promise<string> {
    try {
      let accounts = await this.connectionService.window.web3.eth.getAccounts();
      if (accounts.length < 1) {
        throw new Error('Please log in with metamask!');
      }
      this.accountAddress = accounts[0];
      return this.accountAddress;
    } catch (error) {
      throw new Error('Please log in with metamask!');
    }
  }
}
