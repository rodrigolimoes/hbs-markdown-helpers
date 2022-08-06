import { isDate } from "../../../src/libs/utils/utilsType";

describe("Utils Type", () => {
  describe("Utils Date", () => {
    it("Should return a NaN when the value is not an isoDate", async () => {
      const isDateType = isDate("abcd");

      expect(isDateType).toBeDefined();
      expect(isDateType).toEqual(false);
    });
  });
});
