import { Snippet } from '@/types/types';

export const JS_OUTPUT_CHALLENGES_SNIPPETS: Snippet[] = [
    {
        id: 's1',
        title: 'Variable Hoisting',
        code: `console.log(a);
var a = 10;
function test() {
  console.log(a);
  var a = 20;
}
test();`,
        options: [
            'undefined, undefined',
            'ReferenceError, 10',
            'undefined, 20',
            '10, 20'
        ],
        correctAnswer: 0,
        explanation: 'In the first log, `a` is hoisted but not initialized, so it is `undefined`. In `test()`, the local `var a` is hoisted to the top of the function scope, shadowing the global `a`. So the second log is also `undefined` before assignment.'
    },
    {
        id: 's2',
        title: 'Event Loop & SetTimeout',
        code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
        options: [
            '1, 2, 3, 4',
            '1, 4, 2, 3',
            '1, 4, 3, 2',
            '1, 3, 4, 2'
        ],
        correctAnswer: 2,
        explanation: 'Synchronous code runs first (1, 4). Then Microtasks (Promises) run (3). Finally, Macrotasks (setTimeout) run (2).'
    },
    {
        id: 's3',
        title: 'Object Reference',
        code: `const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
        options: [
            '123',
            '456',
            'undefined',
            'Object'
        ],
        correctAnswer: 1,
        explanation: 'Object keys are converted to strings. `b` becomes `"[object Object]"` and `c` becomes `"[object Object]"`. So `a["[object Object]"]` is first set to 123, then overwritten by 456.'
    },
    {
        id: 's4',
        title: 'Closure & Let vs Var',
        code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 1);
}`,
        options: [
            '0 1 2 and 0 1 2',
            '3 3 3 and 0 1 2',
            '3 3 3 and 3 3 3',
            '0 1 2 and 3 3 3'
        ],
        correctAnswer: 1,
        explanation: '`var` has function scope, so the closure captures the same reference to `i`, which is 3 by the time the timeout runs. `let` has block scope, so each iteration creates a new binding for `j`.'
    }
];

