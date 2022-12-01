import { Component, DoCheck, OnInit } from '@angular/core';
import { subscribeOn, Observable, interval, map, tap } from 'rxjs';
import { Config } from 'src/app/interfaces/config.interface';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  count: number = 0;
  initialValue: number = 0;
  start: boolean = false;
  speed: number = 1000;
  steps: number = 1;
  countUp: boolean = true;

  interval = interval(this.speed)
    .pipe(
      map(
        () => {
          if (this.countUp && this.start) {
            this.count += this.steps;
            this.cs.setCurrentCount(this.count);
          } else if (!this.countUp && this.start) {
            this.count -= this.steps;
            this.cs.setCurrentCount(this.count);
          } else {
            return;
            this.count += 0;
          }
        }
        // this.countUp && this.start
        //   ? (this.count += this.steps)
        //   : !this.countUp && this.start
        //   ? (this.count -= this.steps)
        //   : (this.count += 0)
      ),
      tap(() => console.log(this.count))
    )
    .subscribe();

  constructor(private cs: CounterService) {}

  ngOnInit(): void {
    this.cs.configuration$.subscribe(
      ({ initialValue, count, speed, steps, countUp }) => {
        this.count = initialValue;
        this.initialValue = initialValue;
        this.start = count;
        this.speed = speed;
        this.steps = steps;
        this.countUp = countUp;
      }
    );
  }

  ngDoCheck(): void {
    if (this.start) {
      // this.interval.subscribe();
    } else if (!this.start) {
      this.interval.unsubscribe();
    }
  }
}
