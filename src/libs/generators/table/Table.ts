import { Data } from "../../model/Data/Data";
import { Link } from "../index";
import { TableProps } from "../../model/Table/TableProps";
import { Alignment } from "../../common/tableAlignment.enum";
import { TableConfig } from "../../model/Table/TableConfig";
import {
  isDate,
  isBoolean,
  isNumber,
  isArray,
  formatDate,
  formatBooleanValue,
  formatArray,
  formatTable,
  isUrl,
} from "../../utils";

export default class Table {
  private readonly data: Array<Data>;
  private readonly config: TableConfig;
  private readonly props?: TableProps;

  constructor(data: Array<Data>, config: TableConfig, props?: TableProps) {
    this.data = data;
    this.props = props;
    this.config = config;
  }

  /**
   * This function insert the syntax for align the column of table
   * @param align
   * @param qtdCollum
   * @return string
   */
  private setMarkdownTableAlign = (align: string, qtdCollum: number) => {
    return `|\n${align.repeat(qtdCollum)}|\n`;
  };

  /**
   * This function insert a table header
   * @param headers
   * @param align
   * @private
   * @return tableHeaderSintax
   */
  private setMarkdownHeader(headers: Array<string>, align: string) {
    let tableHeaderSintax: string = "";

    for (let i: number = 0; i < headers.length; i++) {
      const element = headers[i];
      tableHeaderSintax += `| ${element} `;
    }

    tableHeaderSintax += this.setMarkdownTableAlign(align, headers.length);

    return tableHeaderSintax;
  }

  /**
   * This function get the values of data(array of object) and insert the Markdown syntax
   * @param dataCells
   * @param data
   * @return tableLineSyntax
   */
  private setDataCell = (dataCells: Array<string>, data: Data) => {
    let tableLineSyntax: string = "";
    for (let j: number = 0; j < dataCells.length; j++) {
      let element = data.hasOwnProperty(dataCells[j])
        ? data[dataCells[j]]
        : "unknown";

      if (isBoolean(element)) {
        element = formatBooleanValue({
          value: element,
          customLabelBoolean: this.config.customLabelBoolean,
        });
      }

      if (isDate(element) && !isNumber(element)) {
        element = formatDate({
          isoDate: element,
          customFormatDate: this.config.customFormatDate,
        });
      }

      if (isArray(element)) {
        element = formatArray({ elementArray: element });
      }

      if (isUrl(element)) {
        element = new Link({ url: element, textLink: "link" }).generate();
      }

      tableLineSyntax += `| ${element} `;
    }
    tableLineSyntax += "|\n";

    return tableLineSyntax;
  };

  /**
   * Generate a table
   */
  generate() {
    const { data, props } = this;
    const dataProperties = Object.keys(Object.assign({}, ...data));
    const align: string =
      props && props.align ? Alignment[props.align] : Alignment["left"];
    const headers: Array<string> =
      props && props.headers
        ? props.headers
        : dataProperties.map((e) => e.toUpperCase());
    const dataCells: Array<string> =
      props && props.dataCells ? props.dataCells : dataProperties;
    let tableSintax: string = "";

    if (dataCells.length !== headers.length)
      throw new Error(
        "The headers params cannot length different than datacells length"
      );

    tableSintax += this.setMarkdownHeader(headers, align);

    //Insert the data cells in table
    for (let i: number = 0; i < data.length; i++) {
      tableSintax += this.setDataCell(dataCells, data[i]);
    }

    return formatTable(tableSintax);
  }
}
