import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  counter: number = 0;

  constructor(private cs: CounterService) {}

  ngOnInit(): void {
    this.cs.counter$.subscribe((val) => (this.counter = val));
  }
}
