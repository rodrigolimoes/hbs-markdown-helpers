import { formatBooleanValue } from "../../../src/libs/utils/formatBooleanValue";

describe("Utils Format Boolean Value", () => {
  it('Should return "Yes" when the value is true and the style is void', () => {
    const value = formatBooleanValue({
      value: true,
      customLabelBoolean: { true: "Yes", false: "No" },
    });

    expect(value).toBeDefined();
    expect(value).toEqual("Yes");
  });

  it('Should return "No" when the value is false and the style is void', () => {
    const value = formatBooleanValue({
      value: false,
      customLabelBoolean: { true: "Yes", false: "No" },
    });

    expect(value).toBeDefined();
    expect(value).toEqual("No");
  });

  it('Should return "Sim" when the value is true and style is "pt-br"', () => {
    const value = formatBooleanValue({
      value: true,
      customLabelBoolean: { true: "Sim", false: "Não" },
    });

    expect(value).toBeDefined();
    expect(value).toEqual("Sim");
  });

  it('Should return "Não" when the value is false and style is "pt-br"', () => {
    const value = formatBooleanValue({
      value: false,
      customLabelBoolean: { true: "Sim", false: "Não" },
    });

    expect(value).toBeDefined();
    expect(value).toEqual("Não");
  });
});
