import { CallData } from './callData';

export class CallForChart {

  private _fiboValue: number;
  private _calculationDuration: number;
  private _counterOfIncreases: number;

  constructor(call: CallData) {
    this._fiboValue = call.fiboValue;
    this._calculationDuration = call.calculationDuration;
    this._counterOfIncreases = 1;
  }

  public addValues(call: CallData) {
    this._calculationDuration += call.calculationDuration;
    this._counterOfIncreases++;
  }

  public getAvgCalculationMiningDuration() {
    return this._calculationDuration / this._counterOfIncreases;
  }

  public get fiboValue() {
    return this._fiboValue;
  }
}
