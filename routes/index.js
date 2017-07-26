var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sensors = [
    {title:'Temperature', img: 'thermometer.png', class:'one', sensor:'temp'},
    {title:'Humidity', img:'humidity.png', class:'two', sensor:'hum'},
    {title:'Weight', img:'weight-balance.png', class:'three', sensor:'wt'},
    {title:'Radiation', img:'wifi-signal-waves.png', class:'four', sensor:'rad'},
    {title:'Bee Counter', img:'bee.png', class:'five', sensor:'bee'}
  ]
  for (i=0; i<5; i++) {
    sensors[i].img = '/images/'+sensors[i].img
    sensors[i].id = i
  }
  res.render('index', { sensors: sensors });
});

router.get('/result', function(req, res, next) {
  res.render('result');
});

router.get('/pusher', function(req, res, next) {
  res.render('push');
});

module.exports = router;
