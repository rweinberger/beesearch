if (!!window.EventSource) {
  var source = new EventSource('/stream')

  source.addEventListener('message', function(e) {
    nums = JSON.parse(e.data)
    $("#nums").text("Push: " + votes.push + ", Pull: " + votes.pull)
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