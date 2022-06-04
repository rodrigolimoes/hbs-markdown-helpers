import { Data } from "../../model/Data";
import { OptionsTable } from "../../model/OptionTable";
import { Alignment } from "../../common/tableAlignment.enum";

export default class Table {
  private readonly data: Data[];
  private readonly options?: OptionsTable;

  constructor(data: Data[], options?: OptionsTable) {
    this.data = data;
    this.options = options;
  }

  /**
   * This function insert the syntax for align the column of table
   * @param align
   * @param qtdCollum
   * @return string
   */
  private setMarkdownTableAlign = (align: string, qtdCollum: number) => {
    return `| \n ${align.repeat(qtdCollum)}| \n`;
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
    headers.forEach((e) => {
      tableHeaderSintax += `| ${e} `;
    });

    tableHeaderSintax += this.setMarkdownTableAlign(align, headers.length);

    return tableHeaderSintax;
  }

  /**
   * This function get the values of data(array of object) and insert the Markdown syntax
   * @param dataCells
   * @param data
   * @return tableLineSyntax
   */
  private setDataCells = (dataCells: Array<string>, data: Data) => {
    let tableLineSyntax: string = "";
    for (let j: number = 0; j < dataCells.length; j++) {
      tableLineSyntax += `| ${
        data.hasOwnProperty(dataCells[j]) ? data[dataCells[j]] : "unknown"
      } `;
    }
    tableLineSyntax += " | \n";

    return tableLineSyntax;
  };

  /**
   * Generate a table
   */
  generate() {
    const data = this.data;
    const dataProperties = Object.keys(Object.assign({}, ...data));
    let tableSintax: string = "";
    let align: string;
    let dataCells: Array<string>;
    let headers: Array<string>;

    if (this.options) {
      align = this.options.align
        ? Alignment[this.options.align]
        : Alignment["left"];
      dataCells = this.options.dataCells
        ? this.options.dataCells
        : dataProperties;
      headers = this.options.headers ? this.options.headers : dataProperties;
    } else {
      align = Alignment["left"];
      dataCells = dataProperties;
      headers = dataProperties.map((e) => e.toUpperCase());
    }

    if (dataCells.length !== headers.length)
      throw new Error("Headers can't different length than data cells");

    // Insert a header in table
    tableSintax += this.setMarkdownHeader(headers, align);

    // Insert a data cells in table
    for (let i: number = 0; i < data.length; i++) {
      tableSintax += this.setDataCells(dataCells, data[i]);
    }

    return tableSintax;
  }
}
