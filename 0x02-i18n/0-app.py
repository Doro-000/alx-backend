#!/usr/bin/env python
"""
simple flask app
"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    """simple index page"""
    return render_template("0-index.html")


if __name__ == "__main__":
    app.run()
