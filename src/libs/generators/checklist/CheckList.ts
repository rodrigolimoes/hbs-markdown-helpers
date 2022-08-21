import { Data } from "../../model/Data/Data";
import { ChecklistProp } from "../../model/Checklist/ChecklistProp";
import { isBoolean, isString } from "../../utils";
import Checkbox from "../checkbox/Checkbox";

export default class CheckList {
  private data: Array<Data>;
  private prop?: ChecklistProp;

  constructor(data: Array<Data>, prop?: ChecklistProp) {
    this.data = data;
    this.prop = prop;
  }

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
        let controllerPropChecked = false;
        for (const key in element) {
          if (!prop) {
            if (isString(element[key]) && defaultLabel === "") {
              defaultLabel = element[key];
            }

            if (isBoolean(element[key]) && !controllerPropChecked) {
              defaultChecked = element[key];
              controllerPropChecked = true;
            }
          }

          if (prop && (!prop.label || !prop.checked)) {
            if (!prop.checked && isBoolean(element[key])) {
              defaultChecked = element[key];
              defaultLabel = prop.label ? element[prop.label] : "";
              break;
            }

            if (!prop.label && isString(element[key])) {
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
