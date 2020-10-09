var express = require('express');
var bodyParser = require('body-parser')
var app = express();
//app.set('views', '/var/www/stat2.tarelki.com.ua/www/jade/')
app.set('view engine', 'jade')

var config = require('./config.json');
app.locals.compileDebug = config.compileDebug;
app.locals.debug = config.debug;
app.locals.cache = config.cache;

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({ extended: true  })); 

/*
app.get('/', function (req, res) {
//	res.send('Hello World!');
	console.log('render');
	res.render('supplierorder/select.jade',	  { suppliers: [{id_supplier:1,name:'first',price:'0.25'}] } 	    );
});

app.get('/jade/:tpl/:data/', function (req, res) {
	console.log('render '+req.params.tpl+' '+req.params.data);
	res.render(req.params.tpl, req.params.data );
});
*/

Date.prototype.toLocaleFormat = function(format) {
	var f = {Y : this.getYear() + 1900,m : this.getMonth() + 1,d : this.getDate(),H : this.getHours(),M : this.getMinutes(),S : this.getSeconds()}
	for(k in f)
	format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
    return format;
};

app.post('/p/', function (req, res) {
	var dt = new Date();
    var path = '/var/www/stat2.tarelki.com.ua/www/jade/';
    console.log('['+dt.toLocaleFormat('%H:%M:%S %d-%m-%Y')+'][stat2] '+req.body.tpl +' '+req.body.header.query+' '+req.body.header.useragent);
    res.render(path+req.body.tpl, req.body.data );
});

app.post('/t/', function (req, res) {
	var dt = new Date();
    var path = '/var/www/tarelki.com.ua/www/jade/';
    console.log('['+dt.toLocaleFormat('%H:%M:%S %d-%m-%Y')+'] '+req.body.tpl +' '+req.body.header.query+' '+req.body.header.useragent);
    res.render(path+req.body.tpl, req.body.data );
});

app.post('/n/', function (req, res) {
	var dt = new Date();
    var path = req.body.path||'';
    console.log('['+dt.toLocaleFormat('%H:%M:%S %d-%m-%Y')+'] '+req.body.tpl +' '+req.body.header.query+' '+req.body.header.useragent);
    res.render(path+req.body.tpl, req.body.data );
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
    console.log("config.compileDebug: "+config.compileDebug)
});
