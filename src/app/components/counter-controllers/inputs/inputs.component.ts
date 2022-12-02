import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { CounterService } from 'src/app/services/counter.service';
import { Inputs } from '../../../interfaces/inputs.interface';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  debouncer: Subject<Inputs> = new Subject<Inputs>();

  initialValue: number = 0;
  steps: number = 0;

  inputs: FormGroup = this.fb.group({
    initialValue: [this.initialValue],
    steps: [this.steps],
  });

  constructor(private fb: FormBuilder, private cs: CounterService) {}

  ngOnInit(): void {
    this.cs.configuration$.subscribe(({ initialValue, steps }) => {
      this.initialValue = initialValue;
      this.steps = steps;
    });

    this.inputs.setValue({
      initialValue: this.initialValue,
      steps: this.steps,
    });
  }

  setInputs(): void {
    this.debouncer.next(this.inputs.value);
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe((val) => this.cs.setInputs(val));
  }
}
