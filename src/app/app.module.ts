import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './core/layout/header/header.module';
import {StateModule} from './state/state.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // State
    StateModule,

    // Core Modules
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
