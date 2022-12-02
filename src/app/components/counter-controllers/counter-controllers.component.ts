import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter-controllers',
  templateUrl: './counter-controllers.component.html',
  styleUrls: ['./counter-controllers.component.scss'],
})
export class CounterControllersComponent implements OnInit {
  @Output() startCounter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetCounter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  startCount(): void {
    this.startCounter.emit(true);
  }

  resetCount(): void {
    this.resetCounter.emit(true);
  }
}
