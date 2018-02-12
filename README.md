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