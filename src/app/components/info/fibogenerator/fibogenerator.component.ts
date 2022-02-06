import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-fibogenerator',
  templateUrl: './fibogenerator.component.html',
  styleUrls: ['./fibogenerator.component.sass'],
})
export class FibogeneratorComponent implements OnInit {
  @Input() isFiboContractAvailabel: boolean;
  @Output() callFibonacciEventEmitter = new EventEmitter<number>();
  @Output() generateFibonacciEventEmitter = new EventEmitter<number>();

  constructor() {
    this.isFiboContractAvailabel = false;
  }

  ngOnInit(): void {}

  callFibonacci(value: number) {
    this.callFibonacciEventEmitter.emit(value);
  }

  generateFibonacci(value: number) {
    this.generateFibonacciEventEmitter.emit(value);
  }
}
