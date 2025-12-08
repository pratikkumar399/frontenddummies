import { Snippet } from "@/types/types";

export const PROMISE_OUTPUT_CHALLENGES_SNIPPETS: Snippet[] = [
    {
        id: 's1',
        title: 'Promise Executor Order',
        code: `console.log('Start');

const promise = new Promise((resolve, reject) => {
  console.log('Promise executor');
  resolve('Resolved');
});

promise.then((value) => {
  console.log(value);
});

console.log('End');`,
        options: [
            "Start, Promise executor, Resolved, End",
            "Start, Promise executor, End, Resolved",
            "Promise executor, Start, End, Resolved",
            "Start, End, Promise executor, Resolved"
        ],
        correctAnswer: 1,
        explanation: 'The executor runs immediately, logging "Promise executor". Synchronous code continues to log "End". The resolved promise queues the then handler as a microtask, so "Resolved" logs after the call stack clears.'
    }
];