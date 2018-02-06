import { mapValues } from "lodash";
import * as sinon from "sinon";

const stub = <T extends FluentInterface>(interfaceStructure: T): FluentStub<T> => {
  const result = mapValues(
    interfaceStructure,
    (val) => sinon.stub().returns(val)) as FluentStub<T>;

  return result;
};

export default stub;
