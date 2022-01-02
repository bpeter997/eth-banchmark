import { NetworkData } from './../../models/networkData';
import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  readonly web3!: any;
  window: any;

  constructor() {
    this.window = window;
    if (window.ethereum === undefined) {
      localStorage.setItem('authError', 'Non-Ethereum browser detected. Please install MetaMask!');
    } else {
      localStorage.removeItem('authError');
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      window.web3 = new Web3(window.ethereum);
      this.enableMetaMaskAccount();
    }
  }

  private async enableMetaMaskAccount(): Promise<void> {
    await window.ethereum.enable();
  }
}
