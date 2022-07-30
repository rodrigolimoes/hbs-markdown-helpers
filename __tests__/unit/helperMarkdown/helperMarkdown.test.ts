import { HelperMarkdown } from "../../../src/index";
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
    const helpers = new HelperMarkdown().getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).not.toContain(hbsTemplate);
  });

  it("Should be contain the return of HelperMarkdown", async () => {
    const helpers = new HelperMarkdown().getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).toContain(
      "| name | lastName | age | \n" +
        " | :--- | :--- | :--- | \n" +
        "| Rodrigo | Limões | 23  | \n" +
        "| João | Silva | 20  | \n" +
        "| Julia | Silva | 24  | \n"
    );
  });

  it("Should return a checklist if params is undefined", async () => {
    const helpers = new HelperMarkdown().getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).toContain(
      "- [X] Text Label 1 \n" +
        "- [ ] Text Label 1 \n" +
        "- [X] Text Label 1 \n"
    );
  });

  it("Should return a checklist with label value equal to a value of the object property specified", async () => {
    const helpers = new HelperMarkdown().getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).toContain(
      "- [X] Text Label 2 \n" +
        "- [ ] Text Label 2 \n" +
        "- [X] Text Label 2 \n"
    );
  });

  it("Should return a checklist with checked value equal to a value of the object property specified", async () => {
    const helpers = new HelperMarkdown().getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).toContain(
      "- [X] Text Label 1 \n" +
        "- [ ] Text Label 1 \n" +
        "- [X] Text Label 1 \n"
    );
  });
});
