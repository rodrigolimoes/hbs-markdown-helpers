import { Table } from "../../../src/libs/generators/index";
import data from "../../data/data.json";

describe("Markdown Table", () => {
  it("Should be return a header when the header is not expecify", async () => {
    const table = new Table(data.students).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      "| NAME | LASTNAME | AGE | \n | :--- | :--- | :--- | \n"
    );
  });

  it("Should be return a header when the header and datacells is expecify", async () => {
    const table = new Table(data.students, {
      headers: ["Name", "Age"],
      dataCells: ["name", "age"],
    }).generate();

    expect(table).toBeDefined();
    expect(table).toContain("| Name | Age | \n | :--- | :--- | \n");
  });
});
