import mapValues = require("lodash.mapvalues");
import * as sinon from "sinon";
import { FluentInterface, FluentStub } from "./fluentTypes";

const fluentStub = <T extends FluentInterface>(interfaceStructure: T): FluentStub<T> => {
  const result = mapValues(
    interfaceStructure,
    (val) => {
      if (typeof val !== "object") {
        return sinon.stub().returns(val);
      }

      const returnVal = fluentStub(val);
      const sinonStub = sinon.stub().returns(returnVal);

      const decoratorFunctions = {
        with: filterByArguments(sinonStub, val),
      };

      return Object.assign(sinonStub, returnVal, decoratorFunctions);
    }) as FluentStub<T>;

  return result;
};

const filterByArguments =
  <T extends FluentInterface>(stubResult: sinon.SinonStub, interfaceStructure: T) => (...args: any[]) => {
  return stubResult.calledWith(...args) ? stubResult : fluentStub(interfaceStructure);
};

export default fluentStub;
