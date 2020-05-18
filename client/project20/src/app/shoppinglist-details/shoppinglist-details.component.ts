import { Component, OnInit } from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistWebshopService} from "../shared/shoppinglist-webshop.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {AuthService} from "../shared/authentication.service";


@Component({
  selector: 'bs-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styles: []
})

export class ShoppinglistDetailsComponent implements OnInit{

    shoppinglist: Shoppinglist = ShoppinglistFactory.empty();

  constructor(
    private bs: ShoppinglistWebshopService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ){ }

    ngOnInit() {
      const params = this.route.snapshot.params;
      //console.log(params['id']);
      this.bs.getSingle(params['id']).subscribe(b => {
        this.shoppinglist = b;
        console.log(this.shoppinglist);
      });
      console.log(this.shoppinglist);
    }

    removeShoppinglist() {
    if (confirm('Einkaufsliste wirklich löschen?')) {
      this.bs.remove(this.shoppinglist.id).subscribe(res =>
        this.router.navigate(['../'],
        {relativeTo: this.route}));
    }
   }

  updateShoppinglist() {
    if (confirm('Einkaufsliste wirklich löschen?')) {
      this.bs.remove(this.shoppinglist[this.shoppinglist.id]).subscribe(res =>
        this.router.navigate(['../'],
          {relativeTo: this.route}));
    }
  }

  /*
    @Input() shoppinglist: Shoppinglist;
    @Output() showListEvent = new EventEmitter<any>();

     showShoppinglist(){
      this.showListEvent.emit();
    }
     */
}
