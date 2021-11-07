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
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData() {
    this.userData = await this.connectionService.getUserData();
    // this.fibonacciService.callFib(121).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
