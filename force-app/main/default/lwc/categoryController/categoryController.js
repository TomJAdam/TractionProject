import { LightningElement, wire } from "lwc";
import findCategories from "@salesforce/apex/CategoryUtility.findCategories";

const DELAY = 300;

export default class CategoryController extends LightningElement {
  searchKey = "";

  @wire(findCategories, { searchKey: "$searchKey" })
  categories;

  handleKeyChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, DELAY);
  }
}
