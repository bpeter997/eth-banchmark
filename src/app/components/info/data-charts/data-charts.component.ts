import { NetworkDataForChart } from '../../../models/NetworkDataForChart';
import { TransactionDataForChart } from '../../../models/TransactionDataForChart';
import { CallData } from './../../../models/callData';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { concat } from 'rxjs';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.sass'],
})
export class DataChartsComponent implements OnInit, OnChanges {
  @Input() transactions: Array<Transaction> = [];
  @Input() calls: Array<CallData> = [];

  constructor() {}

  public chartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
  };
  public chartLabels: number[] = [];
  public chartType = 'line';
  public chartLegend = true;
  public chartData = [{ data: [{x:1,y:1}], label: '' }];

  ngOnInit() {}

  ngOnChanges() {
    this.chartData = [];

    const trnasactionCollectors: Array<NetworkDataForChart> = [];
    this.transactions.forEach((currentTransaction: Transaction) => {
      const transsactionCollector = trnasactionCollectors.find(
        (element) => element.networkId == currentTransaction.networkId
      );
      if (transsactionCollector) {
        transsactionCollector.addTransasction(currentTransaction);
      } else {
        trnasactionCollectors.push(
          new NetworkDataForChart(currentTransaction)
        );
      }

    });
    trnasactionCollectors.forEach((trnasactionCollector) => {
      this.chartData.push(trnasactionCollector.getPriceDatas());
      this.chartLabels = trnasactionCollector.getLabels();
    });
    //this.chartData.push({data: [{3},4,8,35]})
  }
}
