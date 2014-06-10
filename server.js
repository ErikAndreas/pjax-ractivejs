var express = require('express');
var app = express();
var Ractive = require('ractive');
var fs = require('fs');
var rr = require('ractive-render');
app.engine('html', rr.renderFile);

app.use(express.static(__dirname + '/'));

process.on('uncaughtException', function (err) {
  console.error("[Inside 'uncaughtException' event] " + err.stack || err.message);
});

app.get('/', function (req, res) {
  res.end('hi there, I\'m a node server');
});

app.get('/index', function (req, res) {
  var data = {
    title: "Index",
    date: new Date()
  };
  if (req.headers['x-pjax']) {
    res.header('Content-Type', 'application/json');
    rr.renderFile('views/indexcontent.html', {data:data}, function(err, html) {
      console.log(err, html);
      res.end(JSON.stringify({
        "data":data,
        "tpl":Ractive.parse(html)
      }));
    });
    
  } else {
    app.render('index.html', {data: data, autoloadPartials:true}, function(err, html) {
      res.end(html);
    });
  }
});

app.get('/list', function (req, res) {
  var data = {
    title: "List",
    date: new Date(),
    list: ['apple', 'banana', 'lemon']
  }; 
  if (req.headers['x-pjax']) {
    res.header('Content-Type', 'application/json');
    rr.renderFile('views/listcontent.html', {data:data}, function(err, html) {
      res.end(JSON.stringify({
        "data":data,
        "tpl":Ractive.parse(html)
      }));
    });
  } else {
    app.render('list.html', {data: data, autoloadPartials:true}, function(err, html) {
      res.end(html);
    });
  }
});


app.listen(3000);
console.log('Listening on port 3000');