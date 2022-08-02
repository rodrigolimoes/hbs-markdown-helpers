import { Data } from "../../model/Data/Data";
import { ChecklistParams } from "../../model/Checklist/ChecklistParams";
import { CheckList } from "../../generators";

export class CheckListHelper {
  getChecklistHelper = (
    data: Array<Data>,
    options: { hash?: ChecklistParams }
  ) => {
    let customProps;

    if (options && options.hash) {
      const { hash } = options;
      const { propChecked, propLabel } = hash;

      if (propLabel || propChecked) {
        customProps = {
          checked: hash && propChecked ? propChecked : undefined,
          label: hash && propLabel ? propLabel : undefined,
        };
      } else {
        customProps = undefined;
      }
    }

    const checkboxList = new CheckList(data, customProps);
    return checkboxList.generate();
  };
}
