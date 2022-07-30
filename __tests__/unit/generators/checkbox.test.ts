import CheckBox from "../../../src/libs/generators/checkbox/checkbox";

describe("Checkbox", () => {
  it("Should return a checked checkbox", async () => {
    const checkbox = new CheckBox({
      checked: true,
      label: "Label 1",
    }).generate();

    expect(checkbox).toBeDefined();
    expect(checkbox).toEqual("- [X] Label 1\n");
  });

  it("Should return a unchecked checkbox", () => {
    const checkbox = new CheckBox({
      checked: false,
      label: "Label 1",
    }).generate();

    expect(checkbox).toBeDefined();
    expect(checkbox).toEqual("- [ ] Label 1\n");
  });
});
