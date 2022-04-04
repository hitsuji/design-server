# design-server

This is a basic node.js server that allows for auto-reloading pages on change and auto comping sass style.

Use `npm run start` to start the server on the default port of 3000. Add the optional param `--port=XXXX` to set a custom port.

To enable auto reloading on pages add `<script src="/reload/reload.js"></script>` to the page.

If you are running multiple instances of the server you will also need to specify a different port for reload to run on each instance. Use the optional param `--reload-port=XXXX` to specify the port.
