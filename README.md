# Sinon-Fluent
A package for stubbing fluent interfaces usings Sinon.js

## Usage
### Creating a basic stub interface
```javascript
import stub from "sinon-fluent";
// const stub = require("sinon-fluent").default // using require

// Create stub
const structure = {
  foo: {
    bar: {
      baz: 999,
    },
  },
};
const fluentStub = stub(structure);

// Injection
testSubject.fluentDependency = fluentStub;

// Fluent method chaining
fluentStub
  .foo()
  .bar()
  .baz() // returns 999
```
### Creating a stub replacing a key on an existing object
```javascript
const existingObject = {
  foo: () => ({
    bar: () => ({
      baz: () => 0,
    }),
  }),
};

const fluentStub = stub({ bar: { baz: 99 } }, existingObject, 'foo');

existingObject
  .foo()
  .bar()
  .baz(); // returns 99

```
### Assertion
You can use the `with` filter, to assert calls to stubs based on arguments in the function chain.

```javascript
const fluentStub = stub({ foo: { bar: { baz: 'foo' } } });

fluentStub.foo(1, 2).bar(3, 4).baz(5, 6); // 'foo'

fluentStub.foo.with(1, 2).bar.with(3, 4).baz.with(5, 6).called;  // true
fluentStub.foo.with(1, 99).bar.with(3, 4).baz.with(5, 6).called; // false
fluentStub.foo.with(1, 2).bar.with(3, 4).baz.with(5, 99).called; // false
```