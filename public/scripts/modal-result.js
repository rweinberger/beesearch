var xVal = 0;
var yVal = 100;
var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer",{    
  data: [{
    type: "line",
    dataPoints: dps 
  }]
});

if (!!window.EventSource) {
  var source = new EventSource('/stream')
  source.addEventListener('message', function(e) {
    nums = JSON.parse(e.data);
    point = nums.visible[nums.visible.length-1];
    console.log('point '+point);
    $("#nums").text(nums.visible);
    updateChart(point);
  }, false)

  source.addEventListener('open', function(e) {
    $("#state").text("Connected")
  }, false)

  source.addEventListener('error', function(e) {
    if (e.target.readyState == EventSource.CLOSED) {
      $("#state").text("Disconnected")
    }
    else if (e.target.readyState == EventSource.CONNECTING) {
      $("#state").text("Connecting...")
    }
  }, false)
} else {
  console.log("Your browser doesn't support SSE")
}


var updateChart = function (newPoint) {
  // console.log('updating chart');
  dps.push({
    x: xVal,
    y: parseInt(newPoint)
  });
  xVal++;
  if (dps.length > 10){
    dps.shift();
  };
  for (var i=0; i<dps.length; i++) {
    console.log('x: '+dps[i].x, 'y: '+dps[i].y)
  };
  chart.render(); 
};

// // generates first set of dataPoints
// updateChart(dataLength); 

// // update chart after specified time. 
// setInterval(function(){updateChart()}, updateInterval); 
