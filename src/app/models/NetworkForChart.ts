import { CallData } from './callData';
import { TransactionData } from 'src/app/models/transaction';
import { TransactionForChart } from './TransactionForChart';
import { CallForChart } from './CallForChart';

export class NetworkForChart {
  private _sorted: boolean = false;
  private _networkId: number;
  private _transactionsGrouppedByNetwork: Array<TransactionForChart>;
  private _callsGrouppedByNetwork: Array<CallForChart>;

  constructor(data: TransactionData | CallData) {
    this._networkId = data.networkId;
    this._transactionsGrouppedByNetwork = [];
    this._callsGrouppedByNetwork = [];
  }

  private sortTransactionAndCallSummaryCollector() {
    this._transactionsGrouppedByNetwork.sort(this.sortElements());
    this._callsGrouppedByNetwork.sort(this.sortElements());
    this._sorted = true;
  }

  private sortElements():
    | ((
        a: CallForChart | TransactionForChart,
        b: CallForChart | TransactionForChart
      ) => number)
    | undefined {
    return (
      a: CallForChart | TransactionForChart,
      b: CallForChart | TransactionForChart
    ) => a.fiboValue - b.fiboValue;
  }

  public addTransasction(transaction: TransactionData) {
    const matchingTransactionSummaryCollector =
      this._transactionsGrouppedByNetwork.find(
        (transactionSummaryCollector) =>
          transactionSummaryCollector.fiboValue == transaction.fiboValue
      );
    if (matchingTransactionSummaryCollector) {
      matchingTransactionSummaryCollector.addValues(transaction);
    } else {
      this._transactionsGrouppedByNetwork.push(
        new TransactionForChart(transaction)
      );
    }
    this._sorted = false;
  }

  public addCall(call: CallData) {
    const matchingCallSummaryCollector =
      this._callsGrouppedByNetwork.find(
        (callSummaryCollector) =>
          callSummaryCollector.fiboValue == call.fiboValue
      );
    if (matchingCallSummaryCollector) {
      matchingCallSummaryCollector.addValues(call);
    } else {
      this._callsGrouppedByNetwork.push(
        new CallForChart(call)
      );
    }
    this._sorted = false;
  }

  public getPriceData() {
    if (!this._sorted) this.sortTransactionAndCallSummaryCollector();
    const priceDatas = this._transactionsGrouppedByNetwork.map(
      (transactionSummary) => ({
        x: transactionSummary.fiboValue,
        y: transactionSummary.getAvgGasPrice(),
      })
    );
    return { data: priceDatas, label: this._networkId.toString() };
  }

  public getMiningDurationData() {
    if (!this._sorted) this.sortTransactionAndCallSummaryCollector();
    const durationDatas = this._transactionsGrouppedByNetwork.map(
      (transactionSummary) => ({
        x: transactionSummary.fiboValue,
        y: transactionSummary.getAvgBlockMiningDuration(),
      })
    );
    return { data: durationDatas, label: this._networkId.toString() };
  }

  public getCalculationDurationData(){
    if (!this._sorted) this.sortTransactionAndCallSummaryCollector();
    const durationDatas = this._callsGrouppedByNetwork.map(
      (callSummary) => ({
        x: callSummary.fiboValue,
        y: callSummary.getAvgCalculationMiningDuration(),
      })
    );

    return { data: durationDatas, label: this._networkId.toString() };
  }

  public getLabelsForTransactions() {
    return this._transactionsGrouppedByNetwork.map(
      (transactionSummary) => transactionSummary.fiboValue
    );
  }

  public getLabelsForCalls() {
    return this._callsGrouppedByNetwork.map(
      (transactionSummary) => transactionSummary.fiboValue
    );
  }

  public get networkId() {
    return this._networkId;
  }
}
