export interface NetworkData {
  id: number;
  chainName: string;
  networkType: number;
  blockNumber: number;
  lastBlockTransactionCount: number;
  peerCount: number;
  medianGasPrice: number;
}
