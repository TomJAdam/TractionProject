import { LightningElement, api } from "lwc";
import checkoutItem from "@salesforce/apex/ItemUtility.checkoutItem";

export default class CheckoutButton extends LightningElement {
  @api
  item;

  handleClick() {
    checkoutItem({ objectId: this.item.Id });
  }
}
