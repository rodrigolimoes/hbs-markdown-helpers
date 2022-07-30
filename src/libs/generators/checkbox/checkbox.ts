import { CheckboxProp } from "../../model/Checkbox/CheckboxProp";

export default class Checkbox {
  private readonly prop: CheckboxProp;

  constructor(prop: CheckboxProp) {
    this.prop = prop;
  }

  setCheked = (isChecked: boolean) => {
    return `- [${isChecked ? "X" : " "}] `;
  };

  setLabel = (label: string) => {
    return `${label}\n`;
  };

  generate = () => {
    const { checked, label } = this.prop;
    return `${this.setCheked(checked)}${this.setLabel(label)}`;
  };
}
