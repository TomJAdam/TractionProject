import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import checkoutBook from "@salesforce/apex/ItemUtility.checkoutBook";
import findAccounts from "@salesforce/apex/AccountUtility.findAccounts";

export default class RapidCheckout extends LightningElement {
  @track options = [];
  @track selectedOpt;

  connectedCallback() {
    findAccounts()
      .then((res) => {
        const accounts = res.map(({ Id, Name }) => {
          return { label: Name, value: Id };
        });

        this.options = accounts;
      })
      .catch((e) => {
        this.error = e;
      });
  }

  handleChange(event) {
    this.selectedOpt = event.detail.value;
  }

  handleResetRapidCheckout() {
    this.template.querySelector('lightning-input[data-name="item"]').value =
      null;
  }

  handleKeyChange(event) {
    let searchKey = event.target.value;

    if (event.which == 13) {
      checkoutBook({ objectId: searchKey, accountId: this.selectedOpt })
        .then(() => {
          const evt = new ShowToastEvent({
            title: "Success",
            message: "Item successfully checked out",
            variant: "success"
          });
          this.dispatchEvent(evt);

          searchKey = "";
          this.handleResetRapidCheckout();
        })
        .catch((e) => {
          console.log("e :", e);
          const evt = new ShowToastEvent({
            title: "Error",
            message: "Item is already checked out",
            variant: "warning"
          });
          this.dispatchEvent(evt);
        });
    }
  }
}
