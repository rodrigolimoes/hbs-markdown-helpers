import { tableHelper } from "./tableHelper/tableHelper";
import { checkListHelper } from "./checkListHelper/checkListHelper";
import { checkboxHelper } from "./checkboxHelper/checkboxHelper";

export const getHelpersMarkdown = () => {
  return {
    array: (values: string): Array<string> => values.split(","),
    md_table: tableHelper,
    md_checklist: checkListHelper,
    md_checkbox: checkboxHelper,
  };
};
