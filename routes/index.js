var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sensors = [
    {title:'Temperature', img: 'thermometer.png', class:'zero', sensor:'temp'},
    {title:'Humidity', img:'humidity.png', class:'one', sensor:'hum'},
    {title:'Weight', img:'weight-balance.png', class:'two', sensor:'wt'},
    {title:'Bee Counter', img:'bee.png', class:'three', sensor:'bee'}
  ];
  teardrops = [
    {title: 'Temperature', shortTitle: 'temp', position: 'teardropTopLeft', id:0, textPosition: 'textTop', styleMain: '', styleDynamic: 'right:0; bottom:0'},
    {title: 'Humidity', shortTitle: 'hum', position: 'teardropTopRight', id:1, textPosition: 'textTop', styleMain: 'margin-left:-10px', styleDynamic: 'left:0; bottom:0'},
    {title: 'Weight', shortTitle: 'wt', position: 'teardropBottomLeft', id:2, textPosition: 'textBottom', styleMain: 'margin-top: -5px', styleDynamic: 'right:0; top:0'},
    {title: 'Bee Counter', shortTitle: 'bee', position: 'teardropBottomRight', id:3, textPosition: 'textBottom', styleMain: 'margin-left:-10px; margin-top: -5px', styleDynamic: 'left:0; top:0'},
  ];
  for (i=0; i<4; i++) {
    sensors[i].img = '/images/'+sensors[i].img
    sensors[i].id = i
  }
  res.render('index', { sensors: sensors, teardrops: teardrops });
});

router.get('/result', function(req, res, next) {
  res.render('result');
});

router.get('/pusher', function(req, res, next) {
  res.render('push');
});

module.exports = router;
