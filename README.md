# Sinon-Fluent
A package for stubbing fluent interfaces usings Sinon.js

## Usage
```javascript
import stub from "sinon-fluent";

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