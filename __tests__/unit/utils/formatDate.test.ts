import { formatDate } from "../../../src/libs/utils/formatDate";

describe("Utils Format Date", () => {
  it('Should return a date with "yyyy-mm-dd" format when for specified in config', () => {
    const date = formatDate({
      isoDate: "Sun Sep 21 1998 21:00:00 GMT-0300",
      customFormatDate: "yyyy-mm-dd",
    });

    expect(date).toBeDefined();
    expect(date).toEqual("1998-09-21");
  });

  it('Should return a date with "dd/mm/yyyy" format when for specified in config', () => {
    const date = formatDate({
      isoDate: "Sun Sep 21 1998 21:00:00 GMT-0300",
      customFormatDate: "dd/mm/yyyy",
    });

    expect(date).toBeDefined();
    expect(date).toEqual("21/09/1998");
  });
});
