import { Component, EventEmitter, Output } from '@angular/core';
import { CounterService } from '../../../services/counter.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  constructor(private cs: CounterService) {}

  startCount(): void {
    this.cs.startCount();
  }

  pauseCount(): void {
    this.cs.pauseCount();
  }

  resetCount(): void {
    this.cs.resetCount();
  }
}
