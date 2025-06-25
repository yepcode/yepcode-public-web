const { YepCodeRun } = require("@yepcode/run");

const runner = new YepCodeRun({ apiToken: "<your-api-token-here>" });

// Execute any JavaScript or Python code (you may use dependencies)
const execution = await runner.run(
  `async function main() {
    const message = "Hello, YepCode!";
    console.log(message);
    return { message };
  }
  module.exports = { main };`,
  {
    onLog: (log) =>
      console.log(`${log.timestamp} ${log.level}: ${log.message}`),
    onFinish: (returnValue) => console.log("Finished:", returnValue),
    onError: (error) => console.error("Error:", error),
  }
);

// Wait for execution to complete
await execution.waitForDone();

// Retrieve an existing execution
const existingExecution = await runner.getExecution("execution-id");
