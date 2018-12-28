import { SinonStub } from "sinon";

export type FluentStub<T> =
  {
    [key in keyof T]: ((...args: any[]) => FluentChain<T[key]>) & FluentStub<T[key]>;
  } &
  {
    /** Returns The fluent tree from calls after these parameters */
    with: (...args: any[]) => FluentStub<T>,

    /** Allows setting up a leaf return value, based on arguments further up the fluent chain */
    whenGiven: (...args: any[]) => FluentStub<T>,
  } & SinonStub;

export type FluentChain<T> = {
  [key in keyof T]: (...args: any[]) => FluentChain<T[key]>;
};

export interface FluentInterface {
  [key: string]: any;
};
