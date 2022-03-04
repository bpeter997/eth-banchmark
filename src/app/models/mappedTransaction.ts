export class MappedTransaction {

  private gasPrice: number;
  private blockMiningDuration: number;
  counterOfIncreases: number;

  constructor(gasPrice: number, blockMiningDuration: number) {
    this.gasPrice = gasPrice;
    this.blockMiningDuration = blockMiningDuration;
    this.counterOfIncreases = 1;
  }

  public addValues(gasPrice: number, blockMiningDuration: number) {
    this.gasPrice += gasPrice;
    this.blockMiningDuration += blockMiningDuration;
    this.counterOfIncreases++;
  }

  public getAvgGasPrice() {
    return this.gasPrice / this.counterOfIncreases;
  }

  public getAvgBlockMiningDuration() {
    return this.blockMiningDuration / this.counterOfIncreases;
  }
}
