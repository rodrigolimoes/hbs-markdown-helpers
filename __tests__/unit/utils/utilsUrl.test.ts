import { isUrl } from "../../../src/libs/utils";

describe("Utils Url", () => {
  it("should return true if is a valid url", () => {
    const isValidUrl = isUrl(
      "https://github.com/rodrigolimoes/hbs-markdown-helpers"
    );

    expect(isValidUrl).toBeDefined();
    expect(isValidUrl).toEqual(true);
  });

  it("Should return false if is an invalid url", () => {
    const isValidUrl = isUrl("exemple.com");

    expect(isValidUrl).toBeDefined();
    expect(isValidUrl).toEqual(false);
  });
});
