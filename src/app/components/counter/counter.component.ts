import { Component, DoCheck, OnInit } from '@angular/core';
import {
  subscribeOn,
  Observable,
  interval,
  map,
  tap,
  takeWhile,
  concatMap,
} from 'rxjs';
import { Config } from 'src/app/interfaces/config.interface';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  counter: number = 0;
  config?: Config;

  constructor(private cs: CounterService) {}

  ngOnInit(): void {
    this.cs.configuration$.subscribe((val) => (this.config = val));
  }

  startCount(): void {
    if (this.config?.count) return;

    this.cs.startCount();
    this.cs.interval$.subscribe((val) => (this.counter = val));
  }

  pauseCount(): void {
    this.cs.pauseCount(); // Creo que no hace falta desuscribirse porque el takeWhile ya emite un complete.
  }
  resetCount(): void {
    console.log(this.config!.initialValue);
    this.counter = this.config!.initialValue;
  }
}
