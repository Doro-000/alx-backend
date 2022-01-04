#!/usr/bin/env python
"""
simple flask app
"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """
    Configuration class
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route("/")
def index():
    """simple index page"""
    return render_template("3-index.html")


@babel.localeselector
def get_locale():
    """select best lang"""
    return request.accept_languages.best_match(app.config["LANGUAGES"])


if __name__ == "__main__":
    app.run()
