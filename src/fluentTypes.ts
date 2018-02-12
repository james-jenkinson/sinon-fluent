import { SinonStub } from "sinon";

export type FluentStub<T> =
  {
    [key in keyof T]: FluentStub<T[key]>;
  } &
  {
    with: (...args: any[]) => FluentStub<T>;
  } & SinonStub;

export interface FluentInterface {
  [key: string]: any;
};
