import { expect } from "chai";
import * as sinon from "sinon";

const isStub = (stub: sinon.SinonStub) => {
  const error = "value is not a sinon stub";
  const param = Symbol("Param");
  const returnVal = Symbol("Return value");

  if (typeof stub !== "function" || !stub.withArgs) {
    expect.fail(stub, sinon.stub(), error);
  }

  stub.withArgs(param).returns(returnVal);

  expect(stub(param)).to.equal(returnVal, error);
};

export default isStub;
