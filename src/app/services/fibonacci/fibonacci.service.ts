import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
let fiboAbi = require('../../../../truffle/build/contracts/Fibonacci.json');

@Injectable({
  providedIn: 'root',
})
export class FibonacciService {
  readonly fiboContract: any;
  private byteCode: string;

  constructor(
    private connectionService: ConnectionService,
    private userService: UserService
  ) {
    // const contract = require('@truffle/contract');
    // this.fiboContract = contract(fiboAbi);
    // this.fiboContract.setProvider(this.connectionService.web3Provider);

    this.byteCode = fiboAbi.bytecode;

    let modifiedFiboAbiString: string = '[' + JSON.stringify(fiboAbi) + ']';
    fiboAbi = JSON.parse(modifiedFiboAbiString);

    try {
      this.fiboContract = new this.connectionService.window.web3.eth.Contract(
        fiboAbi
      );
    } catch (error) {
      console.log(error);
    }

    let payload = {
      data: this.byteCode,
    };

    let parameter = {
      from: '0x824D962F09eeb4c8c177DFF493a83907513E8782',
      gas: this.connectionService.window.web3.utils.toHex(800000),
      gasPrice: this.connectionService.window.web3.utils.toHex(
        this.connectionService.window.web3.utils.toWei('30', 'gwei')
      ),
    };

    console.log(parameter);

    console.log(this.fiboContract);

    this.fiboContract.deploy(payload);
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
    });
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
