import { ConnectionService } from 'src/app/services/connection/connection.service';
import { Injectable, NgZone } from '@angular/core';
import { NetworkData } from 'src/app/models/networkData';
import { Router } from '@angular/router';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { collection, doc, getDocs } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private ngZone: NgZone,
    private firestore: Firestore
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

    const currentNetworkData: NetworkData = {
      id,
      networkType,
      blockNumber,
      lastBlockTransactionCount,
      peerCount,
      medianGasPrice,
    };

    return currentNetworkData;
  }

  public async getNetworkNameById(networkId: number): Promise<string> {
    const id: string = networkId.toString();
    const docRef = doc(this.firestore, 'networks', id);
    const docSnap = await getDoc(docRef);
    const name: string = docSnap.data()?.name;
    return name ? name : id;
  }

  public async getNetworksName(): Promise<DocumentData | undefined> {
    return await getDocs(collection(this.firestore, 'networks'));
  }
}
