import { Data } from "../../model/Data/Data";
import { ChecklistParams } from "../../model/Checklist/ChecklistParams";
import { CheckList } from "../../generators";
import { ChecklistProp } from "../../model/Checklist/ChecklistProp";
import { isObjectArray } from "../../utils";

interface CheckListHelperParams {
  hash?: ChecklistParams;
}

export class CheckListHelper {
  /**
   * This function checks if params was specified, if specified returns a custom props, otherwise returns a default props.
   * @param params
   * @return ChecklistProp | undefined
   */
  getCheckListProps = (
    params: CheckListHelperParams
  ): ChecklistProp | undefined => {
    let customProps;

    if (params && params.hash) {
      const { hash } = params;
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

    return customProps;
  };

  /**
   * This function gets the template parameters and returns a Markdown checklist.
   * @param data
   * @param options
   * @return string
   */
  getChecklistHelper = (
    data: Array<Data>,
    options: CheckListHelperParams
  ): string => {
    if (!isObjectArray(data))
      throw new Error("Data is not an array of objects");

    const props = this.getCheckListProps(options);

    return new CheckList(data, props).generate();
  };
}
