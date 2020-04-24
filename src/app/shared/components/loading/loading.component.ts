import {Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'loc-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() diameter: number = 24;
  @Input() color: ThemePalette;

  constructor() { }

  ngOnInit(): void {
  }

}
