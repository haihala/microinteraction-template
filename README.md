# Microinteractions demo

This repo contains two versions of a simple web app. The point is to use this as
a template to demonstrate and practice the implementation of microinteractions
and transitions.

You will need:

- A text editor / IDE of your choosing
- New-ish node (18 should be fine, preferably newer)

## Plain

The plain version is written using HTML, JS, and CSS. It can be served with any
web server that can do static files. Tested using the following commands in the
`plain` directory:

- `npx http-server -o .`
  - Since you installed node, npx should already be installed.
  - Serves on `127.0.0.1:8080`
  - Opens up a tab automatically
- `python3 -m http-server`
  - Serves on `localhost:8000`

Services like nginx, apache, caddy and the likes can be used as well, but the
files need to get served by something for the data loading to work.

## React

The react version should be visually near-identical. Styling was done using css
files and in-line styles. React-router was used for routing.

To start, open a terminal in the `react` directory and:

- Run `npm install` to install dependencies
- Run `npm run dev` to start dev server
- Open the app in a browser
  - Click the link in the terminal output
  - Press o+enter in the terminal
  - Write `localhost:5173` (port resembles the word "SITE") in the browser
    address bar
