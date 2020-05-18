import { Component, OnInit, Input } from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";

@Component({
  selector: 'a.bs-shoppinglist-item',
  templateUrl: './shoppinglist-item.component.html',
  styles: []
})
export class ShoppinglistItemComponent implements OnInit {

  @Input() shoppinglist: Shoppinglist
  constructor() { }

  ngOnInit() {
  }

}
