
'use strict'

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path    = require("path");

var port = process.env.PORT||3000;

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));
// app.use(express.static(__dirname+ 'public'))
// app.use(express.static(__dirname+ 'build'))

// app.get('/', function(req,res){
// 	res.sendFile(path.join(__dirname+'/public/index.html'));
// })
// app.get('/home', function(req,res){
// 	res.sendFile(path.join(__dirname+'/public/index.html'));
// })

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });
//
app.get('/', function(req,res){
	res.send('index.html');
})
app.get('/home', function(req,res){
	res.send('index.html');
})
app.listen(port, function() {
    console.log( 'listening on port ' + port);

});
