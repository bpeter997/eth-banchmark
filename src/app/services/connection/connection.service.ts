import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  //readonly web3Provider!: any;
  window: any;

  constructor() {
    this.window = window;
    if (window.ethereum === undefined) {
      localStorage.setItem(
        'authError',
        'Non-Ethereum browser detected. Please install MetaMask!'
      );
    } else {
      localStorage.removeItem('authError');
      window.web3 = new Web3(window.ethereum);
      this.enableMetaMaskAccount();
    }
  }

  private async enableMetaMaskAccount(): Promise<void> {
    //await window.ethereum.enable();
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
}
