import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, takeWhile, tap } from 'rxjs';
import { Config } from '../interfaces/config.interface';
import { Inputs } from '../interfaces/inputs.interface';

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
  private _counter: BehaviorSubject<number> = new BehaviorSubject<number>(
    this._configuration.getValue().initialValue
  );

  private interval$: Observable<number> = interval(
    this._configuration.getValue().speed
  ).pipe(
    takeWhile(() => this._configuration.getValue().count),
    tap(() => {
      let counter = this._counter.getValue();

      if (this._configuration.getValue().countUp) {
        this._counter.next((counter += this._configuration.getValue().steps));
      } else {
        this._counter.next((counter -= this._configuration.getValue().steps));
      }
    })
  );

  public configuration$: Observable<Config> =
    this._configuration.asObservable();

  public counter$ = this._counter.asObservable();

  startCount(): void {
    if (this._configuration.getValue().count) return;

    this._configuration.next({ ...this._configuration.value, count: true });
    this.interval$.subscribe();
  }

  pauseCount(): void {
    this._configuration.next({
      ...this._configuration.getValue(),
      count: false,
    });
  }

  resetCount(): void {
    this._counter.next(this._configuration.getValue().initialValue);
  }

  setCountUp(): void {
    this._configuration.next({ ...this._configuration.value, countUp: true });
  }

  setCountDown(): void {
    this._configuration.next({ ...this._configuration.value, countUp: false });
  }

  setInputs(newValue: Inputs): void {
    this._configuration.next({ ...this._configuration.value, ...newValue });

    if (!this._configuration.getValue().count)
      this._counter.next(newValue.initialValue);
  }
}
