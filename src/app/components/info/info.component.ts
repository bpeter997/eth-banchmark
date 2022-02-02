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

    this.userService.onUserChange$.subscribe(async () => {
      await this.getUserData();
      this.getnetworkInfo();
    });

    this.fibonacciService.onTransactionGeneration$.subscribe(() => {
      this.getUserData();
      this.getnetworkInfo();
    });
  }

  ngOnInit(): void {
    this.getAllInformation();
  }

  async getAllInformation(): Promise<void> {
    await this.getUserData();
    await this.getnetworkInfo();
    await this.setContract();
  }

  async getUserData(): Promise<void> {
    this.userData = await this.userService.getUserData();
    console.log(this.userData);

  }

  async getnetworkInfo(): Promise<void> {
    this.networkData = await this.networkService.getNetworkData();
  }

  async setContract(): Promise<void> {
    await this.fibonacciService.setFibonacciContract(this.userData!.address);
  }

  async callFibonacci(): Promise<void> {
    const fibres = await this.fibonacciService.callFib(
      5,
      this.userData!.address
    );
    console.log(fibres);
  }

  async generateFibonacci(): Promise<void> {
    await this.fibonacciService.generateFib(100, this.userData!.address);
  }
}
