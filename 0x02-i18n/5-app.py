#!/usr/bin/env python3
"""
simple flask app
"""
import re
from flask import Flask, render_template, request, g
from flask_babel import Babel

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


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
    return render_template("5-index.html", username=g.get("user"))


def get_user():
    """
    verify if login is requested, and if the user exists
    """
    login_as = request.args.get("login_as")
    if not login_as:
        return None
    user = users.get(int(login_as))
    if not user:
        return None
    return user


@app.before_request
def before_request():
    """
    set user to global context
    """
    user = get_user()
    if user:
        g.user = user


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
