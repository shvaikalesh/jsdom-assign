"use strict"

var html =
    "<!DOCTYPE html>" +
    "<meta charset=utf-8>" +
    "<title>shvaikalesh/jsdom-assign - GitHub</title>"

var options =
{
    url: "https://github.com/shvaikalesh/jsdom-assign",
    referrer: "https://github.com/tmpvar/jsdom",
    cookie:
        "_octo=GH1.1.1071914994.1455594493; " +
        "_ga=GA1.2.840814629.1455594493; _gat=1; " +
        "tz=Europe%2FHelsinki",
    userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) " +
        "Chrome/48.0.2564.109 Safari/537.36"
}

var document = require("jsdom").jsdom(html, options)

var window = document.defaultView
    window.console = global.console

for (var key in window) if (!(key in global))
{
    try { global[key] = window[key] }
    finally {}
}

var _close = window.close

window.close = function()
{
    Object.keys(global).forEach(function(key)
    {
        if (global[key] == window[key])
        {
            try { delete global[key] }
            finally {}
        }
    })

    _close.apply(this, arguments)
}