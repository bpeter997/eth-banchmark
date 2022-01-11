import { NetworkService } from './../../services/network/network.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { FibonacciService } from 'src/app/services/fibonacci/fibonacci.service';
import { NetworkData } from 'src/app/models/networkData';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass'],
})
export class InfoComponent implements OnInit {
  userData?: UserData;
  networkData?: NetworkData;

  constructor(
    private userService: UserService,
    private networkService: NetworkService,
    private fibonacciService: FibonacciService
  ) {
    this.userService.onUserChange$.subscribe(() => {
      this.getUserData();
    });
  }

  ngOnInit(): void {
    this.getUserData();
    this.getnetworkInfo();
  }

  async getUserData(): Promise<void> {
    this.userData = await this.userService.getUserData();
    this.fibonacciService.callFib(5);
  }

  async getnetworkInfo(): Promise<void> {
    this.networkData = await this.networkService.getNetworkData();
  }
}