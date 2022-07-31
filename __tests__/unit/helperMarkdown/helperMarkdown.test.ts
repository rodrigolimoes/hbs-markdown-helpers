import { getHelpersMarkdown } from "../../../src";
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

  it("Should be return the template without hbs sintax", async () => {
    const helpers = getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).not.toContain(hbsTemplate);
  });

  it("Should be contain the return of HelperMarkdown", async () => {
    const helpers = getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).toContain(
      "| **NAME** | **LASTNAME** | **AGE** | **BIRTHDATA** | **ISMATRICULATE** | **SUBJECTS** | \n" +
        " | :--- | :--- | :--- | :--- | :--- | :--- | \n" +
        "| Rodrigo | Limões | 23 | 1998-09-21 | Yes | JavaScript, Reactjs, and Css | \n" +
        "| João | Silva | 20 | 2000-09-21 | Yes | TypeScript, Nodejs, and Mongodb | \n" +
        "| Julia | Silva | 24 | 1997-09-21 | No | Reactjs, and TypeScript | \n"
    );
  });

  describe("CheckList", () => {
    it("Should return a checklist if params is undefined", async () => {
      const helpers = getHelpersMarkdown();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        "- [X] Text Label 1\n" + "- [ ] Text Label 1\n" + "- [X] Text Label 1\n"
      );
    });

    it("Should return a checklist with label value equal to a value of the object property specified", async () => {
      const helpers = getHelpersMarkdown();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        "- [X] Text Label 2\n" + "- [ ] Text Label 2\n" + "- [X] Text Label 2\n"
      );
    });

    it("Should return a checklist with checked value equal to a value of the object property specified", async () => {
      const helpers = getHelpersMarkdown();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain(
        "- [ ] Text Label 1\n" + "- [X] Text Label 1\n" + "- [ ] Text Label 1\n"
      );
    });

    it("Should return a checklist with checked and label values equal to values of the object properties specified", async () => {
      const helpers = getHelpersMarkdown();
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
      const helpers = getHelpersMarkdown();
      handlebarsHelpers.setMarkdownHelper(helpers);
      const template = await handlebarsHelpers.compileTemplate();

      expect(template).toBeDefined();
      expect(template).toContain("- [X] Label\n");
      expect(template).toContain("- [ ] Label\n");
    });
  });
});
