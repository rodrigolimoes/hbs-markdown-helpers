import { Data } from "../../model/Data/Data";
import { TableProps } from "../../model/Table/TableProps";
import { Table } from "../../generators";
import { TableConfig } from "../../model/Table/TableConfig";
import { HbsMarkdownHelpersConfig } from "../../model/HbsMarkdownHelper/HbsMarkdownHelper";
import { isObjectArray } from "../../utils/utilsType";

export class TableHelper {
  private readonly config?: HbsMarkdownHelpersConfig;

  constructor(config?: HbsMarkdownHelpersConfig) {
    this.config = config;
  }

  getTableHelper = (data: Array<Data>, options: { hash?: TableProps }) => {
    const tableProps = options?.hash;

    if (!isObjectArray(data))
      throw new Error("Data is not an array of objects");

    let config: TableConfig = {
      customLabelBoolean: { true: "Yes", false: "No" },
      customFormatDate: "yyyy-mm-dd",
    };

    if (this.config && this.config.configTable) {
      const { customLabelBoolean, customFormatDate } = this.config.configTable;

      if (customFormatDate) config.customFormatDate = customFormatDate;

      if (customLabelBoolean) config.customLabelBoolean = customLabelBoolean;
    }

    const resultMatch = config.customFormatDate.match(/\by{4}|d{2}|m{2}\b/g);
    const expectedMatch = ["yyyy", "mm", "dd"];

    if (!resultMatch || !expectedMatch.every((e) => resultMatch.includes(e))) {
      throw new Error(
        'Date format is invalid, you need to use "yyyy" for year, "mm" for month and "dd" for day'
      );
    }
    const table = new Table(data, config, tableProps);
    return table.generate();
  };
}
