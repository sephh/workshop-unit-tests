import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNotFoundComponent } from './item-not-found.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [ItemNotFoundComponent],
  exports: [
    ItemNotFoundComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ItemNotFoundModule { }
