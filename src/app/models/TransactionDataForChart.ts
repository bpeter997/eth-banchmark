import { Transaction } from "./transaction";

export class TransactionDataForChart {

  private _gasPrice: number;
  private _fiboValue: number;
  private _blockMiningDuration: number;
  private _counterOfIncreases: number;

  constructor(transaction: Transaction) {
    this._fiboValue = transaction.fiboValue;
    this._gasPrice = transaction.gasPrice;
    this._blockMiningDuration = transaction.blockMiningDuration;
    this._counterOfIncreases = 1;
  }

  public addValues(transaction: Transaction) {
    this._gasPrice += transaction.gasPrice;
    this._blockMiningDuration += transaction.blockMiningDuration;
    this._counterOfIncreases++;
  }

  public getAvgGasPrice() {
    return this._gasPrice / this._counterOfIncreases;
  }

  public getAvgBlockMiningDuration() {
    return this._blockMiningDuration / this._counterOfIncreases;
  }

  public get fiboValue() {
    return this._fiboValue;
  }
}
