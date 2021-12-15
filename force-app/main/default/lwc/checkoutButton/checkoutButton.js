import { LightningElement, api } from "lwc";
import checkoutBook from "@salesforce/apex/ItemUtility.checkoutBook";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class CheckoutButton extends LightningElement {
  @api
  item;
  @api
  account;
  @api
  triggerrefresh;

  handleClick() {
    checkoutBook({ objectId: this.item.Id, accountId: this.account })
      .then((res) => {
        console.log("res :", res);
        const evt = new ShowToastEvent({
          title: "Success",
          message: "Item successfully checked out",
          variant: "success"
        });
        this.dispatchEvent(evt);
        this.triggerrefresh();
      })
      .catch((e) => {
        const evt = new ShowToastEvent({
          title: "Error",
          message: "Item is already checked out",
          variant: "warning"
        });
        this.dispatchEvent(evt);
      });
  }
}
