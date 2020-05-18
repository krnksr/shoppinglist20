import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Shoppinglist, Shoppingitem, User, Comment } from "../shared/shoppinglist";
import {ShoppinglistWebshopService} from "../shared/shoppinglist-webshop.service";

@Component({
  selector: 'bs-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styles: []
})
export class ShoppinglistComponent implements OnInit {

  shoppinglists: Shoppinglist[];
  @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  constructor(private bs: ShoppinglistWebshopService) { }

  ngOnInit()  {
    this.bs.getAll().subscribe(res => this.shoppinglists = res);
  }

}
