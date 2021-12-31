import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { FibonacciService } from 'src/app/services/fibonacci/fibonacci.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass'],
})
export class StartComponent implements OnInit {
  userData!: UserData;

  constructor(
    private connectionService: ConnectionService,
    private fibonacciService: FibonacciService
  ) {
    this.connectionService.onAccountChange = this.getUserData.bind(this);
  }

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData(): Promise<void> {
    this.userData = await this.connectionService.getUserData();
    console.log(this.userData);
    this.fibonacciService.callFib(15).then((data) => {
      console.log(data);

    });
  }
}
