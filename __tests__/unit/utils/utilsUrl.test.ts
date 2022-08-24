import { isUrl } from "../../../src/libs/utils";

describe("Utils Url", () => {
  it("should return true if is a valid url", () => {
    const isValidUrl = isUrl(
      "https://github.com/rodrigolimoes/hbs-markdown-helpers"
    );

    expect(isValidUrl).toBeDefined();
    expect(isValidUrl).toEqual(true);
  });
});
