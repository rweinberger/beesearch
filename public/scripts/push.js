function push(temp, hum, wt, bee) {
  $.get("/push?temp=" + temp + "&hum=" + hum +"&wt=" + wt + "&bee=" + bee, function() {
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
  var b = $('#beeInput').val();
  // console.log(n, s);
  console.log(t,h,w,b);
  push(t,h,w,b);
  $('.num').val('')
})