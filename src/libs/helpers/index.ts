import { TableHelper } from "./table/TableHelper";
import { CheckListHelper } from "./checkList/CheckListHelper";
import { CheckboxHelper } from "./checkbox/CheckboxHelper";
import { ImageHelper } from "./image/ImageHelper";
import { HbsMarkdownHelpersConfig } from "../model/HbsMarkdownHelper/HbsMarkdownHelper";
import { LinkHelper } from "./Link/LinkHelper";

export default class HbsMarkdownHelpers {
  private readonly config: HbsMarkdownHelpersConfig;

  constructor(config: HbsMarkdownHelpersConfig) {
    this.config = config;
  }

  getMarkdownHelper = () => {
    return {
      array: (values: string): Array<string> => values.split(","),
      md_link: new LinkHelper().getLinkHelper,
      md_table: new TableHelper(this.config).getTableHelper,
      md_checklist: new CheckListHelper().getChecklistHelper,
      md_checkbox: new CheckboxHelper().getCheckboxhelper,
      md_image: new ImageHelper().getImageHelper,
    };
  };
}
