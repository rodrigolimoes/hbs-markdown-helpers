import { tableHelper } from "./table/tableHelper";
import { checkListHelper } from "./checkList/checkListHelper";
import { checkboxHelper } from "./checkbox/checkboxHelper";

export const getHelpersMarkdown = () => {
  return {
    array: (values: string): Array<string> => values.split(","),
    md_table: tableHelper,
    md_checklist: checkListHelper,
    md_checkbox: checkboxHelper,
  };
};
