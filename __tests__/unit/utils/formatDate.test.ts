import { formatDate } from "../../../src/libs/utils/formatDate";

describe("Utils Format Date", () => {
  it('Should return a date with "yyyy-mm-dd" format when style is void', () => {
    const date = formatDate({
      isoDate: "Sun Sep 21 1998 21:00:00 GMT-0300",
      style: "",
    });

    expect(date).toBeDefined();
    expect(date).toEqual("1998-09-21");
  });
});
