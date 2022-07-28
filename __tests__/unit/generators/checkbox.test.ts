import CheckBox from "../../../src/libs/generators/checkbox/checkbox";

describe("Checkbox", () => {
  it("Should return a checkbox", async () => {
    const checkbox = new CheckBox(true, "Label 1").generate();

    expect(checkbox).toBeDefined();
    expect(checkbox).toEqual("- [X] Label 1 \n");
  });
});
