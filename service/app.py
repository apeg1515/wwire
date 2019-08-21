import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def sendData():
  if request.method == 'GET':
    with open('data.json') as f:
      data = json.load(f)
      return data
  else:
    return "sorry"

if __name__ == '__main__':
  app.run(debug=True)
