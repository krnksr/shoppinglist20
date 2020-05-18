import { ActivatedRoute, Router} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";

// import { BookFormErrorMessages } from './book-form-error-messages' ;
import { ShoppinglistFactory } from "../shared/shoppinglist-factory";
import { ShoppinglistWebshopService} from "../shared/shoppinglist-webshop.service";
import { Shoppinglist, Shoppingitem, User, Comment} from "../shared/shoppinglist";
import { ShoppinglistFormErrorMessages} from "./shoppinglist-form-error-messages";

@Component({
  selector: 'bs-shoppinglist-form',
  templateUrl: './shoppinglist-form.component.html',
  styles: []
})
export class ShoppinglistFormComponent implements OnInit {
  shoppinglistForm: FormGroup;
  shoppinglist = ShoppinglistFactory.empty();
  errors: {[key: string]: string} = {};
  isUpdatingShoppinglist = false;
  shoppingitems: FormArray;

  constructor(private fb: FormBuilder, private bs: ShoppinglistWebshopService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id){
      this.isUpdatingShoppinglist = true;
      this.bs.getSingle(id).subscribe(shoppinglist => {
        this.shoppinglist = shoppinglist;
        this.initShoppinglist();
      });
    }
    this.initShoppinglist();
  }

  initShoppinglist(){
    console.log('hier');
   this.buildItemsArray();

    this.shoppinglistForm = this.fb.group({
      id: this.shoppinglist.id,
      title: [this.shoppinglist.title, Validators.required],
      dueDate: this.shoppinglist.dueDate,
      shoppingitems: this.shoppingitems,
      });
    //this.shoppinglistForm.statusChanges.subscribe(() =>
    //this.updateErrorMessages());
  }

  buildItemsArray(){
    console.log('hier');
    //console.log(this.shoppinglist.shoppingitems);
    if (this.shoppinglist.shoppingitems.length == 0){
      this.shoppinglist.shoppingitems.push(new Shoppingitem(0,'','',0))
    }
    this.shoppingitems = this.fb.array(
      this.shoppinglist.shoppingitems.map(
        i => this.fb.group({
          id: this.fb.control(i.id),
          name: this.fb.control(i.name),
          amount: this.fb.control(i.amount),
          maxPrice: this.fb.control(i.maxPrice),
        })
      )
    );

  }

  //hier könnte noch ein Fehler sein
  submitForm(){
    console.log(this.shoppinglistForm.value);
    const shoppinglist : Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglistForm.value);
    shoppinglist.shoppingitems = this.shoppinglistForm.value.shoppingitems;
    shoppinglist.user_id = 1 ;
    shoppinglist.finalSum = null;

    //shoppinglist.users = this.shoppinglist.users;
    console.log(shoppinglist);

    if (this.isUpdatingShoppinglist){
      this.bs.update(shoppinglist).subscribe(res => {
        this.router.navigate(['../../shoppinglists', shoppinglist.id],
          { relativeTo: this.route  })
      });
    } else {
      this.bs.create(shoppinglist).subscribe(res =>{
        this.shoppinglist = ShoppinglistFactory.empty();
        this.shoppinglistForm.reset(ShoppinglistFactory.empty());
        this.router.navigate(['../shoppinglists'], {relativeTo: this.route});
      });

    }



  }

  addItemControl(){
    this.shoppingitems.push(this.fb.group({name: null, amount:null, maxPrice:null}));
  }


  /*
  updateErrorMessages() {
    this.errors = {};
    for (const message of ShoppinglistFormErrorMessages) {
      const control = this.shoppinglistForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
  */
}

