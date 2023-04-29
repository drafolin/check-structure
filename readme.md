# Check structure

This package aims to check the structure of a javascript object, by comparing it to a given structure.

The given structure is another object, where the primitive types (string, number, boolean, ...), which would be the leafs, are replaced by the constructor of the type.

## Example

```javascript
const checkStructure = require('check-structure');

const structure = {
 name: String,
 age: Number,
 isAlive: Boolean,
 address: {
  street: String,
  number: Number,
  city: String,
  country: String,
 },
 friends: [String],
};

const object = {
 name: 'John',
 age: 42,
 isAlive: true,
 address: {
  street: 'Main Street',
  number: 42,
  city: 'New York',
  country: 'USA',
 },
 friends: ['Jane', 'Jack'],
};

checkStructure(structure, object); // true
```

## Error mode

The function can also be called in error mode, which will throw an error if the structure is not respected.

```javascript
const {checkStructureOrThrow} = require('check-structure');

const structure = {
 name: String,
 address: {
  street: String,
  country: String,
 }
};

const object = {
 name: 'John',
 age: 42,
 isAlive: true,
 address: {
  street: 12,
  country: 'USA',
 }
};

checkStructureOrThrow(structure, object); // This will throw an error "key 'address.street' is not of type 'String'"
```
