import { SinonStub } from "sinon";

export type FluentStub<T> =
  {
    [key in keyof T]: ((...args: any[]) => FluentChain<T[key]>) & FluentStub<T[key]>;
  } &
  {
    with: (...args: any[]) => FluentStub<T>,
  } & SinonStub;

export type FluentChain<T> = {
  [key in keyof T]: (...args: any[]) => FluentChain<T[key]>;
};

export interface FluentInterface {
  [key: string]: any;
};
