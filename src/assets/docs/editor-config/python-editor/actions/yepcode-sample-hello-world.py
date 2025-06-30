# Like in any other programming tool, we think that a Hello world sample may solve some doubts, so let's test it!

# In order to run this example with the needed input params, you have to set this JSON content into the PARAMETERS SCHEMA tab:

# {
#     "description": "The hello world input parameters",
#     "type": "object",
#     "title": "Hello world input parameters",
#     "properties": {
#         "name": {
#         "type": "string",
#         "description": "Type your name to receive a greeting"
#         }
#     },
#     "required": [
#         "name"
#     ]
# }

# After this you'll be ready to run this sample with the flame button on the top of this editor.

# Other interesting thing may be to configure a webhook trigger and start one execution with a simple CURL command.

parameters = yepcode.context.parameters

message = f"Hello {parameters['name']}."

print(message)

return {
    "theMessage": message,
}
