import { Table, CheckList, Checkbox } from "../generators/index";
import { OptionsTable } from "../model/Table/OptionTable";
import { ChecklistParams } from "../model/Checklist/ChecklistParams";
import { Data } from "../model/Data/Data";

export default class HelperMarkdown {
  getHelpersMarkdown = () => {
    return {
      array: (values: string): Array<string> => values.split(","),
      md_table: (data: Data[], options: { hash?: OptionsTable }) => {
        const optionsTable = options?.hash;

        const table = new Table(data, optionsTable);
        return table.generate();
      },
      md_checklist: (
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
      },
      md_checkbox: (options: {
        hash?: { checked: boolean; label: string };
      }) => {
        if (options && options.hash) {
          const { hash } = options;
          const { checked, label } = hash;

          if (!label) new Error("propLabel cannot be undefined");

          if (checked === undefined)
            new Error("propChecked cannot be undefined");

          return new Checkbox({
            checked: checked,
            label: label,
          }).generate();
        } else {
          new Error("Parameters cannot be undefined");
        }
      },
    };
  };
}
