# HBS-MARKDOWN-HELPERS
hbs-markdown-helpers provides some markdown helpers for use in the handlebars template.

## Installing
~~~~

~~~~

## Usage Exemple
~~~~typescript
import * as handlebars from "handlebars";

// Firstly you must create a new instance of HbsMarkdownHelpers
const markdownHelper = new HbsMarkdownHelpers({
      configTable: {
        customFormatDate: "dd/mm/yyyy", // default format: yyyy-mm-dd
        customLabelBoolean: { true: "Sim", false: "Não" }, // default label : {true: "Yes", false: "No"}
      },
});

// Then get the helpers
const helpers = markdownHelper.getMarkdownHelper();

// And register in Handlebars
handlebars.registerHelper(helpers);
~~~~

## HbsMarkdownHelpers
~~~~typescript
  interface Config {
    configTable?: { 
        // You must use "yyyy" for the year, "mm" for the month, and "dd" for the day  
      customFormatDate?: string, // default format: yyyy-mm-dd
      customLabelBoolean?: { true: string, false: string }, // default label : {true: "Yes", false: "No"}
    },
}
~~~~
### Params
- config?: `Config`
## Helpers

### {{md_table}}
Return a table.
#### Params
- data: `Array<Object>`
- headers?: `Array<string>`
  > Array with custom name headers
- dataCells?: `Array<string>`
  >   Array with data property names
- align?: `center | left | right`
  > Table alignment. defaul: left

##### Exemple Usage

###### Template: 
~~~~handlebars
<!-- data: [{
      "name": "Rodrigo",
      "lastName": "Limões",
      "age": 23,
      "birthData": "1998-9-21",
      "isMatriculate": true,
      "subjects": ["JavaScript", "Reactjs", "Css"]
    },
    {
      "name": "João",
      "lastName": "Silva",
      "age": 20,
      "birthData": "2000-9-21",
      "isMatriculate": true,
      "subjects": ["TypeScript", "Nodejs", "Mongodb"]
    },
    {
      "name": "Julia",
      "lastName": "Silva",
      "age": 24,
      "birthData": "1997-9-21",
      "isMatriculate": false,
      "subjects": ["Reactjs", "TypeScript"]
    }] -->

<!--
    this - data
    headers - Array with custom name headers
    dataCells - Array with data property names
    align - Table alignment
 -->

**Without Params:**
<!-- Return a table with the value of all object properties -->
{{md_table this }}

**With Params:**
<!-- Return a center-aligned table with a custom header and name and age property values -->
{{md_table this headers=(md_array "Name,Age") dataCells=(md_array "name,age") align="center"}}

~~~~

###### Output: 

**Without Params:**

| **NAME** | **LASTNAME** | **AGE** | **BIRTHDATA** | **ISMATRICULATE** | **SUBJECTS**                    |
|:---------|:-------------|:--------|:--------------|:------------------|:--------------------------------|
| Rodrigo  | Limões       | 23      | 1998-09-21    | Yes               | JavaScript, Reactjs, and Css    |
| João     | Silva        | 20      | 2000-09-21    | Yes               | TypeScript, Nodejs, and Mongodb |
| Julia    | Silva        | 24      | 1997-09-21    | No                | Reactjs, and TypeScript         |

**With Params:**

| **Name** | **Age** |
|:--------:|:-------:|
| Rodrigo  |   23    |
|   João   |   20    |
|  Julia   |   24    |
