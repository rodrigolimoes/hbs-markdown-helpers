import { Data } from "../../model/Data/Data";
import { TableProps } from "../../model/Table/TableProps";
import { Table } from "../../generators";

export const tableHelper = (
  data: Array<Data>,
  options: { hash?: TableProps }
) => {
  const optionsTable = options?.hash;

  const table = new Table(data, optionsTable);
  return table.generate();
};
