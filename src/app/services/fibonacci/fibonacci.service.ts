import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

const fiboAbi = require('../../../../truffle/build/contracts/Fibonacci.json');

@Injectable({
  providedIn: 'root',
})
export class FibonacciService {
  readonly fiboContract: any;

  constructor(private connectionService: ConnectionService) {
    const contract = require('@truffle/contract');
    this.fiboContract = contract(fiboAbi);
    this.fiboContract.setProvider(this.connectionService.web3);
  }

  /**
   *
   * @param value - calculate this value
   * @param from  - the adress of the caller
   * @returns
   */
  generateFib(value: number, from: string): Promise<any> {
    return this.fiboContract.deployed().then(function (instance: any) {
          return instance.generateFib(value, {
            from: from,
          });
        })
  }

  /**
   *
   * @param value - calculate this value
   * @param from  - the adress of the caller
   * @returns
   */
  callFib(value: number): Promise<any> {
    return this.fiboContract
      .deployed()
      .then((instance: any) => instance.callFib(value));
  }
}
