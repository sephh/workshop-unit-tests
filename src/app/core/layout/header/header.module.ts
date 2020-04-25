import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LogoModule} from '../logo/logo.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        LogoModule,
        RouterModule
    ]
})
export class HeaderModule {
}
