
module.exports = function(server) {

    //var indexPath = path.join("..", "views", "index");
    //if(!process.env.NODE_ENV) {
       // indexPath += "."+process.env.NODE_ENV;
    //}

    // Load the angular app
    var router = server.loopback.Router();
    router.get("/", function(req, res) {
        res.render("index", {title:"Apples"});
    });
    server.use(router);
};