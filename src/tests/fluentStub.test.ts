import { expect } from "chai";
import stub from "./../fluentStub";
import { FluentStub } from "./../fluentTypes";
import returnVal from "./../return";
import isStub from "./helpers/isStub";

describe("fluentStub", () => {
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
    const promiseReturn = Symbol("Return value of promise");
    const result = stub({ func1: returnVal1, func2: returnVal2, promise: Promise.resolve(promiseReturn) });

    it("should create stubs for all keys", () => {
      isStub(result.func1);
      isStub(result.func2);
      isStub(result.promise);
    });

    it("should set return value for all keys", () => {
      expect(result.func1()).equals(returnVal1);
      expect(result.func2()).equals(returnVal2);
    });

    it("should support promises", (done) => {
      const ret = result.promise();
      result.promise().then(v => { 
        expect(v).to.equal(promiseReturn);
        done();
      });
    });
  });

  describe("Using returnVal to return an object", () => {
    const value = { fooVal: { barVal: "bar" } };
    const result = stub({ foo: { bar: returnVal(value) }})

    it("Should return the object value", () => {
      const returnValue = result.foo().bar();
      expect(returnValue).to.deep.equal(value);
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
    let fluentStub: FluentStub<typeof inner3>;

    beforeEach(() => {
      fluentStub = stub(inner3);
      fluentStub.func3a().func2b().func1();
    });

    it("should check the correct stub with re-used object", () => {
      expect(fluentStub.func3a).to.have.been.calledOnce;
      expect(fluentStub.func3a.func2b).to.have.been.calledOnce;
      expect(fluentStub.func3a.func2b.func1).to.have.been.calledOnce;
    });

    it("should confirm incorrect stub wasn't used", () => {
      expect(fluentStub.func3a.func2a.func1).to.not.have.been.called;
    });
  });

  describe("Calling stubs with arguments", () => {
    const structure = {
      foo: { bar: { lemon: null } },
    };
    let fluentStub: FluentStub<typeof structure>;

    beforeEach(() => {
      fluentStub = stub(structure);
      fluentStub.foo(1, 2).bar(3, 4).lemon(5, 6);
    });

    it("should check calls with no argument filter", () => {
      expect(fluentStub.foo.bar.lemon).to.have.been.called;
    });

    it("should check calls between stubs with different params", () => {
      expect(fluentStub.foo.with(1, 2).bar.with(3, 4).lemon.with(5, 6)).to.have.been.called;
    });

    it("should confirm no calls with different params", () => {
      expect(fluentStub.foo.with(1, 2).bar.with(3, 3).lemon.with(5, 6)).to.not.have.been.called;
    });

    it("should confirm no calls with filtering higher up the chain", () => {
      expect(fluentStub.foo.with(1, 3).bar.with(3, 4).lemon).to.not.have.been.called;
    });
  });

  describe("Using an existing object", () => {
    it("Creates a stub on an existing object", () => {
      const existing = {
        foo: () => ({
          bar: () => 8,
        }),
      };

      stub({ bar: 7 }, existing, "foo");

      expect(existing.foo().bar()).to.equal(7);
    });

    it("Creates a fluent chain on existing object", () => {
      const existing = { foo: () => undefined };

      stub({ func1: { func2: { func3: 99 }}}, existing, "foo");

      const result = (existing.foo() as any).func1().func2().func3();
      expect(result).to.equal(99);
    });

    it("Verifies calls on fluent chain", () => {
      const existing = { foo: () => undefined };

      const result = stub({ func1: { func2: { func3: null }}}, existing, "foo");

      (existing.foo() as any).func1().func2().func3();
      expect(result.func1).to.have.been.called;
      expect(result.func1.func2).to.have.been.called;
      expect(result.func1.func2.func3).to.have.been.called;
    });
  });
});
