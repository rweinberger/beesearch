$(document).ready(function(){
  fadeTime = 200;
  $('.hexagon').hover(function() {
    id = this.id.substring(3);
    $('#hex'+id).animate({opacity:1}, fadeTime);
    $('#text'+id).fadeIn()
  }, function() {
    id = this.id.substring(3);
    $('#hex'+id).animate({opacity:0.7}, fadeTime);
    $('#text'+id).fadeOut();
  })
});