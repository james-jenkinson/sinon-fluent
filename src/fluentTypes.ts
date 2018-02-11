import { SinonStub } from "sinon";
export type SinonStub = SinonStub;

export type FluentStub<T> =
  {
    [key in keyof T]: FluentStub<T[key]>;
  } &
  {
    with: (...args: any[]) => FluentStub<T>;
  } & SinonStub;

export type FluentInterface = {
  [key: string]: any;
};
