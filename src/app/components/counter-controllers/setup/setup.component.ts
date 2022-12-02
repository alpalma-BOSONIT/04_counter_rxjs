import { Component, EventEmitter, Output } from '@angular/core';
import { CounterService } from '../../../services/counter.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  @Output() startCounter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetCounter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private cs: CounterService) {}

  startCount(): void {
    this.startCounter.emit(true);
  }

  pauseCount(): void {
    this.cs.pauseCount();
  }

  resetCount(): void {
    this.cs.resetCount();
    this.resetCounter.emit(true);
  }
}
