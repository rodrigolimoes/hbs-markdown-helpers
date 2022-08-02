import { TableHelper } from "./table/TableHelper";
import { CheckListHelper } from "./checkList/CheckListHelper";
import { CheckboxHelper } from "./checkbox/CheckboxHelper";
import { HbsMarkdownHelpersConfig } from "../model/HbsMarkdownHelper/HbsMarkdownHelper";

export default class HbsMarkdownHelpers {
  private readonly config: HbsMarkdownHelpersConfig;

  constructor(config: HbsMarkdownHelpersConfig) {
    this.config = config;
  }

  getMarkdownHelper = () => {
    return {
      array: (values: string): Array<string> => values.split(","),
      md_table: new TableHelper(this.config).getTableHelper,
      md_checklist: new CheckListHelper().getChecklistHelper,
      md_checkbox: new CheckboxHelper().getCheckboxhelper,
    };
  };
}
