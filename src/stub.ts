import { mapValues } from "lodash";
import * as sinon from "sinon";

const stub = <T extends FluentInterface>(interfaceStructure: T): FluentStub<T> => {
  const result = mapValues(
    interfaceStructure,
    (val) => {
      if (typeof val !== "object") {
        return sinon.stub().returns(val);
      }

      const returnVal = stub(val);
      const sinonStub = sinon.stub().returns(returnVal);

      return Object.assign(sinonStub, returnVal);
    }) as FluentStub<T>;

  return result;
};

export default stub;
