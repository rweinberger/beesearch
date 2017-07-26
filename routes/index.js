var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sensors = [
    {title:'Temperature', img: 'thermometer.png', class:'zero', sensor:'temp'},
    {title:'Humidity', img:'humidity.png', class:'one', sensor:'hum'},
    {title:'Weight', img:'weight-balance.png', class:'two', sensor:'wt'},
    {title:'Bee Counter', img:'bee.png', class:'three', sensor:'bee'}
  ]
  for (i=0; i<4; i++) {
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
