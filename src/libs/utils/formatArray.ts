interface FormatArray {
  elementArray: Array<unknown>;
  style: string;
}

export const formatArray = ({ elementArray, style }: FormatArray) => {
  let array = [...elementArray];
  let lastValue = array.pop();
  let connectionString;

  switch (style) {
    case "pt-br":
      connectionString = " e ";
      break;
    default:
      connectionString = ", and ";
      break;
  }
  return `${array.join(", ")}${connectionString}${lastValue}`;
};
