interface FormatBooleanValue {
  value: boolean;
  style: string;
}

export const formatBooleanValue = ({ value, style }: FormatBooleanValue) => {
  switch (style) {
    case "pt-br":
      return value ? "Sim" : "Não";
    default:
      return value ? "Yes" : "No";
  }
};
