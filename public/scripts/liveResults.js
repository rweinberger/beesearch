var sensorTypes = ['temp', 'hum', 'wt', 'bee'];
var units = [' \u00b0C', ' %', ' kg', ''];
var dataTemp = [],
  dataHum = [],
  dataWt = [],
  dataBee = [];
var sensorData = [dataTemp, dataHum, dataWt, dataBee];
var xVals = [0,0,0,0];

var charts = [];
var indicateColors = ['#9a1919', '#9a5c19', '#9a8619', '#899a19', '#469a19'];

for(var i=0; i<4; i++){
  c = new CanvasJS.Chart("chart"+sensorTypes[i],{    
    backgroundColor: "#8b8b8b",
    axisX: {lineColor:"black", tickColor:"black", tickThickness: 1, lineThickness: 1, labelFontColor:"black", labelFontFamily: 'verdana'},
    axisY: {lineColor:"black", tickColor:"black", tickThickness: 1, lineThickness: 1, labelFontColor:"black", labelFontFamily: 'verdana'},
    toolTip:{backgroundColor: "#8b8b8b"},
    data: [{
      type: "line",
      lineColor: '#f9c700',
      color:'#f9c700',
      markerSize: 10,
      xValueType: "dateTime",
      dataPoints: sensorData[i]
    }]
  });
  charts.push(c)
};

if (!!window.EventSource) {
  var source = new EventSource('/stream');
  source.addEventListener('message', function(e) {
    newData = JSON.parse(e.data);
    s = newData.toUpdate;
    if (s == 'sensors') {
      updateCharts(newData);
    } else if (s == 'settings') {
      updatePrefs(newData)
    };
    if (newData.tPref != 0) {
      var hTemp = 1 - (Math.abs(newData.temp.avg - newData.tPref) / newData.tPref),
        hHum = 1 - (Math.abs(newData.hum.avg - newData.hPref) / newData.hPref),
        hWt = 1 - (Math.abs(newData.wt.avg - newData.wPref) / newData.wPref),
        hBee = 1 - (Math.abs(newData.bee.avg - newData.bPref) / newData.bPref)
      updateIndicators(hTemp, hHum, hWt, hBee);
    };
  }, false);

  source.addEventListener('open', function(e) {
    $(".state").text("Connected")
  }, false);

  source.addEventListener('error', function(e) {
    console.log(e);
    if (e.target.readyState == EventSource.CLOSED) {
      $(".state").text("Disconnected")
    }
    else if (e.target.readyState == EventSource.CONNECTING) {
      $(".state").text("Connecting...")
    }
  }, false)
} else {
  console.log("Your browser doesn't support SSE")
};


var updateCharts = function (data) {
  for(var i=0; i<3; i++) {
    var s = sensorTypes[i];
    var avg = data[s].avg;
    $('.avg'+i).text(avg+units[i]);
    y = data[s].dps[data[s].dps.length - 1];
    chart = sensorData[i];
    chart.push({
      x: Date.now(),
      y: y
    });
    if (chart.length > 20) {
      chart.shift()
    };
    xVals[i]++;
    charts[i].render();
  };
};

var updatePrefs = function(data) {
  $('.tempPref').text(data.tPref+' \u00b0C');
  $('.humPref').text(data.hPref+' %');
  $('.wtPref').text(data.wPref+' kg');
  $('.beePref').text(data.bPref);
}

var updateIndicators = function(t, h, w, b) {
  var toChange = [t,h,w,b];
  for(var i=0; i<3; i++) {
    newSize = toChange[i]*194;
    console.log("resizing "+sensorTypes[i]+" to "+newSize);
    $("#indic"+i).animate({
      width: newSize+"px",
      height: newSize+"px"
    }, 200);
  }
}
