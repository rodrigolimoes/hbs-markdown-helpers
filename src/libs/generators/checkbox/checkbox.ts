export default class Checkbox {
  private readonly checked: boolean;
  private readonly label: string;

  constructor(checked: boolean, label: string) {
    this.checked = checked;
    this.label = label;
  }

  setCheked = () => {
    return `- [${this.checked ? "X" : " "}] `;
  };

  setLabel = () => {
    return `${this.label} \n`;
  };

  generate = () => {
    return `${this.setCheked()}${this.setLabel()}`;
  };
}
