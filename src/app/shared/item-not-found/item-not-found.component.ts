import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'loc-item-not-found',
  templateUrl: './item-not-found.component.html',
  styleUrls: ['./item-not-found.component.scss']
})
export class ItemNotFoundComponent implements OnInit {

  @Input() label = 'Nenhum item encontrado.';
  @Input() buttonLabel = 'Novo item';

  @Input() canAdd = true;

  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit();
  }

}
