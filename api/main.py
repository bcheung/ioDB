#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ----------------------------------------------
# Google App Engine Demo
# Playing with Flask in Python
# GET returns number-th position in the container 
# POST appends to the container
# ----------------------------------------------


from flask import Flask, jsonify


app = Flask(__name__)
container = ['Hello World!', 'Google']

@app.route('/api/hello')
def hello_world():
  return 'Hello, World!'

if __name__ == '__main__':
	app.run(debug=True)