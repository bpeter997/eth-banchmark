import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { FibonacciService } from 'src/app/services/fibonacci/fibonacci.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass'],
})
export class InfoComponent implements OnInit {
  userData?: UserData;

  constructor(
    private userService: UserService,
    private fibonacciService: FibonacciService
  ) {
    this.userService.onAccountChange = this.getUserData.bind(this);
  }

  ngOnInit(): void {
    this.getUserData();
    this.getnetworkInfo();
  }

  async getUserData(): Promise<void> {
    this.userData = await this.userService.getUserData();
  }

  async getnetworkInfo(): Promise<void> {
    //let networkInfo = await this.userService.getNetworkInfo();
    //console.log(networkInfo);
  }
}
