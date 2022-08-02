import { Data } from "../../model/Data/Data";
import { TableProps } from "../../model/Table/TableProps";
import { Table } from "../../generators";
import { TableConfig } from "../../model/Table/TableConfig";
import { HbsMarkdownHelpersConfig } from "../../model/HbsMarkdownHelper/HbsMarkdownHelper";

export class TableHelper {
  private readonly config: HbsMarkdownHelpersConfig;

  constructor(config: HbsMarkdownHelpersConfig) {
    this.config = config;
  }

  getTableHelper = (data: Array<Data>, options: { hash?: TableProps }) => {
    const tableProps = options?.hash;
    const config: TableConfig = {
      customLabelBoolean: this.config.customLabelBoolean
        ? this.config.customLabelBoolean
        : { true: "Yes", false: "No" },
      customFormatDate: this.config.customFormatDate
        ? this.config.customFormatDate
        : "yyyy-mm-dd",
    };

    const table = new Table(data, config, tableProps);
    return table.generate();
  };
}
