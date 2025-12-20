export const DEBOUNCE_STARTER_CODE = `function debounce(func, wait) {
  
}

const log = () => console.log('Fired!');
const debouncedLog = debounce(log, 1000);

debouncedLog();
debouncedLog();
debouncedLog(); // Should only fire once after 1s
`;

