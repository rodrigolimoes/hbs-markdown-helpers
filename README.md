# HBS-MARKDOWN-HELPERS
hbs-markdown-helpers provides some markdown helpers for use in the handlebars template.

## Installing
~~~~

~~~~

## Usage

Firstly you must create a new instance of HbsMarkdownHelpers.

~~~~typescript
const markdownHelper = new HbsMarkdownHelpers({
      configTable: {
        customFormatDate: "dd/mm/yyyy", // default format: yyyy-mm-dd
        customLabelBoolean: { true: "Sim", false: "Não" }, // default label : {true: "Yes", false: "No"}
      },
});
~~~~