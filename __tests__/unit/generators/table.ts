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

  it("Should return an error message if headers length is different that data cells length", async () => {
    try {
      new Table(data.students, {
        headers: ["Name"],
      }).generate();
    } catch (e) {
      const { message } = e as Error;
      expect(e).toBeDefined();
      expect(message).toBe("Headers can't different length than data cells");
    }
  });

  it("Should return an error message if data cells length is different that headers length", async () => {
    try {
      new Table(data.students, {
        dataCells: ["age"],
      }).generate();
    } catch (e) {
      const { message } = e as Error;
      expect(e).toBeDefined();
      expect(message).toBe("Headers can't different length than data cells");
    }
  });

  it("Should be return the column aligned in the center", async () => {
    const table = new Table(data.students, {
      align: "center",
    }).generate();

    expect(table).toBeDefined();
    expect(table).toContain("\n | :----: | :----: | :----: | \n");
  });

  it("Should be return the column aligned in the right", async () => {
    const table = new Table(data.students, {
      align: "right",
    }).generate();

    expect(table).toBeDefined();
    expect(table).toContain(" \n | ---: | ---: | ---: | \n");
  });
});
