interface FormatDate {
  isoDate: string;
  style: string;
}

export const formatDate = ({ isoDate, style }: FormatDate): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  switch (style) {
    case "pt-br":
      return `${day}/${month}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
};
