import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  interval,
  map,
  mergeMap,
  Observable,
  Subject,
  takeWhile,
  tap,
} from 'rxjs';
import { Config } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private _configuration: BehaviorSubject<Config> = new BehaviorSubject<Config>(
    {
      count: false,
      countUp: true,
      initialValue: 0,
      speed: 1000,
      steps: 1,
    }
  );

  private _counter: number = this._configuration.getValue().initialValue;

  public interval$: Observable<number> = interval(
    this._configuration.getValue().speed
  )
    .pipe(takeWhile(() => this._configuration.getValue().count))
    .pipe(
      map(() =>
        this._configuration.getValue().countUp
          ? (this._counter += this._configuration.getValue().steps)
          : (this._counter -= this._configuration.getValue().steps)
      )
    );

  public configuration$: Observable<Config> =
    this._configuration.asObservable();

  myInterval() {}

  startCount(): void {
    this._configuration.next({ ...this._configuration.value, count: true });
  }

  pauseCount(): void {
    this._configuration.next({
      ...this._configuration.getValue(),
      count: false,
    });
  }

  resetCount(): void {
    // this._configuration.next({
    //   ...this._configuration.value,
    //   initialValue: this._configuration.value.initialValue,
    // });
    // console.log(this._configuration.getValue().initialValue);
    this._counter = this._configuration.getValue().initialValue;
  }

  setSteps(steps: number): void {
    this._configuration.next({ ...this._configuration.value, steps: steps });
  }

  setInitialValue(value: number): void {
    this._configuration.next({
      ...this._configuration.value,
      initialValue: value,
    });
  }

  setCountUp(): void {
    this._configuration.next({ ...this._configuration.value, countUp: true });
  }

  setCountDown(): void {
    this._configuration.next({ ...this._configuration.value, countUp: false });
  }
}
