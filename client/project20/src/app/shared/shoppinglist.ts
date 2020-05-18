import {Shoppingitem} from "./shoppingitem";
export {Shoppingitem} from "./shoppingitem";
import {User} from "./user";
export {User} from "./user";
import {Comment} from "./comment";
export {Comment} from "./comment";

export class Shoppinglist {
  constructor(
    public id: number,
    public title: string,
    public finalSum: number,
    public user_id:number,
    public dueDate: Date,
    public shoppingitems?: Shoppingitem[],
    public users?: User[],
    public comments?: Comment[]
  ) {
  }

}
