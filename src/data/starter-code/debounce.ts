export const DEBOUNCE_STARTER_CODE = `/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */

function debounce(func, wait) {
  // Your code here
}

// Test your code here
const log = () => console.log('Fired!');
const debouncedLog = debounce(log, 1000);

debouncedLog();
debouncedLog();
debouncedLog(); // Should only fire once after 1s
`;

