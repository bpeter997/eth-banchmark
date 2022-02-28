import { ConnectionService } from 'src/app/services/connection/connection.service';
import { Injectable, NgZone } from '@angular/core';
import { NetworkData } from 'src/app/models/networkData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.connectionService.window.ethereum.on('chainChanged', () => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    });
  }

  public async getNetworkData(): Promise<NetworkData> {
    const id = await this.connectionService.window.web3.eth.net.getId();
    const networkType =
      await this.connectionService.window.web3.eth.net.getNetworkType();
    const blockNumber: number =
      await this.connectionService.window.web3.eth.getBlockNumber();
    const lastBlockTransactionCount: number =
      await this.connectionService.window.web3.eth.getBlockTransactionCount(
        blockNumber
      );
    const peerCount: number =
      await this.connectionService.window.web3.eth.net.getPeerCount();
    const medianGasPrice: number =
      await this.connectionService.window.web3.eth.getGasPrice();
    console.log(this.connectionService.window.web3.eth);
    const chainName: string =
      this.connectionService.window.web3.eth.defaultCommon;

    const currentNetworkData: NetworkData = {
      id,
      networkType,
      blockNumber,
      lastBlockTransactionCount,
      peerCount,
      medianGasPrice,
      chainName,
    };

    return currentNetworkData;
  }
}
