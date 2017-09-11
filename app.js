const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

app.use('^/$', function(req, res, next) {
	var cookies = parseCookies(req);
	if (cookies.session !== undefined) {
		next();
		return;
	}
	res.redirect('/login');
}, express.static('graphiql'));

app.use('^/', express.static('graphiql'));

app.use(routes);

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.send(err.toString());
});

var http = require('http');
app.set('port', 3000);
var server = http.createServer(app);

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

server.listen(3000);
