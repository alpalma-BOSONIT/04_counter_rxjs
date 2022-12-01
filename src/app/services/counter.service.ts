import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { Config } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  // Interface for config
  // BS for setting the config -> modify from external components
  private _configuration: BehaviorSubject<Config> = new BehaviorSubject<Config>(
    {
      count: false,
      countUp: true,
      initialValue: 0,
      speed: 1000,
      steps: 1,
    }
  );

  private _currentValue: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  public configuration$: Observable<Config> =
    this._configuration.asObservable();

  constructor() {}

  setCurrentCount(currentValue: number): void {
    this._currentValue.next(currentValue);
  }

  startCount(): void {
    this._configuration.next({ ...this._configuration.value, count: true });
  }

  pauseCount(): void {
    // this._configuration.next({
    //   ...this._configuration.value,
    //   count: false,
    //   initialValue: this._currentValue.value,
    // });
    this._configuration.complete();
  }

  resetCount(): void {
    this._configuration.next({
      ...this._configuration.value,
      initialValue: this._configuration.value.initialValue,
    });
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
}
