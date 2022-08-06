import { isDate } from "../../../src/libs/utils/utilsType";

describe("Utils Type", () => {
  describe("Utils Date", () => {
    it("Should return false when the value is not an isoDate", async () => {
      const isDateType = isDate("abcd");

      expect(isDateType).toBeDefined();
      expect(isDateType).toEqual(false);
    });

    it("Should return true when the value is an isoDate", () => {
      const isDateType = isDate("2000-09-01");

      expect(isDateType).toBeDefined();
      expect(isDateType).toEqual(true);
    });

    it("Should return true when the value is a Date", () => {
      const isDateType = isDate(new Date());

      expect(isDateType).toBeDefined();
      expect(isDateType).toEqual(true);
    });
  });
});
