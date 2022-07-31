interface FormatDate {
  isoDate: string;
  language: string;
}

export const formatDate = ({ isoDate, language }: FormatDate): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  switch (language) {
    case "pt-br":
      return `${day}/${month}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
};
