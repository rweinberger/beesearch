var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sse = sse = require('./sse')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

var connections = [];
var types = ['temp', 'hum', 'wt', 'bee'];
var sensors = {
  temp: {dps:[], avg: 0},
  hum: {dps:[], avg: 0},
  wt: {dps:[], avg: 0},
  bee: {dps:[], avg: 0},
  toUpdate: null,
  tPref: 0,
  hPref: 0,
  wPref: 0,
  bPref: 0
};

app.use(sse);

function add(a, b) {
  return a + b;
}

app.get('/set', function(req,res) {
  var tp = parseFloat(req.query.temp);
  var hp = parseFloat(req.query.hum);
  var wp = parseFloat(req.query.wt);
  var bp = parseFloat(req.query.bee);
  var invalid = isNaN(tp) || isNaN(hp) || isNaN(wp) || isNaN(bp)
  if (!invalid) {
    sensors.tPref = tp;
    sensors.hPref = hp;
    sensors.wPref = wp;
    sensors.bPref = bp;
    sensors.toUpdate = 'settings';
    for(var i = 0; i < connections.length; i++) {
      connections[i].sseSend(sensors)
    }
  } else {
    console.log('invalid settings submitted')
  }
});

app.get('/push', function(req, res) {
  var temp = parseFloat(req.query.temp);
  var hum = parseFloat(req.query.hum);
  var wt = parseFloat(req.query.wt);
  console.log('incoming data: temp '+ temp + ', hum ' + hum + ', wt ' + wt);
  var b = isNaN(temp) || isNaN(hum) || isNaN(wt);
  if (!b) {
    sensors.temp.dps.push(temp);
    sensors.hum.dps.push(parseFloat(Math.random*(32-30)+30));
    // sensors.hum.dps.push(hum);
    //hhhh
    // sensors.wt.dps.push(Math.random*(10-5)+5)
    sensors.wt.dps.push(wt);
    sensors.toUpdate = 'sensors';
    for (var i=0; i<3; i++) {
      var s = types[i];
      if(sensors[s].dps.length > 10){
        sensors[s].dps.shift();
      };
      var sum = sensors[s].dps.reduce(add, 0);
      var avg = sum / sensors[s].dps.length;
      sensors[s].avg = avg;
    };
    for(var i = 0; i < connections.length; i++) {
      connections[i].sseSend(sensors)
    }
  } else {
    console.log('NaN sent from sensor')
  }
  res.sendStatus(200)
});

app.get('/stream', function(req, res) {
  res.sseSetup()
  res.sseSend(sensors)
  connections.push(res)
});

app.post('/test', function(req, res) {
  console.log('humidity: '+req.headers.humidity);
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err: err});
});

module.exports = app;
