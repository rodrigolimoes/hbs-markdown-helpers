import CheckList from "../../../src/libs/generators/checklist/checkList";
import { todoList } from "../../data/data.json";

describe("CheckList", () => {
  it("Should return a checkList", () => {
    const checkList = new CheckList(todoList).generate();

    expect(checkList).toBeDefined();
    expect(checkList).toEqual(
      `- [X] Text Label 1\n- [ ] Text Label 1\n- [X] Text Label 1\n`
    );
  });

  it("Should return a checklist when label property is specified ", () => {
    const checklist = new CheckList(todoList, { label: "label2" }).generate();

    expect(checklist).toBeDefined();
    expect(checklist).toEqual(
      `- [X] Text Label 2\n- [ ] Text Label 2\n- [X] Text Label 2\n`
    );
  });

  it("Should return a checklist when checked property is specified", () => {
    const checklist = new CheckList(todoList, {
      checked: "checked",
    }).generate();

    expect(checklist).toBeDefined();
    expect(checklist).toEqual(
      `- [X] Text Label 1\n- [ ] Text Label 1\n- [X] Text Label 1\n`
    );
  });

  it("Should return a checklist when checked and label property is specified", () => {
    const checklist = new CheckList(todoList, {
      checked: "checked",
      label: "label2",
    }).generate();

    expect(checklist).toBeDefined();
    expect(checklist).toEqual(
      `- [X] Text Label 2\n- [ ] Text Label 2\n- [X] Text Label 2\n`
    );
  });

  it("Should return a checklist with undefined label when its property doesn't exist in object", () => {
    const checklist = new CheckList(todoList, {
      label: "123",
    }).generate();

    expect(checklist).toBeDefined();
    expect(checklist).toEqual(
      `- [X] undefined\n- [ ] undefined\n- [X] undefined\n`
    );
  });

  it("Should return a checklist with undefined checked when its property doesn't exist in object", () => {
    const checklist = new CheckList(todoList, { checked: "123" }).generate();

    expect(checklist).toBeDefined();
    expect(checklist).toEqual(
      `- [ ] Text Label 1\n- [ ] Text Label 1\n- [ ] Text Label 1\n`
    );
  });
});
