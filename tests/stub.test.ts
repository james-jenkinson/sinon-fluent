import { expect } from "chai";
import * as sinon from "sinon";
import stub from "./../src/stub";
import isStub from "./helpers/isStub";

describe("Stub", () => {
  describe("Single stub", () => {
    const returnVal = Symbol("Return val");
    const result = stub({ func: returnVal });

    it("should create a stub under the correct key", () => {
      isStub(result.func);
    });

    it("should set return value", () => {
      expect(result.func()).to.equal(returnVal);
    });
  });

  describe("Multiple stubs", () => {
    const returnVal1 = Symbol("First return value");
    const returnVal2 = Symbol("Second return value");
    const result = stub({ func1: returnVal1, func2: returnVal2 });

    it("should create stubs for all keys", () => {
      isStub(result.func1);
      isStub(result.func2);
    });

    it("should set return value for all keys", () => {
      expect(result.func1()).equals(returnVal1);
      expect(result.func2()).equals(returnVal2);
    });
  });

  describe("Nested stubs", () => {
    const returnVal = Symbol("The return value");
    const result = stub({ func1: { func2: { func3: returnVal } } });

    it("should set all inner keys as stubs", () => {
      isStub(result.func1);
      isStub(result.func1.func2);
      isStub(result.func1.func2.func3);
    });
  });
});
