import { expect } from "chai";
import { getCompletedTodos } from "../selectors";

describe("The getCompletedTodos Selector", () => {
  it("Return only completed todos", () => {
    const fakeTodos = [
      {
        text: "say hello",
        isCompleted: true,
      },
      {
        text: "say goodbey",
        isCompleted: false,
      },
      {
        text: "climb Mount Everest",
        isCompleted: false,
      },
    ];

    const expected = [
      {
        text: "say hello",
        isCompleted: true,
      },
    ];

    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});
