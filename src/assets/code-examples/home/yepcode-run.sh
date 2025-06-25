curl -X 'POST' \
  'https://cloud.yepcode.io/run' \
  -H 'x-api-token: <your-api-token-here>' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "def main():\n    message = \"Hello, YepCode!\"\n    print(message)\n    return {\"message\": message}",
  "options": {
    "language": "python",
    "removeOnDone": true
  }
}'