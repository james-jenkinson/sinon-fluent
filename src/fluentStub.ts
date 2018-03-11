import mapValues = require("lodash.mapvalues");
import isObject = require("lodash.isobject");
import * as sinon from "sinon";
import { FluentInterface, FluentStub } from "./fluentTypes";

function fluentStub<T extends FluentInterface>(interfaceStructure: T): FluentStub<T>;
function fluentStub<T extends FluentInterface, T2>(interfaceStructure: T, object: T2, method: keyof T2): FluentStub<T>;

function fluentStub<T extends FluentInterface, T2>(interfaceStructure: T, object?: T2, method?: keyof T2):
    FluentStub<T> {
  const result = mapValues(
    interfaceStructure,
    (val) => {
      if (!isObject(val)) {
        return sinon.stub().returns(val);
      }

      if (isPromise(val)) {
        return sinon.stub().resolves(val);
      }

      const returnVal = fluentStub(val);
      const sinonStub = sinon.stub().returns(returnVal);

      const decoratorFunctions = {
        with: filterByArguments(sinonStub, val),
      };

      return Object.assign(sinonStub, returnVal, decoratorFunctions);
    }) as FluentStub<T>;

  if (object && method) {
    const stub = sinon.stub(object, method).returns(result);
    return Object.assign(stub, result) as FluentStub<T>;
  }

  return result;
};

const filterByArguments =
  <T extends FluentInterface>(stubResult: sinon.SinonStub, interfaceStructure: T) => (...args: any[]) => {
  return stubResult.calledWith(...args) ? stubResult : Object.assign(sinon.stub(), fluentStub(interfaceStructure));
};

const isPromise = (val: any) => !!val && val.then && typeof val.then === 'function';

export default fluentStub;
