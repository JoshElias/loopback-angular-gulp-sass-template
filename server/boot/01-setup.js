var path = require("path");
var serveStatic = require("serve-static");
var ejs = require("ejs");
var compression = require("compression");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var loopback = require('loopback');


module.exports = function(server) {


    server.use(serveStatic("client"));
    // Only serve modules if we're not in production
    if(process.env.NODE_ENV !== "production") {
        server.use('/modules', serveStatic("modules"));
    }

    server.set("view engine", "ejs");
    server.set("views", path.join(__dirname, "..", "views"));


    server.use(compression({
        threshold: 512
    }));
    server.use(bodyParser.json({limit: "1mb"}));

    server.use(methodOverride());
    server.use(loopback.favicon());
    server.use(loopback.context());

    server.middleware('auth', loopback.token({
        model: server.models.AccessToken
    }));
};