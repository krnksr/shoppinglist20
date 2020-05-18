import { Shoppinglist } from './shoppinglist';
import {removeWhitespaces} from "@angular/compiler/src/ml_parser/html_whitespaces";

export class ShoppinglistFactory {

  static empty(): Shoppinglist {
  return new Shoppinglist(null, '',0, 0, new Date(),
    [{id:0, name:'', amount:'', maxPrice:0}],
    [{id:0, firstname:'', lastname:'', role:true, email:''}],
    []);
}

  static fromObject (rawShoppinglist: any): Shoppinglist {
    return new Shoppinglist(
      rawShoppinglist.id,
      rawShoppinglist.title,
      rawShoppinglist.finalSum,
      rawShoppinglist.user_id,
      typeof (rawShoppinglist.dueDate) ==='string' ?
          new Date(rawShoppinglist.dueDate) : rawShoppinglist.dueDate,
      rawShoppinglist.shoppingitems,
      rawShoppinglist.users,
      //rawShoppinglist.comments,
    );
  }
}
