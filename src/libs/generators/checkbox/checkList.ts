import { Data } from "../../model/Data/Data";
import { ChecklistProp } from "../../model/Checklist/ChecklistProp";
import Checkbox from "./checkbox";

export default class CheckList {
  private data: Array<Data>;
  private prop?: ChecklistProp;

  constructor(data: Array<Data>, prop?: ChecklistProp) {
    this.data = data;
    this.prop = prop;
  }

  isBoolean = (value: any) => {
    return typeof value === "boolean";
  };

  isString = (value: any) => {
    return typeof value === "string";
  };

  generate() {
    const { data, prop } = this;
    let checkList: string = "";

    let defaultChecked: boolean = false;
    let defaultLabel: string = "";

    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      if (prop && prop.checked && prop.label) {
        defaultChecked = element[prop.checked];
        defaultLabel = element[prop.label];
      } else {
        for (const key in element) {
          if (!prop) {
            if (this.isString(element[key]) && defaultLabel === "") {
              defaultLabel = element[key];
            }

            if (this.isBoolean(element[key])) {
              defaultChecked = element[key];
            }
          }

          if (prop && (!prop.label || !prop.checked)) {
            if (!prop.checked && this.isBoolean(element[key])) {
              defaultChecked = element[key];
              defaultLabel = prop.label ? element[prop.label] : "";
              break;
            }

            if (!prop.label && this.isString(element[key])) {
              defaultLabel = element[key];
              defaultChecked = prop.checked ? element[prop.checked] : false;
              break;
            }
          }
        }
      }
      const checkbox = new Checkbox({
        checked: defaultChecked,
        label: defaultLabel,
      });
      checkList += checkbox.generate();
    }

    return checkList;
  }
}
