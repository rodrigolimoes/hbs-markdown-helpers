import { Table } from "../generators/index";
import { OptionsTable } from "../model/OptionTable";
import { Data } from "../model/Data";

export default class HelperMarkdown {
  getHelpersMarkdown = () => {
    return {
      array: (values: string): Array<string> => values.split(","),
      md_table: (data: Data[], options: { hash?: OptionsTable }) => {
        const optionsTable = options?.hash;

        const table = new Table(data, optionsTable);
        return table.generate();
      },
    };
  };
}
