function push(temp, hum, wt) {
  $.get("/push?temp=" + temp + "&hum=" + hum +"&wt=" + wt, function() {
  })
}

$('.num').keypress(function(e){
  if(e.keyCode==13)
  $('#push').click();
});


$("#push").on("click", function() {
  var t = $('#tempInput').val();
  var h = $('#humInput').val();
  var w = $('#wtInput').val();
  // console.log(n, s);
  console.log(t,h,w);
  push(t,h,w);
  $('.num').val('')
})