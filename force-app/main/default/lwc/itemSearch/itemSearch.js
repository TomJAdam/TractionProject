import { LightningElement, wire, track } from "lwc";
import findItems from "@salesforce/apex/ItemUtility.findItems";
import findAccounts from "@salesforce/apex/AccountUtility.findAccounts";

const DELAY = 300;

export default class ItemSearch extends LightningElement {
  searchKey = "";
  @track options = [];
  @track selectedOpt;

  @wire(findItems, { searchKey: "$searchKey" })
  items;

  handleKeyChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, DELAY);
  }

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
}
