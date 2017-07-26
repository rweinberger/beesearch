function push(num, sensor) {
  $.get("/push?num=" + num +"&sensor="+sensor, function() {
  })
}

$('#num').keypress(function(e){
  if(e.keyCode==13)
  $('#push').click();
});


$("#push").on("click", function() {
  var n = $('#num').val();
  var s = $('#sensors').val();
  // console.log(n, s);
  push(n, s);
  $('#num').val('')
})