import { TransactionData } from './../../models/transactionData';
import { NetworkService } from './../../services/network/network.service';
import { UserService } from './../../services/user/user.service';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { FibonacciService } from 'src/app/services/fibonacci/fibonacci.service';
import { NetworkData } from 'src/app/models/networkData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass'],
})
export class InfoComponent implements OnInit, OnDestroy {
  userData?: UserData;
  networkData?: NetworkData;
  transactionData: TransactionData | null = null;
  callData: number | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private networkService: NetworkService,
    private fibonacciService: FibonacciService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.onUserChange$.subscribe(() => {
        this.getUserAndNetworkData();
      })
    );

    this.subscriptions.add(
      this.fibonacciService.onTransactionGeneration$.subscribe(() => {
        this.getUserAndNetworkData();
      })
    );
    this.getAllInformation();
  }

  private async getUserAndNetworkData() {
    await this.ngZone.run(async () => {
      await this.getUserData();
      await this.getnetworkInfo();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async getAllInformation(): Promise<void> {
    await this.getUserAndNetworkData();
    await this.setContract();
  }

  async getUserData(): Promise<void> {
    this.userData = await this.userService.getUserData();
  }

  async getnetworkInfo(): Promise<void> {
    this.networkData = await this.networkService.getNetworkData();
  }

  async setContract(): Promise<void> {
    await this.fibonacciService.setFibonacciContract(
      this.userData!.address,
      this.networkData!.id
    );
  }

  async callFibonacci(value: number): Promise<void> {
    const fibres = await this.fibonacciService.callFib(
      value,
      this.userData!.address
    );
    this.resetDatas();
    this.callData=fibres;
  }

  async generateFibonacci(value: number): Promise<void> {
    const fibTransactionRes = await this.fibonacciService.generateFib(
      value,
      this.userData!.address
    );
    if (!fibTransactionRes) return;
    this.resetDatas()
    const transaction = await this.fibonacciService.getTransactionByHash(
      fibTransactionRes.transactionHash
    );
    /* const parameters = await this.fibonacciService.decodeParameters(
      transaction.input,
      'uint256'
    ); */
    const fibSeries = await this.fibonacciService.getFibSeriesFromContract(
      value,
      this.userData!.address
    );

    this.transactionData = {
      result: fibSeries,
      blockHash: fibTransactionRes.blockHash,
      blockNumber: fibTransactionRes.blockNumber,
      gasPrice: fibTransactionRes.gasUsed,
      nonce: transaction.nonce,
      transactionHash: fibTransactionRes.transactionHash
    }
  }

  resetDatas(): void {
    this.callData = null;
    this.transactionData = null;
  }

  isFiboContractAvailable(): boolean {
    return this.fibonacciService.isContractAvailable;
  }
}
