interface FormatArray {
  elementArray: Array<unknown>;
  language: string;
}

export const formatArray = ({ elementArray, language }: FormatArray) => {
  let array = [...elementArray];
  let lastValue = array.pop();
  let connectionString;

  switch (language) {
    case "pt-br":
      connectionString = " e ";
      break;
    default:
      connectionString = ", and ";
      break;
  }
  return `${array.join(", ")}${connectionString}${lastValue}`;
};
