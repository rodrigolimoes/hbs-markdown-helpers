import { Table, CheckList } from "../generators/index";
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

          if (hash.propLabel || hash.propChecked) {
            customProps = {
              checked: hash && hash.propChecked ? hash.propChecked : undefined,
              label: hash && hash.propLabel ? hash.propLabel : undefined,
            };
          } else {
            customProps = undefined;
          }
        }

        const checkboxList = new CheckList(data, customProps);
        return checkboxList.generate();
      },
    };
  };
}
