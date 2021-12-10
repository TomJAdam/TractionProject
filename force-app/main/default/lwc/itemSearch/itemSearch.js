import { LightningElement, wire } from "lwc";
import findItems from "@salesforce/apex/ItemUtility.findItems";

const DELAY = 300;

export default class ItemSearch extends LightningElement {
  searchKey = "";

  @wire(findItems, { searchKey: "$searchKey" })
  items;

  handleKeyChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, DELAY);
  }
}
