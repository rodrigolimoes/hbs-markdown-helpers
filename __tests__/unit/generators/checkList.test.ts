import CheckList from "../../../src/libs/generators/checkbox/checkList";
import { todoList } from "../../data/data.json";

describe("CheckList", () => {
  it("Should return a checkList", () => {
    const checkList = new CheckList(todoList).generate();

    expect(checkList).toBeDefined();
    expect(checkList).toEqual(
      `- [X] Text Label 1 \n- [ ] Text Label 1 \n- [X] Text Label 1 \n`
    );
  });
});
