var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sensors = [
    {title:'Temperature', img: 'thermometer2.png', class:'l'},
    {title:'Humidity', img:'humidity2.png', class:'r'},
    {title:'Weight', img:'weight-balance2.png', class:'l'},
    {title:'Radiation', img:'wifi-signal-waves2.png', class:'r'},
    {title:'Bee Counter', img:'bee2.png', class:'l'}
  ]
  for (i=0; i<5; i++) {
    sensors[i].img = '/images/'+sensors[i].img
    sensors[i].id = i
  }
  res.render('index', { sensors: sensors });
});

module.exports = router;
