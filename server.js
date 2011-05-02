// vim: ai set sw=2 ts=2

var http = require('http')
  , io = require('socket.io')
  , fs = require('fs')

server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  var page = '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>'
    + '<script src="http://cdn.socket.io/stable/socket.io.js"></script>'

  fs.readFile('app.js', function(err, js) {
    page += '<script>' + js + '</script>'
    res.end(page)
  })
})
server.listen(8000)

// socket.io
var socket = io.listen(server)
  , store = []

socket.on('connection', function(client){
  client.on('message', function(msg){
    client.broadcast(msg)
    store.push(msg)
  })

  store.forEach(function(msg) { client.send(msg) })
})

