import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass']
})
export class StartComponent implements OnInit {
  private userData!: UserData;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.getUserData()
  }

  async getUserData() {
    this.userData = await this.connectionService.getUserData();
    console.log(this.userData);
    
  }

}
