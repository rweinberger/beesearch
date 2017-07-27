var sensorTypes = ['temp', 'hum', 'wt', 'bee'];
var dataTemp = [],
  dataHum = [],
  dataWt = [],
  dataBee = [];
var sensorData = [dataTemp, dataHum, dataWt, dataBee];
var xVals = [0,0,0,0];

var charts = [];

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
      dataPoints: sensorData[i]
    }]
  });
  charts.push(c)
};

if (!!window.EventSource) {
  var source = new EventSource('/stream');
  source.addEventListener('message', function(e) {
    newData = JSON.parse(e.data);
    updateChart(newData);
  }, false);

  source.addEventListener('open', function(e) {
    $(".state").text("(Connected)")
  }, false);

  source.addEventListener('error', function(e) {
    console.log(e);
    if (e.target.readyState == EventSource.CLOSED) {
      $(".state").text("(Disconnected)")
    }
    else if (e.target.readyState == EventSource.CONNECTING) {
      $(".state").text("(Connecting...)")
    }
  }, false)
} else {
  console.log("Your browser doesn't support SSE")
};


var updateChart = function (data) {
  s = data.toUpdate;
  if(s != null) {
    if (s != 'settings') {
      console.log(s+' avg (last 50 dps): '+data[s].avg);
      i = sensorTypes.indexOf(s);
      y = data[s].dps[data[s].dps.length - 1];
      chart = sensorData[i];
      chart.push({
        x: xVals[i],
        y: y
      });
      if (chart.length > 10) {
        chart.shift()
      };
      xVals[i]++;
      charts[i].render();
    } else {
      $('#tempPref').text(data.tPref);
      $('#humPref').text(data.hPref);
      $('#wtPref').text(data.wPref);
      $('#beePref').text(data.bPref);
    }
  };
};