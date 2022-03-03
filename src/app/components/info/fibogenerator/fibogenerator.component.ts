import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-fibogenerator',
  templateUrl: './fibogenerator.component.html',
  styleUrls: ['./fibogenerator.component.sass'],
})
export class FibogeneratorComponent implements OnInit {
  @Input() isFiboContractAvailable: boolean;
  @Output() callFibonacciEventEmitter = new EventEmitter<number>();
  @Output() generateFibonacciEventEmitter = new EventEmitter<number>();

  callValue = new FormControl(5, Validators.required)
  generateValue = new FormControl(5, Validators.required)

  constructor() {
    this.isFiboContractAvailable = false;
  }

  ngOnInit(): void {}

  callFibonacci() {
    this.callFibonacciEventEmitter.emit(this.callValue.value);
  }

  generateFibonacci() {
    this.generateFibonacciEventEmitter.emit(this.generateValue.value);
  }
}
