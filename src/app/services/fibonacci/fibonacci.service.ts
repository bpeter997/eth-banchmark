import { CallData } from './../../models/callData';
import { TransactionData } from '../../models/transaction';
import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { Subject } from 'rxjs';
import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import { addDoc, Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { fiboAbi, byteCode } from './contractData';

@Injectable({
  providedIn: 'root',
})
export class FibonacciService {
  private fiboContract: any;
  private fiboContractAddress: string;

  private onTransactionGeneration = new Subject<string>(); // Source
  onTransactionGeneration$ = this.onTransactionGeneration.asObservable(); // Stream

  public isContractAvailable: boolean;
  public static TRANSACTIONS: string = 'transactions';
  public static CALLS: string = 'calls';

  constructor(
    private connectionService: ConnectionService,
    private firestore: Firestore
  ) {
    // const contract = require('@truffle/contract');
    // this.fiboContract = contract(fiboAbi);
    // this.fiboContract.setProvider(this.connectionService.web3Provider);
    this.fiboContractAddress = '';
    this.isContractAvailable = false;
  }

  public async setFibonacciContract(userAddress: string, networkId: number) {
    this.isContractAvailable = false;
    const docRef = doc(this.firestore, 'networks', networkId.toString());
    const docSnap = await getDoc(docRef);
    this.fiboContractAddress = docSnap.data()?.fibonacciBytecode;

    if (!this.fiboContractAddress) {
      this.deployFibonacciContract(userAddress, networkId);
    } else {
      this.fiboContract = new this.connectionService.window.web3.eth.Contract(
        fiboAbi,
        this.fiboContractAddress
      );
      this.isContractAvailable = true;
    }
  }

  private deployFibonacciContract(userAddress: string, networkId: number) {
    try {
      this.fiboContract = new this.connectionService.window.web3.eth.Contract(
        fiboAbi
      );

      let payload = {
        data: byteCode,
      };

      this.fiboContract
        .deploy(payload)
        .send({
          from: userAddress,
        })
        .then(async (fiboContractInstance: any) => {
          this.fiboContract.options.address =
            fiboContractInstance.options.address;
          this.fiboContractAddress = fiboContractInstance.options.address;
          this.onTransactionGeneration.next();
          await setDoc(doc(this.firestore, 'networks', networkId.toString()), {
            fibonacciBytecode: this.fiboContractAddress,
          });
          this.isContractAvailable = true;
        });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param value - calculate this value
   * @param from  - the adress of the caller
   * @returns
   */
  generateFib(value: number, from: string): Promise<any> {
    /*  const fiboContract = new this.connectionService.window.web3.eth.Contract(
      fiboAbi
      ,'0xe95e1800Cf6F359AEa4476F891E29026DC7Ea843'
    ); */
    return (
      this.fiboContract.methods
        .generateFib(value)
        .send({ from: from })
        /* .on(
        'confirmation',
        function (confNumber: any, receipt: any, latestBlockHash: any) {
          console.log(confNumber, receipt, latestBlockHash, 'confirmation');
        }
      ) */
        .then((result: any) => {
          this.onTransactionGeneration.next();
          return result;
        })
        .catch((error: Error) => console.log(error))
    );
  }

  /**
   *
   * @param value - calculate this value
   * @param from  - the adress of the caller
   * @returns
   */
  callFib(value: number, from: string): Promise<any> {
    return this.fiboContract.methods.callFib(value).call({ from: from });
  }

  getTransactionByHash(hash: string) {
    return this.connectionService.window.web3.eth.getTransaction(hash);
  }

  getFibSeriesFromContract(value: number, from: string): Promise<any> {
    console.log(this.fiboContract.methods);
    return this.fiboContract.methods.fibseries(value - 1).call({ from: from });
  }

  decodeInputValue(value: string) {
    return this.connectionService.window.web3.toAscii(value);
  }

  getBlockByBlockHash(blockHash: string) {
    return this.connectionService.window.web3.eth.getBlock(blockHash);
  }

  async insertTransactionOrCallToDB(insertedData: TransactionData | CallData) {
    await addDoc(
      collection(this.firestore, this.getDocumentTypeText(insertedData)),
      {
        ...insertedData,
      }
    );
  }

  getAllTransactionOrCallFromDb(documentType: string) {
    return getDocs(collection(this.firestore, documentType));
  }

  getTransactionsOrCallsByNetworkFromDb(
    documentType: string,
    newtworkId: number
  ) {
    const networkQuery = query(
      collection(this.firestore, documentType),
      where('networkId', '==', newtworkId)
    );
    console.log(networkQuery);

    return getDocs(networkQuery);
  }

  private getDocumentTypeText(
    insertedData: TransactionData | CallData
  ): string {
    return this.isTransactionData(insertedData)
      ? FibonacciService.TRANSACTIONS
      : FibonacciService.CALLS;
  }

  private isTransactionData(insertedData: CallData | TransactionData) {
    return (insertedData as TransactionData).gasPrice !== undefined;
  }
  /*
  decodeParameters(value: string, type: string) {
    value = '0x' + value.slice(10);
    return this.connectionService.window.web3.eth.abi.decodeParameters(
      [type],
      value
    );
  } */
}
