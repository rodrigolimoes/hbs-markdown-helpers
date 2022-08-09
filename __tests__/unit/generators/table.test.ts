import { Table } from "../../../src/libs/generators/index";
import data from "../../data/data.json";

describe("Markdown Table", () => {
  it("Should be return a header when the header is not expecify", async () => {
    const table = new Table(data.students, {
      customFormatDate: "yyyy-mm--dd",
      customLabelBoolean: { true: "Yes", false: "No" },
    }).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      "| **NAME** | **LASTNAME** | **AGE** | **BIRTHDATA** | **ISMATRICULATE** | **SUBJECTS** | \n | :--- | :--- | :--- | :--- | :--- | :--- | \n"
    );
  });

  it("Should be return a header when the header and datacells is expecify", async () => {
    const table = new Table(
      data.students,
      {
        customFormatDate: "yyyy-mm--dd",
        customLabelBoolean: { true: "Yes", false: "No" },
      },
      {
        headers: ["Name", "Age", "Birth Data", "Matriculate", "Subjects"],
        dataCells: ["name", "age", "birthData", "isMatriculate", "subjects"],
      }
    ).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      "| **Name** | **Age** | **Birth Data** | **Matriculate** | **Subjects** | \n | :--- | :--- | :--- | :--- | :--- | \n"
    );
  });

  it("Should return an error message if headers length is different that data cells length", async () => {
    try {
      new Table(
        data.students,
        {
          customFormatDate: "yyyy-mm--dd",
          customLabelBoolean: { true: "Yes", false: "No" },
        },
        {
          headers: ["Name"],
        }
      ).generate();
    } catch (e) {
      const { message } = e as Error;
      expect(e).toBeDefined();
      expect(message).toBe(
        "The headers params cannot length different than datacells length"
      );
    }
  });

  it("Should return an error message if data cells length is different that headers length", async () => {
    try {
      new Table(
        data.students,
        {
          customFormatDate: "yyyy-mm--dd",
          customLabelBoolean: { true: "Yes", false: "No" },
        },
        {
          dataCells: ["age"],
        }
      ).generate();
    } catch (e) {
      const { message } = e as Error;
      expect(e).toBeDefined();
      expect(message).toBe(
        "The headers params cannot length different than datacells length"
      );
    }
  });

  it("Should be return the column aligned in the center", async () => {
    const table = new Table(
      data.students,
      {
        customFormatDate: "yyyy-mm--dd",
        customLabelBoolean: { true: "Yes", false: "No" },
      },
      {
        align: "center",
      }
    ).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      "\n | :----: | :----: | :----: | :----: | :----: | :----: | \n"
    );
  });

  it("Should be return the column aligned in the right", async () => {
    const table = new Table(
      data.students,
      {
        customFormatDate: "yyyy-mm--dd",
        customLabelBoolean: { true: "Yes", false: "No" },
      },
      {
        align: "right",
      }
    ).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      " \n | ---: | ---: | ---: | ---: | ---: | ---: | \n"
    );
  });

  it("Should be return the column aligned in the left", async () => {
    const table = new Table(
      data.students,
      {
        customFormatDate: "yyyy-mm--dd",
        customLabelBoolean: { true: "Yes", false: "No" },
      },
      {
        align: "left",
      }
    ).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      "\n | :--- | :--- | :--- | :--- | :--- | :--- | \n"
    );
  });

  it("Should return a table with headers and custom data cells when passing custom props", () => {
    const table = new Table(data.students, {
      customFormatDate: "dd/mm/yyyy",
      customLabelBoolean: { true: "Sim", false: "Não" },
    }).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      "| **NAME** | **LASTNAME** | **AGE** | **BIRTHDATA** | **ISMATRICULATE** | **SUBJECTS** | \n" +
        " | :--- | :--- | :--- | :--- | :--- | :--- | \n" +
        "| Rodrigo | Limões | 23 | 21/09/1998 | Sim | JavaScript, Reactjs, and Css | \n" +
        "| João | Silva | 20 | 21/09/2000 | Sim | TypeScript, Nodejs, and Mongodb | \n" +
        "| Julia | Silva | 24 | 21/09/1997 | Não | Reactjs, and TypeScript | \n"
    );
  });

  it("Should return a table with custom headers and property data values", () => {
    const table = new Table(
      data.students,
      {
        customFormatDate: "dd/mm/yyyy",
        customLabelBoolean: { true: "Sim", false: "Não" },
      },
      {
        headers: ["Name", "Birth Data", "Matriculate"],
        dataCells: ["name", "birthData", "isMatriculate"],
      }
    ).generate();

    expect(table).toBeDefined();
    expect(table).toContain(
      "| **Name** | **Birth Data** | **Matriculate** | \n" +
        " | :--- | :--- | :--- | \n" +
        "| Rodrigo | 21/09/1998 | Sim | \n" +
        "| João | 21/09/2000 | Sim | \n" +
        "| Julia | 21/09/1997 | Não | \n"
    );
  });
});
