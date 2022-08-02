interface FormatDate {
  isoDate: string;
  customFormatDate: string;
}

interface MapDate {
  yyyy: string;
  mm: string;
  dd: string;
}

export const formatDate = ({
  isoDate,
  customFormatDate,
}: FormatDate): string => {
  const date = new Date(isoDate);
  const mapDate: MapDate = {
    yyyy: date.getFullYear().toString(),
    mm: (date.getMonth() + 1).toString().padStart(2, "0"),
    dd: date.getDate().toString().padStart(2, "0"),
  };

  return customFormatDate.replace(
    /yyyy|mm|dd/g,
    (match) => mapDate[match as keyof MapDate]
  );
};
