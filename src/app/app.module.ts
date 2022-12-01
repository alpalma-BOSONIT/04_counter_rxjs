import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { CounterControllersComponent } from './components/counter-controllers/counter-controllers.component';
import { SetupComponent } from './components/counter-controllers/setup/setup.component';
import { CountComponent } from './components/counter-controllers/count/count.component';
import { InputsComponent } from './components/counter-controllers/inputs/inputs.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, CounterControllersComponent, SetupComponent, CountComponent, InputsComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
