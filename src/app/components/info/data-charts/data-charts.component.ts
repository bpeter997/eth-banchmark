import { MappedTransaction } from './../../../models/mappedTransaction';
import { CallData } from './../../../models/callData';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TransactionData } from 'src/app/models/transactionData';
import { ChartDataset, ScatterDataPoint } from 'chart.js';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.sass']
})
export class DataChartsComponent implements OnInit, OnChanges {
  @Input() transactions: Array<TransactionData> = [];
  @Input() calls: Array<CallData> = [];

  constructor() { }

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLabels: number[] = [];
  public chartType = 'line';
  public chartLegend = true;
  public chartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  ngOnInit() {
  }

  ngOnChanges() {
    const transactionMap: Map<number,MappedTransaction> = new Map();
    this.transactions.forEach((transaction: TransactionData) => {
      const mappedTransaction = transactionMap.get(transaction.fiboValue)
      if(!mappedTransaction) {
        transactionMap.set(transaction.fiboValue, new MappedTransaction(transaction.gasPrice, transaction.blockMiningDuration));
      } else {
        mappedTransaction.addValues(transaction.gasPrice,transaction.blockMiningDuration);
      }
    })
    const data: Array<number> = [];
    transactionMap.forEach((value: MappedTransaction, key: number) => {
      this.chartLabels.push(key);
      data.push(value.getAvgGasPrice())
    })
    this.chartData = [{data: data, label: 'Series A'}]
  }

}
