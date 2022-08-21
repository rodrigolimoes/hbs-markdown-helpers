# HBS-MARKDOWN-HELPERS
hbs-markdown-helpers provides some markdown helpers for use in the handlebars template.

## Installing
~~~~
npm i hbs-markdown-helpers
~~~~

## Usage Exemple
~~~~typescript
import * as handlebars from "handlebars";
import {HbsMarkdownHelpers} from 'hbs-markdown-helpers';

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

_________________
## Helpers

### {{md_array}}
Return an array
#### Params
- data: `string`
  > Comma separated element
#### Usage Exemple
~~~~handlebars
<!--Comma separated element-->
{{md_array "Name,Age"}}
~~~~
_________________
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

##### Usage Exemple

##### Template: 
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

##### Output: 

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

_________________
### {{md_checklist}}
Return a checkList

#### Params
- data: `Array<object>`
- propLabel?: `string`
  > Name property from object
- propChecked?: `string`
  > Name property from object

#### Usage Exemple
~~~~handlebars
<!-- data: [{
      "checked": true,
      "otherChecked": false,
      "label": "Text Label 1",
      "label2": "Text Label 2"
    },
    {
      "checked": false,
      "otherChecked": true,
      "label": "Text Label 1",
      "label2": "Text Label 2"
    },
    {
      "checked": true,
      "otherChecked": false,
      "label": "Text Label 1",
      "label2": "Text Label 2"
    }] -->

<!-- 
    this - data
    propLabel - Name property from object
    propChecked - Name property from object
 -->
**CheckList with params**
<!-- Return a checklist with value of propChecked and propLabel -->
{{md_checklist this propLabel="label2" propChecked="checked"}}
_________________
<!-- Return a checklist with value of propChecked -->
{{md_checklist this propChecked="otherChecked"}}
_________________
<!-- Return a checklist with value of propLabel -->
{{md_checklist this propLabel="label2"}}

**CheckList without params**
<!-- Return a checklist with first boolean value and first string value -->
{{md_checklist this.todoList}}
~~~~

#### output:

**CheckList with params**
- [X] Text Label 2
- [ ] Text Label 2
- [X] Text Label 2

_________________
- [ ] Text Label 1
- [X] Text Label 1
- [ ] Text Label 1

_________________
- [X] Text Label 2
- [ ] Text Label 2
- [X] Text Label 2


**CheckList without params**
- [X] Text Label 1
- [ ] Text Label 1
- [X] Text Label 1

_________________
### {{md_checkbox}}
Return a checkbox

#### Params
- checked: `boolean`
- label: `string`

#### Usage Exemple
~~~~handlebars
**Checkbox**
{{md_checkbox checked=true label="Label"}}
{{md_checkbox checked=false label="Label"}}
~~~~

#### output:

**Checkbox**
- [X] Label
- [ ] Label
_________________
### {{md_link}}
Return a markdown Link

#### Params
- textLink: `string`
- url: `string`

#### Usage Exemple
~~~~handlebars
**Link**
{{md_link textLink="Rodrigo" url="https://github.com/rodrigolimoes"}}
~~~~

#### output:

**Link**

[Rodrigo](https://github.com/rodrigolimoes)
_________________
### {{md_image}}
Return a markdown Image

#### Params
- path: `string`
- description: `string`

#### Usage Exemple
~~~~handlebars
**Image**

{{md_image path="./__tests__/data/image/image_test.png" description="Table Example of hbs-markdown-helpers library"}}
~~~~

#### output:

**Image**

![Table Example of hbs-markdown-helpers library](./__tests__/data/image/image_test.png)

_________________
### {{md_image_link}}
Return a markdown Image Link

#### Params
- path: `string`
- description: `string`
- url: `string`

#### Usage Exemple
~~~~handlebars
**Image Link**
{{md_image_link path="./__tests__/data/image/image_test.png" description="Table Exemple of hbs-markdown-helpers" url="https://github.com/rodrigolimoes/hbs-markdown-helpers/blob/main/__tests__/data/image/image_test.png"}}
~~~~

#### output:

**Image Link**

[![Table Exemple of hbs-markdown-helpers](./__tests__/data/image/image_test.png)](https://github.com/rodrigolimoes/hbs-markdown-helpers/blob/main/__tests__/data/image/image_test.png)