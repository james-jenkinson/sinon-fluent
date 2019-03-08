import { expect } from "chai";
import { returnKey } from "./../constants";
import returnVal from "./../return";

describe("returnVal", () => {
  const returnObject = {
    foo: "foo",
    bar: { baz: "baz" },
  };

  const result = returnVal(returnObject);

  it("should contain return key", () => {
    expect(result.returnKey).to.equal(returnKey);
  })

  it("should contain original object", () => {
    expect(result).to.deep.equal(returnObject);
  });
})
