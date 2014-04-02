var express = require('express');
var app = express();
var Ractive = require('ractive');
var fs = require('fs');

var idx, idxcon, list, listcon, menu;

function fread(fna) {
	c = fs.readFileSync(__dirname+'/views/'+fna+'.html', 'utf8');
  return c;
}

idx = fread('index');
idxcon = fread('indexcontent');
list = fread('list');
listcon = fread('listcontent');
menu = fread('menu');

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
    res.end(JSON.stringify({
      "data":data,
      "tpl":Ractive.parse(idxcon)
    }));
  } else {
  	var ractive = new Ractive({
  		template: idx,
      partials: {
        'menu':menu,
        'indexcontent':idxcon
      },
      data: data
  	});
    res.end(ractive.toHTML());
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
    res.end(JSON.stringify({
      "data":data,
      "tpl":Ractive.parse(listcon)
    }));
  } else {
    var ractive = new Ractive({
      template: list,
      partials: {
        'menu':menu,
        'listcontent':listcon
      },
      data: data
    });
    res.end(ractive.toHTML());
  }
});


app.listen(3000);
console.log('Listening on port 3000');