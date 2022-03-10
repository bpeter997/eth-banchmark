import { CallData } from './../../models/callData';
import { TransactionData } from '../../models/transaction';
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
  callData: CallData | null = null;
  transactionsFromDb: Array<TransactionData> = [];
  callsFromDb: Array<CallData> = [];
  networks: Map<number, string> = new Map<number, string>();

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
    await this.getNetworkInfos();
    await this.getTransactionsFromDb();
    await this.getCallsFromDb();
  }

  private async getCallsFromDb() {
    const calls = await this.fibonacciService.getAllTransactionOrCallFromDb(
      FibonacciService.CALLS
    );
    this.callsFromDb = [];
    calls.forEach((doc: any) => this.callsFromDb.push(doc.data()));
  }

  private async getTransactionsFromDb() {
    const transactions =
      await this.fibonacciService.getAllTransactionOrCallFromDb(
        FibonacciService.TRANSACTIONS
      );
    this.transactionsFromDb = [];
    transactions.forEach((doc: any) =>
      this.transactionsFromDb.push(doc.data())
    );
  }

  private async getNetworkInfos() {
    const networks = await this.networkService.getNetworksName();
    networks!.forEach((doc: any) => {
      this.networks.set(+doc.id, doc.data().name);
    });
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
    const startTime: number = new Date().getTime();
    const fibres = await this.fibonacciService.callFib(
      value,
      this.userData!.address
    );
    this.setCallData(startTime, fibres, value);
    await this.getCallsFromDb();
  }

  private setCallData(startTime: number, fibres: any, value: number) {
    const endTime: number = new Date().getTime();
    const calculationDuration: number = (endTime - startTime) / 1000;
    this.resetDatas();
    this.callData = {
      value: fibres,
      calculationDuration: calculationDuration,
      fiboValue: value,
      networkId: this.networkData!.id,
    };
    this.fibonacciService.insertTransactionOrCallToDB(this.callData);
  }

  async generateFibonacci(value: number): Promise<void> {
    const generationTime: number = +new Date();
    const fibTransactionRes = await this.fibonacciService.generateFib(
      value,
      this.userData!.address
    );
    if (!fibTransactionRes) return;
    await this.setTransactionData(fibTransactionRes, value, generationTime);
    await this.getTransactionsFromDb();
  }

  private async setTransactionData(
    fibTransactionRes: any,
    value: number,
    generationTime: number
  ) {
    this.resetDatas();
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

    const transactionContainerBlock =
      await this.fibonacciService.getBlockByBlockHash(
        fibTransactionRes.blockHash
      );

    const blockMiningDuration: number =
      transactionContainerBlock.timestamp * 1000 - generationTime;

    this.transactionData = {
      result: fibSeries,
      blockHash: fibTransactionRes.blockHash,
      blockNumber: fibTransactionRes.blockNumber,
      gasPrice: transaction.gas,
      nonce: transaction.nonce,
      transactionHash: fibTransactionRes.transactionHash,
      blockMiningDuration: blockMiningDuration / 1000,
      fiboValue: value,
      networkId: this.networkData!.id,
    };
    this.fibonacciService.insertTransactionOrCallToDB(this.transactionData);
  }

  resetDatas(): void {
    this.callData = null;
    this.transactionData = null;
  }

  isFiboContractAvailable(): boolean {
    return this.fibonacciService.isContractAvailable;
  }
}
