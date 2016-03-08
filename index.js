var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.get('/', function(req, res) {
    var osregex = new RegExp(/\(([^\)]+)\)/g)
    var data = {
        ipaddress: req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress || req.connection.socket.remoteAddress,
        language: req.headers['accept-language'].split(',')[0],
        software: osregex.exec(req.headers['user-agent'])[1]
    }

    console.log(req.headers)
    res.json(data)
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})
