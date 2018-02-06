type FluentStub<T> = {
  [key in keyof T]: sinon.SinonStub & FluentStub<T[key]>;
}

type FluentInterface = {
  [key: string]: any
}
