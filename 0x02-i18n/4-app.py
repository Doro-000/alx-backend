#!/usr/bin/env python3
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
    return render_template("4-index.html")


@babel.localeselector
def get_locale():
    """select best lang"""
    locale = request.args.get("locale")
    if locale and locale in app.config["LANGUAGES"]:
        return locale
    else:
        return request.accept_languages.best_match(app.config["LANGUAGES"])


if __name__ == "__main__":
    app.run()
