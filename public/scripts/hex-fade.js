$(document).ready(function(){
  var fadeTime = 200;
  var hexes = ['temperature', 'humidity', 'weight', 'bee counter', 'settings', 'about'];
  $('.hexagon').hover(function() {
    id = this.id.substring(3);
    text = hexes[parseInt(id)];
    $('#hex'+id).animate({opacity:0.5}, fadeTime);
    $('#hex-text').text(text);
    $('#hex-text').show()
  }, function() {
    id = this.id.substring(3);
    $('#hex'+id).animate({opacity:1}, fadeTime);
    $('#hex-text').hide();
  })
});