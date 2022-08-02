interface FormatArray {
  elementArray: Array<unknown>;
}

export const formatArray = ({ elementArray }: FormatArray) => {
  let array = [...elementArray];
  let lastValue = array.pop();

  return `${array.join(", ")}, and ${lastValue}`;
};
