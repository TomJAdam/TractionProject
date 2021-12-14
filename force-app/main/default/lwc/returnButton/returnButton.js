import { LightningElement, api } from "lwc";
import returnBook from "@salesforce/apex/ItemUtility.returnBook";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ReturnButton extends LightningElement {
  @api
  item;
  @api
  account;

  handleClick() {
    returnBook({ objectId: this.item.Id, accountId: this.account })
      .then(() => {
        const evt = new ShowToastEvent({
          title: "Success",
          message: "Item successfully returned",
          variant: "success"
        });
        this.dispatchEvent(evt);
      })
      .catch((e) => {
        const evt = new ShowToastEvent({
          title: "Error",
          message: "Item is still available",
          variant: "warning"
        });
        this.dispatchEvent(evt);
      });
  }
}
