export const fiboAbi = [
  {
    inputs: [{ internalType: 'uint256', name: 'n', type: 'uint256' }],
    name: 'callFib',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'fibseries',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
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
export const byteCode =
  '608060405234801561001057600080fd5b5061048f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632ddec39b146100465780639c7dd53c14610062578063b77773a514610092575b600080fd5b610060600480360381019061005b91906102d1565b6100c2565b005b61007c600480360381019061007791906102d1565b6101d0565b604051610089919061030d565b60405180910390f35b6100ac60048036038101906100a791906102d1565b610234565b6040516100b9919061030d565b60405180910390f35b6000806100cf9190610258565b6000600190806001815401808255809150506001900390600052602060002001600090919091909150556000600190806001815401808255809150506001900390600052602060002001600090919091909150556000600290505b818110156101cc576000806002836101429190610357565b815481106101535761015261038b565b5b9060005260206000200154600060018461016d9190610357565b8154811061017e5761017d61038b565b5b906000526020600020015461019391906103ba565b908060018154018082558091505060019003906000526020600020016000909190919091505580806101c490610410565b91505061012a565b5050565b6000808214156101e3576000905061022f565b6000600190506000600190506000600290505b84811015610228576000828461020c91906103ba565b905082935080925050808061022090610410565b9150506101f6565b5080925050505b919050565b6000818154811061024457600080fd5b906000526020600020016000915090505481565b50805460008255906000526020600020908101906102769190610279565b50565b5b8082111561029257600081600090555060010161027a565b5090565b600080fd5b6000819050919050565b6102ae8161029b565b81146102b957600080fd5b50565b6000813590506102cb816102a5565b92915050565b6000602082840312156102e7576102e6610296565b5b60006102f5848285016102bc565b91505092915050565b6103078161029b565b82525050565b600060208201905061032260008301846102fe565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006103628261029b565b915061036d8361029b565b9250828210156103805761037f610328565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006103c58261029b565b91506103d08361029b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561040557610404610328565b5b828201905092915050565b600061041b8261029b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561044e5761044d610328565b5b60018201905091905056fea264697066735822122039fb44110717ffdf8f27523844b7a5f21217b3e3bba19496a8e716ba9f9c6afc64736f6c634300080b0033';
