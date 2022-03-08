import { CallData } from './../../../models/callData';
import { TransactionData } from '../../../models/transaction';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultpanel',
  templateUrl: './resultpanel.component.html',
  styleUrls: ['./resultpanel.component.sass']
})
export class ResultpanelComponent implements OnInit {
  @Input() callData: CallData | null = null;
  @Input() transactionData: TransactionData | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
