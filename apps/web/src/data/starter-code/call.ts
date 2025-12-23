export const CALL_POLYFILL_STARTER_CODE = `Function.prototype.myCall = function (thisArg, ...argArray) {
  // TODO: Implement a polyfill for Function.prototype.call

};

// Test cases -> comment and run one section at a time if needed
console.log("=== Test 1: Basic Call ===");
function multiplyAge(multiplier = 1) {
  return this.age * multiplier;
}
const mary = { age: 21 };
console.log(multiplyAge.myCall(mary)); // Expected: 21
console.log(multiplyAge.myCall(mary, 2)); // Expected: 42

console.log("\\n=== Test 2: Different Objects ===");
const john = { age: 42 };
console.log(multiplyAge.myCall(john)); // Expected: 42
console.log(multiplyAge.myCall(john, 2)); // Expected: 84

console.log("\\n=== Test 3: Primitive thisArg Boxing ===");
function describeThis() {
  return typeof this === "object";
}
console.log(describeThis.myCall("hello")); // Expected: true (String object)
console.log(describeThis.myCall(123)); // Expected: true (Number object)

console.log("\\n=== Test 4: Default to Global (or undefined in strict mode) ===");
function getGlobalFlag() {
  // Should not throw if thisArg is null/undefined
  return Boolean(this && (this.flag ?? false));
}
globalThis.flag = true;
console.log(getGlobalFlag.myCall(null)); // Expected: true (uses globalThis)
console.log(getGlobalFlag.myCall(undefined)); // Expected: true

console.log("\\n=== Test 5: Proper Error Handling ===");
try {
  const notFn = {};
  // @ts-expect-error - calling myCall on non-function should throw
  notFn.myCall({});
} catch (err) {
  console.log(err instanceof TypeError); // Expected: true
}

console.log("\\n=== Test 6: Method Borrowing ===");
const greeter = {
  prefix: "Hello",
  greet(name, punctuation = "!") {
    return \`\${this.prefix}, \${name}\${punctuation}\`;
  },
};
const altGreeter = { prefix: "Hi" };
console.log(greeter.greet.myCall(altGreeter, "Ada", "!!")); // Expected: "Hi, Ada!!"
`;

