import { Subject } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { Injectable, NgZone } from '@angular/core';
import { NetworkData } from 'src/app/models/networkData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    private conectionService: ConnectionService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.conectionService.window.ethereum.on('chainChanged', () => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    });
  }

  public async getNetworkData(): Promise<NetworkData> {
    let id = await this.conectionService.window.web3.eth.net.getId();
    let networkType = await this.conectionService.window.web3.eth.net.getNetworkType();
    let blockNumber: number =
      await this.conectionService.window.web3.eth.getBlockNumber();
    let lastBlockTransactionCount: number =
      await this.conectionService.window.web3.eth.getBlockTransactionCount(
        blockNumber
      );
    let peerCount: number =
      await this.conectionService.window.web3.eth.net.getPeerCount();
    let medianGasPrice: number =
      await this.conectionService.window.web3.eth.getGasPrice();

    let currentNetworkData: NetworkData = {
      id,
      networkType,
      blockNumber,
      lastBlockTransactionCount,
      peerCount,
      medianGasPrice,
    };

    return currentNetworkData;
  }
}
