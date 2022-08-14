const getLongerLengthColumns = (
  matrix: Array<Array<string>>
): Array<number> => {
  let lengthColumns: Array<number> = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!lengthColumns[j]) lengthColumns[j] = matrix[i][j].length;
      if (matrix[i][j].length > lengthColumns[j])
        lengthColumns[j] = matrix[i][j].length;
    }
  }

  return lengthColumns;
};

const getMatrixTable = (table: string): Array<Array<string>> =>
  table.split("\n").map((e) => e.split("|").filter((e) => e !== ""));

const getAlignmentTable = (aling: string, lengthColumn: number): string =>
  aling.replace(/-/g, (match) => match.repeat(lengthColumn));

export const formatTable = (markdownTable: string): string => {
  const matrixTable = getMatrixTable(markdownTable);
  const lengthColumns = getLongerLengthColumns(matrixTable);
  let table = "";

  for (let i = 0; i < matrixTable.length; i++) {
    let row = "";
    for (let j = 0; j < matrixTable[i].length; j++) {
      const lengthDiff = Math.abs(lengthColumns[j] - matrixTable[i][j].length);
      if (i === 1) {
        row += `|${getAlignmentTable(matrixTable[i][j], lengthDiff + 1)}`;
      } else {
        if (matrixTable[i][j].length !== lengthColumns[j]) {
          row += `| ${matrixTable[i][j].trim()}${" ".repeat(lengthDiff)} `;
        } else {
          row += `| ${matrixTable[i][j].trim()} `;
        }
      }
    }

    table += row + "|\n";
  }

  return table;
};
