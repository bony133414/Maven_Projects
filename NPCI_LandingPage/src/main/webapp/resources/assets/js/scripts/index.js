	var containerId = "#pageContainer";

$(function() {
	
	/*$( "#dmApps").selectable({
    stop: function() {
      $( ".ui-selected" ).each(function() {
    	  	 
	          loadTab($(this).children());
      });
    }
  })*/
  
  /*$('#dmApps li:first').addClass('ui-selected');
	$(containerId).load('main'); */
  
  //location.replace("test")
});


function loadTab(tabObj){
    if(!tabObj || !tabObj.length){ return; }
    
    $(containerId).fadeOut(200);
    $(containerId).load(tabObj.attr('href'));
    $(containerId).fadeIn(200);
    
}