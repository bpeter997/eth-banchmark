import { Transaction } from 'src/app/models/transaction';
import { TransactionDataForChart } from './TransactionDataForChart';

export class NetworkDataForChart {
  private _sorted: boolean = false;
  private _networkId: number;
  private _transactionsGrouppedByNetwork: Array<TransactionDataForChart>;

  constructor(transaction: Transaction) {
    this._networkId = transaction.networkId;
    this._transactionsGrouppedByNetwork = [];
    this.addTransasction(transaction);
  }

  private sortTransactionSummaryCollector() {
    this._transactionsGrouppedByNetwork.sort(
      (t1: TransactionDataForChart, t2: TransactionDataForChart) =>
        t1.fiboValue - t2.fiboValue
    );
    this._sorted = true;
  }

  public addTransasction(transaction: Transaction) {
    const matchingTransactionSummaryCollector =
      this._transactionsGrouppedByNetwork.find(
        (transactionSummaryCollector) =>
          transactionSummaryCollector.fiboValue == transaction.fiboValue
      );
    if (matchingTransactionSummaryCollector) {
      matchingTransactionSummaryCollector.addValues(transaction);
    } else {
      this._transactionsGrouppedByNetwork.push(
        new TransactionDataForChart(transaction)
      );
    }
    this._sorted = false;
  }

  public getPriceDatas() {
    if(!this._sorted) this.sortTransactionSummaryCollector();
    const priceDatas = this._transactionsGrouppedByNetwork.map(
      (transactionSummary) =>  ({x: transactionSummary.fiboValue, y: transactionSummary.getAvgGasPrice() })
    );
    return { data: priceDatas, label: this._networkId.toString() };
  }

  public getDurationDatas() {
    if(!this._sorted) this.sortTransactionSummaryCollector();
    const durationDatas = this._transactionsGrouppedByNetwork.map(
      (transactionSummary) => ({x:transactionSummary.fiboValue, Y:transactionSummary.getAvgBlockMiningDuration()})
    );
    return { data: durationDatas, label: this._networkId.toString() };
  }

  public getLabels() {
    return this._transactionsGrouppedByNetwork.map(
      (transactionSummary) => transactionSummary.fiboValue
    );
    // const nums = []
    // for (let index = 1; index < 160; index++) {
    //   nums.push(index);
    // }
    // return nums
  }

  public get networkId() {
    return this._networkId;
  }
}
