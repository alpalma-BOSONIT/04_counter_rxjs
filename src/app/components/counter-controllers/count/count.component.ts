import { Component } from '@angular/core';
import { CounterService } from '../../../services/counter.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
})
export class CountComponent {
  constructor(private cs: CounterService) {}

  setCountUp(): void {
    this.cs.setCountUp();
  }

  setCountDown(): void {
    this.cs.setCountDown();
  }
}
