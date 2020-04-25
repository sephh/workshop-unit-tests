import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {LogoComponent} from './logo.component';

@NgModule({
  declarations: [LogoComponent],
  exports: [
    LogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LogoModule {
}
