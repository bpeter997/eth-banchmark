import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { Subject } from 'rxjs';
import { doc, setDoc } from 'firebase/firestore';
import { Firestore, getDoc } from '@angular/fire/firestore';

// compiled by remixd
//let fiboAbi = [
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'n',
//         type: 'uint256',
//       },
//     ],
//     name: 'callFib',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'pure',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'n',
//         type: 'uint256',
//       },
//     ],
//     name: 'generateFib',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ];

// compiled by remixd
// const byteCode = {
//   functionDebugData: {},
//   generatedSources: [],
//   linkReferences: {},
//   object:
//     '608060405234801561001057600080fd5b506103e5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632ddec39b1461003b5780639c7dd53c14610057575b600080fd5b61005560048036038101906100509190610201565b610087565b005b610071600480360381019061006c9190610201565b610188565b60405161007e919061023d565b60405180910390f35b6000600190806001815401808255809150506001900390600052602060002001600090919091909150556000600190806001815401808255809150506001900390600052602060002001600090919091909150556000600290505b81811015610184576000806002836100fa91906102ae565b8154811061010b5761010a610364565b5b9060005260206000200154600060018461012591906102ae565b8154811061013657610135610364565b5b906000526020600020015461014b9190610258565b9080600181540180825580915050600190039060005260206000200160009091909190915055808061017c906102ec565b9150506100e2565b5050565b60008082141561019b57600090506101e7565b6000600190506000600190506000600290505b848110156101e057600082846101c49190610258565b90508293508092505080806101d8906102ec565b9150506101ae565b5080925050505b919050565b6000813590506101fb81610398565b92915050565b60006020828403121561021757610216610393565b5b6000610225848285016101ec565b91505092915050565b610237816102e2565b82525050565b6000602082019050610252600083018461022e565b92915050565b6000610263826102e2565b915061026e836102e2565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156102a3576102a2610335565b5b828201905092915050565b60006102b9826102e2565b91506102c4836102e2565b9250828210156102d7576102d6610335565b5b828203905092915050565b6000819050919050565b60006102f7826102e2565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561032a57610329610335565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b6103a1816102e2565b81146103ac57600080fd5b5056fea2646970667358221220ca94ae63b2d65f7e543c2fc59c20b79cd8cd6cb4996f39855922f0b3febe299964736f6c63430008070033',
//   opcodes:
//     'PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x3E5 DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x36 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x2DDEC39B EQ PUSH2 0x3B JUMPI DUP1 PUSH4 0x9C7DD53C EQ PUSH2 0x57 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x55 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x50 SWAP2 SWAP1 PUSH2 0x201 JUMP JUMPDEST PUSH2 0x87 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x71 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x6C SWAP2 SWAP1 PUSH2 0x201 JUMP JUMPDEST PUSH2 0x188 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x7E SWAP2 SWAP1 PUSH2 0x23D JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x0 PUSH1 0x1 SWAP1 DUP1 PUSH1 0x1 DUP2 SLOAD ADD DUP1 DUP3 SSTORE DUP1 SWAP2 POP POP PUSH1 0x1 SWAP1 SUB SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 ADD PUSH1 0x0 SWAP1 SWAP2 SWAP1 SWAP2 SWAP1 SWAP2 POP SSTORE PUSH1 0x0 PUSH1 0x1 SWAP1 DUP1 PUSH1 0x1 DUP2 SLOAD ADD DUP1 DUP3 SSTORE DUP1 SWAP2 POP POP PUSH1 0x1 SWAP1 SUB SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 ADD PUSH1 0x0 SWAP1 SWAP2 SWAP1 SWAP2 SWAP1 SWAP2 POP SSTORE PUSH1 0x0 PUSH1 0x2 SWAP1 POP JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0x184 JUMPI PUSH1 0x0 DUP1 PUSH1 0x2 DUP4 PUSH2 0xFA SWAP2 SWAP1 PUSH2 0x2AE JUMP JUMPDEST DUP2 SLOAD DUP2 LT PUSH2 0x10B JUMPI PUSH2 0x10A PUSH2 0x364 JUMP JUMPDEST JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 ADD SLOAD PUSH1 0x0 PUSH1 0x1 DUP5 PUSH2 0x125 SWAP2 SWAP1 PUSH2 0x2AE JUMP JUMPDEST DUP2 SLOAD DUP2 LT PUSH2 0x136 JUMPI PUSH2 0x135 PUSH2 0x364 JUMP JUMPDEST JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 ADD SLOAD PUSH2 0x14B SWAP2 SWAP1 PUSH2 0x258 JUMP JUMPDEST SWAP1 DUP1 PUSH1 0x1 DUP2 SLOAD ADD DUP1 DUP3 SSTORE DUP1 SWAP2 POP POP PUSH1 0x1 SWAP1 SUB SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 ADD PUSH1 0x0 SWAP1 SWAP2 SWAP1 SWAP2 SWAP1 SWAP2 POP SSTORE DUP1 DUP1 PUSH2 0x17C SWAP1 PUSH2 0x2EC JUMP JUMPDEST SWAP2 POP POP PUSH2 0xE2 JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 DUP3 EQ ISZERO PUSH2 0x19B JUMPI PUSH1 0x0 SWAP1 POP PUSH2 0x1E7 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 SWAP1 POP PUSH1 0x0 PUSH1 0x1 SWAP1 POP PUSH1 0x0 PUSH1 0x2 SWAP1 POP JUMPDEST DUP5 DUP2 LT ISZERO PUSH2 0x1E0 JUMPI PUSH1 0x0 DUP3 DUP5 PUSH2 0x1C4 SWAP2 SWAP1 PUSH2 0x258 JUMP JUMPDEST SWAP1 POP DUP3 SWAP4 POP DUP1 SWAP3 POP POP DUP1 DUP1 PUSH2 0x1D8 SWAP1 PUSH2 0x2EC JUMP JUMPDEST SWAP2 POP POP PUSH2 0x1AE JUMP JUMPDEST POP DUP1 SWAP3 POP POP POP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x1FB DUP2 PUSH2 0x398 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x217 JUMPI PUSH2 0x216 PUSH2 0x393 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x225 DUP5 DUP3 DUP6 ADD PUSH2 0x1EC JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x237 DUP2 PUSH2 0x2E2 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x252 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x22E JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x263 DUP3 PUSH2 0x2E2 JUMP JUMPDEST SWAP2 POP PUSH2 0x26E DUP4 PUSH2 0x2E2 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH2 0x2A3 JUMPI PUSH2 0x2A2 PUSH2 0x335 JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2B9 DUP3 PUSH2 0x2E2 JUMP JUMPDEST SWAP2 POP PUSH2 0x2C4 DUP4 PUSH2 0x2E2 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 LT ISZERO PUSH2 0x2D7 JUMPI PUSH2 0x2D6 PUSH2 0x335 JUMP JUMPDEST JUMPDEST DUP3 DUP3 SUB SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2F7 DUP3 PUSH2 0x2E2 JUMP JUMPDEST SWAP2 POP PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 EQ ISZERO PUSH2 0x32A JUMPI PUSH2 0x329 PUSH2 0x335 JUMP JUMPDEST JUMPDEST PUSH1 0x1 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x3A1 DUP2 PUSH2 0x2E2 JUMP JUMPDEST DUP2 EQ PUSH2 0x3AC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xCA SWAP5 0xAE PUSH4 0xB2D65F7E SLOAD EXTCODECOPY 0x2F 0xC5 SWAP13 KECCAK256 0xB7 SWAP13 0xD8 0xCD PUSH13 0xB4996F39855922F0B3FEBE2999 PUSH5 0x736F6C6343 STOP ADDMOD SMOD STOP CALLER ',
//   sourceMap: '69:729:0:-:0;;;;;;;;;;;;;;;;;;;',
// };

//compiled by solc
let fiboAbi = [
  {
    inputs: [{ internalType: 'uint256', name: 'n', type: 'uint256' }],
    name: 'callFib',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'n', type: 'uint256' }],
    name: 'generateFib',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

//compiled by solc
const byteCode =
  '608060405234801561001057600080fd5b506103e5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632ddec39b1461003b5780639c7dd53c14610057575b600080fd5b61005560048036038101906100509190610227565b610087565b005b610071600480360381019061006c9190610227565b610188565b60405161007e9190610263565b60405180910390f35b6000600190806001815401808255809150506001900390600052602060002001600090919091909150556000600190806001815401808255809150506001900390600052602060002001600090919091909150556000600290505b81811015610184576000806002836100fa91906102ad565b8154811061010b5761010a6102e1565b5b9060005260206000200154600060018461012591906102ad565b81548110610136576101356102e1565b5b906000526020600020015461014b9190610310565b9080600181540180825580915050600190039060005260206000200160009091909190915055808061017c90610366565b9150506100e2565b5050565b60008082141561019b57600090506101e7565b6000600190506000600190506000600290505b848110156101e057600082846101c49190610310565b90508293508092505080806101d890610366565b9150506101ae565b5080925050505b919050565b600080fd5b6000819050919050565b610204816101f1565b811461020f57600080fd5b50565b600081359050610221816101fb565b92915050565b60006020828403121561023d5761023c6101ec565b5b600061024b84828501610212565b91505092915050565b61025d816101f1565b82525050565b60006020820190506102786000830184610254565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006102b8826101f1565b91506102c3836101f1565b9250828210156102d6576102d561027e565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600061031b826101f1565b9150610326836101f1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561035b5761035a61027e565b5b828201905092915050565b6000610371826101f1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156103a4576103a361027e565b5b60018201905091905056fea26469706673582212209d92a59eb491e05b5b024588466fb37ab49cd9e2534146b6a3aaeba6d188381864736f6c634300080b0033';

@Injectable({
  providedIn: 'root',
})
export class FibonacciService {
  private fiboContract: any;
  private fiboContractAddress: string;

  private onTransactionGeneration = new Subject<string>(); // Source
  onTransactionGeneration$ = this.onTransactionGeneration.asObservable(); // Stream

  public isContractAvailable: boolean;

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
          gas: 1500000,
          gasPrice: this.connectionService.window.web3.utils.toWei(
            '0.00000005',
            'ether'
          ),
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
    return this.fiboContract.methods
      .generateFib(value)
      .send({ from: from })
      .then((result: any) => {
        this.onTransactionGeneration.next();
        return result;
      })
      .catch((error: Error) => console.log(error));
  }

  /**
   *
   * @param value - calculate this value
   * @param from  - the adress of the caller
   * @returns
   */
  callFib(value: number, from: string): Promise<any> {
    /* const fiboContract = new this.connectionService.window.web3.eth.Contract(
      fiboAbi
      ,'0xe95e1800Cf6F359AEa4476F891E29026DC7Ea843'
    ); */
    return this.fiboContract.methods.callFib(value).call({ from: from });
  }

  getTransactionByHash(hash: string) {
    return this.connectionService.window.web3.eth.getTransaction(hash)
  }
}
