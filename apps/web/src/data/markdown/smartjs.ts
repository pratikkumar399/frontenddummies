export const SMART_JS_MD = `
# Smart JavaScript Tips & Tricks

A collection of useful JavaScript patterns and shortcuts that every developer should know.

---

## 1. Array Destructuring

Extract values from arrays or function returns cleanly:

\`\`\`javascript
function getValues() {
    const valA = "abc";
    const valB = "def";
    return [valA, valB];
}

const [a, b] = getValues();
console.log(a, b); // "abc" "def"
\`\`\`

---

## 2. Sorting Numbers Correctly

JavaScript's default \`sort()\` converts elements to strings. Use a compare function for numbers:

\`\`\`javascript
const nums = [2, 20, 10];
nums.sort((x, y) => x - y);
console.log(nums); // [2, 10, 20]
\`\`\`

---

## 3. Remove Duplicates

Use \`Set\` to quickly remove duplicate values from an array:

\`\`\`javascript
const arr = [1, 2, 2, 3];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3]
\`\`\`

---

## 4. Cloning Objects

### Shallow Clone
Copies only the first level of properties:

\`\`\`javascript
const obj = {
    a: "hello",
    b: "hello again",
    c: { d: "new hello", e: "new hello again" }
};

const clone1 = { ...obj };
\`\`\`

### Deep Clone
structuredClone creates a true deep copy, handling nested objects, arrays, dates, and more.:

\`\`\`javascript
const deepClone = structuredClone(obj);
deepClone.c.d = "new deep hello";
console.log(obj.c.d); // "new hello"
console.log(deepClone.c.d); // "new deep hello"
\`\`\`

---

## 5. Creating Arrays

### 1D Array
\`\`\`javascript
const oneD = new Array(10).fill(2);
// [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
\`\`\`

### 2D Array
\`\`\`javascript
const twoD = Array.from({ length: 3 }, () => Array(5).fill(0));
// [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]
\`\`\`

---

## 6. Array Testing: some() & every()

- \`some()\` — returns \`true\` if **at least one** element passes the test
- \`every()\` — returns \`true\` if **all** elements pass the test

\`\`\`javascript
const arrOne = [1, 2, 3, 4];
const hasEven = arrOne.some((value) => value % 2 === 0);  // true
const allEven = arrOne.every((value) => value % 2 === 0); // false
\`\`\`

---

## 7. Finding Min & Max

Use the spread operator with \`Math.min()\` and \`Math.max()\`:

\`\`\`javascript
const numsOne = [1, 2, 3, 5];
const mini = Math.min(...numsOne); // 1
const maxi = Math.max(...numsOne); // 5
\`\`\`

---

## 8. Easy Variable Swap

Swap two variables without a temporary variable:

\`\`\`javascript
let aa = 10;
let bb = 20;
[aa, bb] = [bb, aa];
// aa = 20, bb = 10
\`\`\`

---

## 9. Object to Array Conversions

Extract keys, values, or entries from objects:

\`\`\`javascript
const obj = { a: 1, b: 2, c: 3 };

const keys = Object.keys(obj);     // ["a", "b", "c"]
const values = Object.values(obj); // [1, 2, 3]
const entries = Object.entries(obj); // [["a", 1], ["b", 2], ["c", 3]]
\`\`\`


## 10. Swap Object Keys and Values

Swap object keys and values using \`Object.entries()\` and \`Object.fromEntries()\`:
- \`Object.entries()\` returns an array of [key, value] pairs.
- \`Object.fromEntries()\` creates an object from an array of [key, value] pairs.


\`\`\`javascript
const roles = { admin: 1, user: 2, guest: 3 };
const swapped = Object.fromEntries(
    Object.entries(roles).map(([key, value]) => [value, key])
);
console.log(swapped); // { 1: "admin", 2: "user", 3: "guest" }
\`\`\`

## 11. Capitalize First Letter
This pattern splits text into words, capitalizes the first letter while preserving the rest, then joins them back :

\`\`\`javascript
const text = 'hello world from javascript';
const capitalized = text.split(' ')
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(' ');
console.log(capitalized);
// 'Hello World From Javascript'
\`\`\`

`;