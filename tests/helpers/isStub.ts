import { expect } from "chai";

const isStub = (stub: sinon.SinonStub) => {
  const param = Symbol("Param");
  const returnVal = Symbol("Return value");
  stub.withArgs(param).returns(returnVal);

  expect(stub(param)).to.equal(returnVal);
};

export default isStub;
