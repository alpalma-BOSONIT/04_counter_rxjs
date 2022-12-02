import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../../services/counter.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
})
export class CountComponent implements OnInit {
  constructor(private cs: CounterService) {}

  ngOnInit(): void {}

  setCountUp(): void {
    this.cs.setCountUp();
  }

  setCountDown(): void {
    this.cs.setCountDown();
  }
}
