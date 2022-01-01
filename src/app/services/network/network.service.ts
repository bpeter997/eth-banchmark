import { ConnectionService } from 'src/app/services/connection/connection.service';
import { Injectable } from '@angular/core';
import { NetworkData } from 'src/app/models/networkData';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private conectionService: ConnectionService) {}

  public async getNetworkInfo(): Promise<NetworkData> {
    let blockNumber: number =
      await this.conectionService.window.web3.eth.getBlockNumber();
    let blockTransactionCount: number =
      await this.conectionService.window.web3.eth.getBlockTransactionCount();
    let peerCount: number =
      await this.conectionService.window.web3.eth.net.getPeerCount();
    let avgGasPrice: number =
      await this.conectionService.window.web3.eth.getGasPrice();

    let currentNetworkData: NetworkData = {
      blockNumber,
      blockTransactionCount,
      peerCount,
      avgGasPrice,
    };

    return currentNetworkData;
  }
}
