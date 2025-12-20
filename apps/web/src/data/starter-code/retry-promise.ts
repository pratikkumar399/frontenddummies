export const RETRY_PROMISE_STARTER_CODE = `// A mock API that fails 'failTimes' times before succeeding
function createMockApi() {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({
            statusCode: 500,
            message: "Internal Server Error on attempt",
        });
      }, 300);
    });
}

function retry(asyncFn, retries = 3, delay = 0) {
  // Your implementation here
}


retry(createMockApi, 3, 500)
  .then(result => console.log('Success:', result))
  .catch(error => console.log('Failed after all retries:', error));
`;

