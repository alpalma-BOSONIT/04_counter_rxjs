import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.scss'],
})
export class ConfigViewComponent implements OnInit {
  config = {};
  counter = {};

  constructor(private cs: CounterService) {}

  ngOnInit(): void {
    this.cs.configuration$.subscribe((val) => (this.config = val));
    this.cs.counter$.subscribe((val) => (this.counter = val));
  }
}
