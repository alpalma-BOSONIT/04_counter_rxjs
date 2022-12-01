import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterControllersComponent } from './counter-controllers.component';

describe('CounterControllersComponent', () => {
  let component: CounterControllersComponent;
  let fixture: ComponentFixture<CounterControllersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterControllersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
