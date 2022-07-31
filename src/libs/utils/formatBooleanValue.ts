interface FormatBooleanValue {
  value: boolean;
  language: string;
}

export const formatBooleanValue = ({ value, language }: FormatBooleanValue) => {
  switch (language) {
    case "pt-br":
      return value ? "Sim" : "Não";
    default:
      return value ? "Yes" : "No";
  }
};
