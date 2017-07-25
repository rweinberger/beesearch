function push(num) {
  $.get("/push?num=" + num, function() {
  })
}

$("#push").on("click", function() {
  var n = $('#num').val();
  console.log(n);
  push(n);
  $('#num').val('')
})