import { NetworkService } from './../../../services/network/network.service';
import { NetworkData } from './../../../models/networkData';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-networkdetails',
  templateUrl: './networkdetails.component.html',
  styleUrls: ['./networkdetails.component.sass'],
})
export class NetworkdetailsComponent implements OnInit {
  @Input() networkData?: NetworkData;

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {}
}
