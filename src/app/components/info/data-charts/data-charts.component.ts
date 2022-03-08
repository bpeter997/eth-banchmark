import { ChartData } from './../../../models/chartData';
import { NetworkForChart } from '../../../models/NetworkForChart';
import { CallData } from './../../../models/callData';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TransactionData } from 'src/app/models/transaction';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.sass'],
})
export class DataChartsComponent implements OnInit, OnChanges {
  @Input() transactions: Array<TransactionData> = [];
  @Input() calls: Array<CallData> = [];

  isPriceDataSetActive: boolean = true;
  transactionsAreVisible: boolean = true;

  constructor() {}

  public chartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: (value: any) =>
            (!this.isPriceDataSetActive || !this.transactionsAreVisible)
              ? value + ' sec'
              : value + ' wei',
        },
      },
    },
  };
  public chartLabels: number[] = [];
  public chartType = 'line';
  public chartLegend = true;
  public chartData = [{ data: [{ x: 1, y: 1 }], label: '' }];

  ngOnInit() {}

  ngOnChanges() {
    this.refreshChart();
  }

  private refreshChart() {
    const networks: Array<NetworkForChart> = this.getNetworks(
      this.transactions,
      this.calls
    );
    this.chartData = this.initializeChartData(networks);
    this.chartLabels = this.initializeChartLabels(networks);
  }

  private initializeChartData(networks: NetworkForChart[]): ChartData[] {
    const chartData: ChartData[] = [];

    networks.forEach((network: NetworkForChart) => {
      if (this.transactionsAreVisible) {
        this.setChartDataForTransactions(chartData, network);
      } else {
        this.setChartDataForCalls(chartData, network);
      }
    });
    return chartData;
  }

  private setChartDataForTransactions(
    chartData: ChartData[],
    network: NetworkForChart
  ) {
    this.isPriceDataSetActive
      ? chartData.push(network.getPriceData())
      : chartData.push(network.getMiningDurationData());
  }

  private setChartDataForCalls(
    chartData: ChartData[],
    network: NetworkForChart
  ) {
    chartData.push(network.getCalculationDurationData());
  }

  private initializeChartLabels(networks: NetworkForChart[]): Array<number> {
    let labels: Array<number> = [];
    networks.forEach((network: NetworkForChart) => {
      labels = labels.concat(
        this.transactionsAreVisible
          ? network.getLabelsForTransactions()
          : network.getLabelsForCalls()
      );
    });
    labels.sort((a: number, b: number) => a - b);
    labels = [...new Set(labels)];
    return labels;
  }

  private getNetworks(
    transactions: Array<TransactionData>,
    calls: Array<CallData>
  ) {
    const networks: Array<NetworkForChart> = [];

    if (this.transactionsAreVisible) {
      transactions.forEach((currentTransaction: TransactionData) => {
        this.updateNetworkBasedOnTransaction(networks, currentTransaction);
      });
    } else {
      calls.forEach((currentCall: CallData) => {
        this.updateNetworkBasedOnCall(networks, currentCall);
      });
    }
    return networks;
  }

  private updateNetworkBasedOnTransaction(
    networks: NetworkForChart[],
    currentTransaction: TransactionData
  ) {
    const network: NetworkForChart | undefined = this.getNetworkById(
      networks,
      currentTransaction
    );
    if (network) {
      network.addTransasction(currentTransaction);
    } else {
      const newNetwork = new NetworkForChart(currentTransaction);
      newNetwork.addTransasction(currentTransaction);
      networks.push(newNetwork);
    }
  }

  private updateNetworkBasedOnCall(
    networks: NetworkForChart[],
    currentCall: CallData
  ) {
    const network: NetworkForChart | undefined = this.getNetworkById(
      networks,
      currentCall
    );
    if (network) {
      network.addCall(currentCall);
    } else {
      const newNetwork = new NetworkForChart(currentCall);
      newNetwork.addCall(currentCall);
      networks.push(newNetwork);
    }
  }

  private getNetworkById(
    networks: NetworkForChart[],
    currentData: CallData | TransactionData
  ) {
    return networks.find(
      (element) => element.networkId == currentData.networkId
    );
  }

  onTransactionViewButtonGroup(change: MatButtonToggleChange) {
    this.isPriceDataSetActive = change.value == 'true';
    this.refreshChart();
  }

  onChartViewButtonGroup(change: MatButtonToggleChange) {
    this.transactionsAreVisible = change.value == 'true';
    this.refreshChart();
  }
}
