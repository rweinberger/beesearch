var sensorTypes = ['temp', 'hum', 'wt', 'rad', 'bee'];
var dataTemp = [],
  dataHum = [],
  dataWt = [],
  dataRad = [],
  dataBee = []
var sensorData = [dataTemp, dataHum, dataWt, dataRad, dataBee];
var xVals = [0,0,0,0,0]

var chartTemp = new CanvasJS.Chart("charttemp",{    
  data: [{
    type: "line",
    dataPoints: dataTemp 
  }]
});

var chartHum = new CanvasJS.Chart("charthum",{    
  data: [{
    type: "line",
    dataPoints: dataHum 
  }]
});

var chartWt = new CanvasJS.Chart("chartwt",{    
  data: [{
    type: "line",
    dataPoints: dataWt 
  }]
});

var chartRad = new CanvasJS.Chart("chartrad",{    
  data: [{
    type: "line",
    dataPoints: dataRad 
  }]
});

var chartBee = new CanvasJS.Chart("chartbee",{    
  data: [{
    type: "line",
    dataPoints: dataBee 
  }]
});

var charts = [chartTemp, chartHum, chartWt, chartRad, chartBee];

if (!!window.EventSource) {
  var source = new EventSource('/stream');
  source.addEventListener('message', function(e) {
    newData = JSON.parse(e.data);
    updateChart(newData);
  }, false)

  source.addEventListener('open', function(e) {
    $(".state").text("Connected")
  }, false)

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
}


var updateChart = function (data) {
  s = data.toUpdate;
  if(s != null) {
    i = sensorTypes.indexOf(s);
    console.log('index is '+i);
    y = parseInt(data[s][data[s].length - 1]);
    chart = sensorData[i];
    chart.push({
      x: xVals[i],
      y: y
    });
    xVals[i]++;
    toRender = charts[i];
    toRender.render();
  };
};