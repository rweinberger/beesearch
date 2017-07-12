$(document).ready(function(){
  fadeTime = 200;
  $('.hexagon').hover(function() {
    id = this.id.substring(3);
    $('#hex'+id).animate({opacity:1}, fadeTime);
    $('#img'+id).fadeOut();
    $('#text'+id).fadeIn()
  }, function() {
    id = this.id.substring(3);
    $('#hex'+id).animate({opacity:0.7}, fadeTime);
    $('#text'+id).fadeOut();
    $('#img'+id).fadeIn()
  })
});