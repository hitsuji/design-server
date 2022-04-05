const express = require('express');
const { fstat } = require('fs');
const http = require('http');
const reload = require('reload');
const fs = require('fs');

const app = express();

const server = http.createServer(app);

const port = process.env.APP_PORT || 3000;
const reloadPort = parseInt(process.env.APP_RELOAD_PORT || 9856);

app.set('port', port);

app.use(express.static('./public'));


function launchServer(reloadReturned) {
    server.listen(app.get('port'), () => console.log("Server started on http://localhost:" + app.get('port')));

    let relaunching = null;

    const watchHandler = (evtType, filename) => {
        'html js css png jpg'.split(' ').forEach(ext => {
            // there may be multiple events for the same filechange
            // ignore any after the first and relaunch after 10ms.
            if (relaunching) {
                return;
            }

            if (filename.endsWith('.' + ext)) {

                relaunching = setTimeout(() => {
                    relaunching = null;

                    reloadReturned.reload();
                }, 10);
            }
        });
    };

    fs.watch('./public', watchHandler);
    fs.watch('./public/css', watchHandler);
    fs.watch('./public/js', watchHandler);
}

reload(app, { port: reloadPort })
    .then(reloadReturned => {
        launchServer(reloadReturned);
    });
