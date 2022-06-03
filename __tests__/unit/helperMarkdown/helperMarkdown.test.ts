import { HelperMarkdown } from "../../../src/index";
import * as handlebars from "handlebars";
import { HelperDeclareSpec } from "handlebars";
import * as fs from "fs";
import data from "../../data/data.json";

interface Data {
  [key: string]: any;
}
type Handlebars = typeof handlebars;

class HandlebarsHelpers {
  private readonly data: Data | Data[];
  private readonly template: string;
  private handlebars: Handlebars;

  constructor(data: Data | Data[], template: string) {
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
    hbsTemplate = fs.readFileSync("./__tests__/template/template.hbs", "utf-8");
    handlebarsHelpers = new HandlebarsHelpers(data, hbsTemplate);
  });

  it("Should be return the template without hbs sintax", async () => {
    const helpers = new HelperMarkdown().getHelpersMarkdown();
    handlebarsHelpers.setMarkdownHelper(helpers);
    const template = await handlebarsHelpers.compileTemplate();

    expect(template).toBeDefined();
    expect(template).not.toContain(hbsTemplate);
  });
});
