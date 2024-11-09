var jsevents = jsevents || {};
jQuery(function($){
  jsevents.smartRollover();
});

//smartRollover
jsevents.smartRollover = function() {
  $('[src*="_off."]').each(function() {
    var srcOff = $(this).attr('src');
    var srcOn = srcOff.replace(/_off./, '_on.');
    $(this).mouseover(function(){
      $(this).attr('src', srcOn);
    }).mouseout(function(){
      $(this).attr('src', srcOff);
    }).each(function(init){
      $("<img>").attr('src', srcOn);
    });
  });
};
