import { Component, Input, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.sass']
})
export class UserdataComponent implements OnInit {

  @Input() userData?: UserData;

  constructor() { }

  ngOnInit(): void {
  }

}
