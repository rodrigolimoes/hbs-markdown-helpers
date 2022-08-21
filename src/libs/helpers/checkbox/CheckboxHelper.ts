import { Checkbox } from "../../generators";

export class CheckboxHelper {
  getCheckboxhelper = (options: {
    hash?: { checked: boolean; label: string };
  }) => {
    try {
      if (options && options.hash) {
        const { hash } = options;
        const { checked, label } = hash;

        if (!label || checked === undefined)
          throw new Error("Label or Checked cannot be undefined");

        return new Checkbox({
          checked: checked,
          label: label,
        }).generate();
      }
    } catch (e) {
      throw e;
    }
  };
}
