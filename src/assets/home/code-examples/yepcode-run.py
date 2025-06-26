from yepcode_run import YepCodeRun, YepCodeApiConfig

runner = YepCodeRun(YepCodeApiConfig(api_token="<your-api-token-here>"))

# Execute any JavaScript or Python code (you may use dependencies)
execution = runner.run(
    """def main():
    message = "Hello, YepCode!"
    print(message)
    return {"message": message}""",
    {
        "onLog": lambda log: print(f"{log.timestamp} {log.level}: {log.message}"),
        "onFinish": lambda return_value: print("Finished:", return_value),
        "onError": lambda error: print("Error:", error),
    },
)

# Wait for execution to complete
execution.wait_for_done()

# Retrieve an existing execution
existing_execution = runner.get_execution("execution-id")
