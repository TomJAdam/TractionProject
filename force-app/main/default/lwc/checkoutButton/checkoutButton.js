import { LightningElement, api } from "lwc";
import checkoutBook from "@salesforce/apex/ItemUtility.checkoutBook";

export default class CheckoutButton extends LightningElement {
  @api
  item;

  handleClick() {
    checkoutBook({ objectId: this.item.Id })
      .then((result) => {
        console.log("result :", result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}
