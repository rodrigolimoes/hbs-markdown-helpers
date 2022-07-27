import { Data } from "../../model/Data";
import { OptionsCheckbox } from "../../model/OptionCheckbox";
import Checkbox from "./checkbox";

export default class CheckList {
  private data: Array<Data>;
  private options?: OptionsCheckbox;

  constructor(data: Array<Data>, options?: OptionsCheckbox) {
    this.data = data;
    this.options = options;
  }

  isBoolean = (value: any) => {
    return typeof value === "boolean";
  };

  isString = (value: any) => {
    return typeof value === "string";
  };

  customCheckboxList = (
    data: Array<Data>,
    { checked, label }: OptionsCheckbox
  ): string => {
    let checkList: string = "";

    if (checked && label) {
      data.forEach((e) => {
        const checkbox = new Checkbox(e[checked], e[label]);

        checkList += checkbox.generate();
      });
    } else {
      data.forEach((e) => {
        let defaultCheckbox: any = {
          checked: checked ? e[checked] : false,
          label: label ? e[label] : "",
        };

        for (const key in e) {
          if (!label && this.isString(e[key])) {
            defaultCheckbox.label = e[key];
            break;
          }

          if (!checked && this.isBoolean(e[key])) {
            defaultCheckbox.checked = e[key];
            break;
          }
        }
        const checkbox = new Checkbox(
          defaultCheckbox.checked,
          defaultCheckbox.label
        );
        checkList += checkbox.generate();
      });
    }

    return checkList;
  };

  generate() {
    const { data, options } = this;
    let checkList: string = "";

    if (!options) {
      data.forEach((e) => {
        let checked: boolean = false;
        let label: string = "";

        for (const key in e) {
          if (this.isBoolean(e[key])) {
            checked = e[key];
          }

          if (this.isString(e[key]) && label === "") {
            label = e[key];
          }
        }

        const checkbox = new Checkbox(checked, label);
        checkList += checkbox.generate();
      });
    } else {
      checkList += this.customCheckboxList(data, options);
    }

    return checkList;
  }
}
