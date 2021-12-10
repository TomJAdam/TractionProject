import { LightningElement, api } from "lwc";
import checkoutBook from "@salesforce/apex/ItemUtility.findItems";

export default class CheckoutButton extends LightningElement {
  @api
  handleClick(event) {
    console.log("event :", event);

    checkoutBook(event.target.Id);
  }
}
