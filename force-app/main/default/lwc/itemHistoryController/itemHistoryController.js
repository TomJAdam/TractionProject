import { LightningElement, wire } from "lwc";
import findItemHistory from "@salesforce/apex/ItemHistoryController.findItemHistory";

const DELAY = 300;

export default class ItemHistoryController extends LightningElement {
  searchKey = "";

  @wire(findItemHistory, { searchKey: "$searchKey" })
  itemHistory;

  handleKeyChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, DELAY);
  }
}
