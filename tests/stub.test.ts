import { expect, use } from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import stub from "./../src/stub";
import isStub from "./helpers/isStub";
use(sinonChai);

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
    const returnValA = Symbol("The return value");
    const returnValB = Symbol("The return value");
    const stubInterface = {
      func1: {
        func2a: {
          func3: returnValA,
        },
        func2b: {
          func3: returnValB,
        },
      },
    };
    const result = stub(stubInterface);

    it("should set all inner keys as stubs", () => {
      isStub(result.func1);
      isStub(result.func1.func2a);
      isStub(result.func1.func2b.func3);
    });

    it("should return the correct value from function chain", () => {
      expect(result.func1().func2a().func3()).to.equal(returnValA);
      expect(result.func1().func2b().func3()).to.equal(returnValB);
    });
  });

  describe("Nested stubs with re-used object keys", () => {
    const inner1 = {
      func1: null,
    };
    const inner2 = { func2a: inner1, func2b: inner1 };
    const inner3 = { func3a: inner2, func3b: inner2 };
    let result: FluentStub<typeof inner3>;

    beforeEach(() => {
      result = stub(inner3);
    });

    it("should check the correct stub with re-used object", () => {
      result.func3a().func2b().func1();

      expect(result.func3a).to.have.been.calledOnce;
      expect(result.func3a.func2b).to.have.been.calledOnce;
      expect(result.func3a.func2b.func1).to.have.been.calledOnce;
      expect(result.func3a.func2a.func1).to.not.have.been.called;
    });
  });
});
