#!/usr/bin/env python3
"""
simple flask app
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel
from pytz import timezone, UnknownTimeZoneError
from datetime import datetime


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
    user = g.get("user")
    tz = g.get("tz")
    if user:
        return render_template(
            "index.html",
            username=user["name"],
            current_time=datetime.now(tz=tz).ctime())
    return render_template("index.html", username=None, current_time=tz)


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
    tz = get_timezone()
    if tz:
        g.timezone = tz


@babel.localeselector
def get_locale():
    """select best lang"""
    locale_param = request.args.get("locale")
    locale_head = request.headers.get("locale")
    locale_user = None
    if g.get("user"):
        locale_user = g.user.get("locale")
    if locale_param and locale_param in app.config["LANGUAGES"]:
        return locale_param
    elif locale_user and locale_user in app.config["LANGUAGES"]:
        return locale_user
    elif locale_head and locale_head in app.config["LANGUAGES"]:
        return locale_head
    else:
        return request.accept_languages.best_match(app.config["LANGUAGES"])


@babel.timezoneselector
def get_timezone():
    try:
        locale_param = request.args.get("timezone")
        timezone(locale_param)
    except UnknownTimeZoneError:
        locale_param = None

    try:
        locale_user = g.user.get("timezone")
        timezone(locale_user)
    except UnknownTimeZoneError:
        locale_user = None

    if locale_param:
        return locale_param
    elif locale_user:
        return locale_user
    else:
        return app.config["BABEL_DEFAULT_TIMEZONE"]


if __name__ == "__main__":
    app.run()
