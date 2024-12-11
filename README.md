# Microinteractions demo

This repo contains two versions of a simple web app. The point is to use this as
a template to demonstrate and practice the implementation of microinteractions
and transitions.

You will need:

- A computer
- A text editor / IDE
- New-ish node (18 and up should be fine, preferably 22)

## Plain

The plain version is written using basic web technologies (HTTP/JS/CSS). It can
be served with any web server that can do static files. Tested using the
following commands in the `plain` directory:

- `npx http-server -o .`
  - Since you installed node, npx should already be installed.
  - Serves on `127.0.0.1:8080`
  - Opens up a tab automatically
- `python3 -m http-server` -
  - Serves on `localhost:8000`

Services like nginx, apache, caddy and the likes can be used as well, but the
files need to get served by something for the data loading to work.

## React

Near-identical site, made using React. Styling was done using both css files and
in-line styles and react-router was used for routing. This is several orders of
magnitude simpler than any react site out there, but it should help highlight
the places where react requires a trick to achieve some microinteraction.

To start:

- `cd react`
- `npm install` to install dependencies
- `npm run dev` to start dev server
- Open in the browser
  - Click the link
  - Press o+enter in the terminal
  - Go to http://localhost:5173 (port resembles the word "SITE")
