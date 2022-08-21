import { Data } from "../../model/Data/Data";
import { TableProps } from "../../model/Table/TableProps";
import { Table } from "../../generators";
import { TableConfig } from "../../model/Table/TableConfig";
import { HbsMarkdownHelpersConfig } from "../../model/HbsMarkdownHelper/HbsMarkdownHelper";
import { isObjectArray } from "../../utils";

export class TableHelper {
  private readonly config?: HbsMarkdownHelpersConfig;

  constructor(config?: HbsMarkdownHelpersConfig) {
    this.config = config;
  }

  /**
   * This function checks if "configTable" was specified, if specified returns a custom configuration, otherwise returns a default configuration.
   * return TableConfig
   */
  getConfig = (): TableConfig => {
    let config: TableConfig = {
      customLabelBoolean: { true: "Yes", false: "No" },
      customFormatDate: "yyyy-mm-dd",
    };

    if (this.config && this.config.configTable) {
      const { customLabelBoolean, customFormatDate } = this.config.configTable;

      if (customFormatDate) config.customFormatDate = customFormatDate;

      if (customLabelBoolean) config.customLabelBoolean = customLabelBoolean;
    }

    return config;
  };

  /**
   * Checks whether the Date format is valid or not.
   * @param customFormat
   * @return boolean
   */
  isValidatedFormat = (customFormat: string): boolean => {
    const resultMatch = customFormat.match(/\by{4}|d{2}|m{2}\b/g);
    const expectedMatch = ["yyyy", "mm", "dd"];

    return !(
      !resultMatch || !expectedMatch.every((e) => resultMatch.includes(e))
    );
  };

  /**
   * This function gets the template parameters and returns a Markdown table.
   * @param data
   * @param options
   * @return string
   */
  getTableHelper = (
    data: Array<Data>,
    options: { hash?: TableProps }
  ): string => {
    const tableProps = options?.hash;

    if (!isObjectArray(data))
      throw new Error("Data is not an array of objects");

    const { customLabelBoolean, customFormatDate } = this.getConfig();

    if (!this.isValidatedFormat(customFormatDate))
      throw new Error(
        'Date format is invalid, you need to use "yyyy" for year, "mm" for month and "dd" for day'
      );

    return new Table(
      data,
      { customLabelBoolean, customFormatDate },
      tableProps
    ).generate();
  };
}
