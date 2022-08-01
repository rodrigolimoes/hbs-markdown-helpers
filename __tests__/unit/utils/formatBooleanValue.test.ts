import { formatBooleanValue } from "../../../src/libs/utils/formatBooleanValue";

describe("Utils Format Boolean Value", () => {
  it('Should return "Yes" when the value is true and the language is void', () => {
    const value = formatBooleanValue({ value: true, language: "" });

    expect(value).toBeDefined();
    expect(value).toEqual("Yes");
  });

  it('Should return "No" when the value is false and the language is void', () => {
    const value = formatBooleanValue({ value: false, language: "" });

    expect(value).toBeDefined();
    expect(value).toEqual("No");
  });
});
