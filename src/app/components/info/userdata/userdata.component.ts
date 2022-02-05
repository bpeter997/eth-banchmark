import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserData } from 'src/app/models/userData';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.sass']
})
export class UserdataComponent implements OnInit, OnChanges {

  @Input() userData?: UserData;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);

  }

}
