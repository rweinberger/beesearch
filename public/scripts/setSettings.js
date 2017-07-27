function set(temp, hum, wt, bee) {
  $.get("/set?temp="+temp+"&hum="+hum+"&wt="+wt+"&bee="+bee, function() {
  })
}

$("#setPrefs").on("click", function() {
  var t = $('#tempSet').val();
  var h = $('#humSet').val();
  var w = $('#wtSet').val();
  var b = $('#beeSet').val();
  set(t, h, w, b);
  $('.setInput').val('')
})