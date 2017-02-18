<img src="http://i.imgur.com/4iYTy4j.png" height="70">

## About Unload
Unload is an open-source code sharing platform, built in NodeJS with a ReactJS frontend.

## Why did I build Unload?
The aim of Unload is to provide rapid fast code sharing facilites with auto-language syntax detection for anyone looking to distribute code snippets.

## Roadmap
* Tab spacing within editor
* Collaborate in realtime on the same snippet
* Live highlighting
* Secure server with HTTPS
* ...

## Keybinds
New snippet - `ctrl/cmd + q`

Save snippet - `ctrl/cmd + s`

Duplicate & edit - `ctrl/cmd + e`

Plain text - `ctrl/cmd + shift + r`

## Customised Syntax
Unload's syntax is powered by [highlight.js](https://highlightjs.org/) covering a range of 150+ languages.

Whenever a new snippet is saved on Unload the language is automatically detected and it's alias extension is appended to the snippet name in the URL.

A snippet with the URL http://unload.io/rkZcg6SKe.html is highlighted with an html syntax. To change the syntax manually, just replace it with a new extension.

###### If the extension is not valid with HighlightJS, the syntax will be reverted to its original.

## Issues
If you find any issues please let post in the issues section on this repository. If you can fix the problem then by all means make a pull request so I can approve it!

## License
MIT License - cindr.io
