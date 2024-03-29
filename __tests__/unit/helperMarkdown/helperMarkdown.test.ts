import { HbsMarkdownHelpers } from "../../../src";
import * as handlebars from "handlebars";
import { HelperDeclareSpec } from "handlebars";
import * as fs from "fs";
import data from "../../data/data.json";
import { Data } from "../../../src/libs/model/Data/Data";

type Handlebars = typeof handlebars;

class HandlebarsHelpers {
  private readonly data: Data | Array<Data>;
  private readonly template: string;
  private handlebars: Handlebars;

  constructor(data: Data | Array<Data>, template: string) {
    this.data = data;
    this.template = template;
    this.handlebars = handlebars;
  }

  setMarkdownHelper = (helpers: HelperDeclareSpec) => {
    this.handlebars.registerHelper(helpers);
  };

  compileTemplate = async () => {
    try {
      const template = await this.handlebars.compile(this.template);
      return template(this.data);
    } catch (error) {
      throw error;
    }
  };
}

describe("HelperMarkdown", () => {
  let hbsTemplate: string;
  let handlebarsHelpers: HandlebarsHelpers;

  beforeAll(() => {
    hbsTemplate = fs.readFileSync(
      "./__tests__/data/template/template.hbs",
      "utf-8"
    );
    handlebarsHelpers = new HandlebarsHelpers(data, hbsTemplate);
  });

  it("Should return a message error if data is not an array of objects", async () => {
    try {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      const handlebarsHelper = new HandlebarsHelpers(
        data.dataOfTableWrong,
        "{{md_table this}}"
      );
      handlebarsHelper.setMarkdownHelper(helpers);
      await handlebarsHelper.compileTemplate();
    } catch (e) {
      const { message } = e as Error;

      expect(message).toBeDefined();
      expect(message).toEqual("Data is not an array of objects");
    }
  });

  it("Should be return the template without hbs sintax", async () => {
    const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).not.toContain(hbsTemplate);
  });

  it("Should be contain the return of HelperMarkdown", async () => {
    const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).toContain(
      "| NAME    | LASTNAME | AGE | BIRTHDATA  | ISMATRICULATE | SUBJECTS                        |\n" +
        "|:--------|:---------|:----|:-----------|:--------------|:--------------------------------|\n" +
        "| Rodrigo | Limões   | 23  | 1998-09-21 | Yes           | JavaScript, Reactjs, and Css    |\n" +
        "| João    | Silva    | 20  | 2000-09-21 | Yes           | TypeScript, Nodejs, and Mongodb |\n" +
        "| Julia   | Silva    | 24  | 1997-09-21 | No            | Reactjs, and TypeScript         |\n"
    );
  });

  it("Should return a table with custom format date and custom format boolean", async () => {
    const helpers = new HbsMarkdownHelpers({
      configTable: {
        customFormatDate: "dd/mm/yyyy",
        customLabelBoolean: { true: "Sim", false: "Não" },
      },
    }).getMarkdownHelper();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).toContain(
      "| NAME    | LASTNAME | AGE | BIRTHDATA  | ISMATRICULATE | SUBJECTS                        |\n" +
        "|:--------|:---------|:----|:-----------|:--------------|:--------------------------------|\n" +
        "| Rodrigo | Limões   | 23  | 21/09/1998 | Sim           | JavaScript, Reactjs, and Css    |\n" +
        "| João    | Silva    | 20  | 21/09/2000 | Sim           | TypeScript, Nodejs, and Mongodb |\n" +
        "| Julia   | Silva    | 24  | 21/09/1997 | Não           | Reactjs, and TypeScript         |\n"
    );
  });

  it("Should return an error message if format date is invalid", async () => {
    try {
      const helpers = new HbsMarkdownHelpers({
        configTable: { customFormatDate: "yyyy-jh-09" },
      }).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      await handlebarsHelpers.compileTemplate();
    } catch (e) {
      const { message } = e as Error;

      expect(message).toEqual(
        'Date format is invalid, you need to use "yyyy" for year, "mm" for month and "dd" for day'
      );
    }
  });

  describe("CheckList", () => {
    it("Should return a message error if data is not an array of objects", async () => {
      try {
        const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
        const handlebarsHelper = new HandlebarsHelpers(
          data.dataOfTableWrong,
          "{{md_checklist this}}"
        );
        handlebarsHelper.setMarkdownHelper(helpers);
        await handlebarsHelper.compileTemplate();
      } catch (e) {
        const { message } = e as Error;

        expect(message).toBeDefined();
        expect(message).toEqual("Data is not an array of objects");
      }
    });

    it("Should return a checklist if params is undefined", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        "- [X] Text Label 1\n" + "- [ ] Text Label 1\n" + "- [X] Text Label 1\n"
      );
    });

    it("Should return a checklist with label value equal to a value of the object property specified", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        "- [X] Text Label 2\n" + "- [ ] Text Label 2\n" + "- [X] Text Label 2\n"
      );
    });

    it("Should return a checklist with checked value equal to a value of the object property specified", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        "- [ ] Text Label 1\n" + "- [X] Text Label 1\n" + "- [ ] Text Label 1\n"
      );
    });

    it("Should return a checklist with checked and label values equal to values of the object properties specified", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        "- [X] Text Label 2\n" + "- [ ] Text Label 2\n" + "- [X] Text Label 2\n"
      );
    });
  });

  describe("Checkbox", () => {
    it("Should return a checkbox with checked and label value equal to value of propLabel and propCheck", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain("- [X] Label\n");
      expect(template).toContain("- [ ] Label\n");
    });

    it("Should return a message error if Label is undefined", async () => {
      try {
        const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
        const handlebarsHelper = new HandlebarsHelpers(
          data.dataOfTableWrong,
          "{{md_checkbox checked=true}}"
        );
        handlebarsHelper.setMarkdownHelper(helpers);
        await handlebarsHelper.compileTemplate();
      } catch (e) {
        const { message } = e as Error;

        expect(message).toBeDefined();
        expect(message).toEqual("Label or Checked cannot be undefined");
      }
    });

    it("Should return a message error if Checked is undefined", async () => {
      try {
        const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
        const handlebarsHelper = new HandlebarsHelpers(
          data.dataOfTableWrong,
          "{{md_checkbox label='Label'}}"
        );
        handlebarsHelper.setMarkdownHelper(helpers);
        await handlebarsHelper.compileTemplate();
      } catch (e) {
        const { message } = e as Error;

        expect(message).toBeDefined();
        expect(message).toEqual("Label or Checked cannot be undefined");
      }
    });

    it("Should return a message error if Checked and Label are undefined", async () => {
      try {
        const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
        const handlebarsHelper = new HandlebarsHelpers(
          data.dataOfTableWrong,
          "{{md_checkbox}}"
        );
        handlebarsHelper.setMarkdownHelper(helpers);
        await handlebarsHelper.compileTemplate();
      } catch (e) {
        const { message } = e as Error;

        expect(message).toBeDefined();
        expect(message).toEqual("Label or Checked cannot be undefined");
      }
    });
  });

  describe("Link", () => {
    it("Should return a markdown link", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(`[Rodrigo](https://github.com/rodrigolimoes)`);
    });
  });

  describe("Image", () => {
    it("Should return an image when the image path and description are specified", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        `![Table Example of hbs-markdown-helpers library](../image/image_test.png)`
      );
    });
  });

  describe("Image Link", () => {
    it("Should return an image link when image path, description, and url are specified", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        `[![Table Exemple of hbs-markdown-helpers](../image/image_test.png)](https://github.com/rodrigolimoes/hbs-markdown-helpers/blob/main/__tests__/data/image/image_test.png)`
      );
    });

    it("Should return an image link with path equal void if not specified in params", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      const handlebarsHelper = new HandlebarsHelpers(
        data.dataOfTableWrong,
        `{{md_image_link description="Table Exemple of hbs-markdown-helpers" url="https://github.com/rodrigolimoes/hbs-markdown-helpers/blob/main/__tests__/data/image/image_test.png"}}`
      );
      handlebarsHelper.setMarkdownHelper(helpers);
      const template = await handlebarsHelper.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        `[![Table Exemple of hbs-markdown-helpers]()](https://github.com/rodrigolimoes/hbs-markdown-helpers/blob/main/__tests__/data/image/image_test.png)`
      );
    });

    it("Should return an image link with description equal unknown if not specified in params", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      const handlebarsHelper = new HandlebarsHelpers(
        data.dataOfTableWrong,
        `{{md_image_link path="../image/image_test.png" url="https://github.com/rodrigolimoes/hbs-markdown-helpers/blob/main/__tests__/data/image/image_test.png"}}`
      );
      handlebarsHelper.setMarkdownHelper(helpers);
      const template = await handlebarsHelper.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        `[![unknown](../image/image_test.png)](https://github.com/rodrigolimoes/hbs-markdown-helpers/blob/main/__tests__/data/image/image_test.png)`
      );
    });

    it("Should return an image link with url equal void if not specified in params", async () => {
      const helpers = new HbsMarkdownHelpers({}).getMarkdownHelper();
      const handlebarsHelper = new HandlebarsHelpers(
        data.dataOfTableWrong,
        `{{md_image_link path="../image/image_test.png" description="Table Exemple of hbs-markdown-helpers"}}`
      );
      handlebarsHelper.setMarkdownHelper(helpers);
      const template = await handlebarsHelper.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        `[![Table Exemple of hbs-markdown-helpers](../image/image_test.png)]()`
      );
    });
  });
});
