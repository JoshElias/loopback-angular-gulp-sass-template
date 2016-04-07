module.exports = {

    "mongodb": {
        "name": "mongodb",
        "connector": "mongodb",
        "host": "127.0.0.1",
        "database": "muskoka",
        "port": 27017,
        "server": {
            "auto_reconnect": true,
            "reconnectTries": 100,
            "reconnectInterval": 1000
        }
    }
};
