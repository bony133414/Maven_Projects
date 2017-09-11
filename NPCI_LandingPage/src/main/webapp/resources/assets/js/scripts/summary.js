$(document).ready(function() {
	 $( "#viewButtonNotSupported" ).hide();
});
$(function() {
	window.scrollTo(0,0);
});


function goMobileBack(){
	if($('.mailContainer').hasClass('hidden-xs')) {
		showList();
	}
	else {
		goBack();
	}
}

function showList(){
	$( ".mailContainer" ).removeClass("hidden-xs");
	$( ".detailsContainer" ).addClass("hidden-xs");
}

function isMobile() {
	return true;
	 try {
	    if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
	     return true;
	    };
	    return false;
	 } catch(e){  return false; }
}

function select(div,documentHash)
{
	window.scrollTo(0,0);
	$( ".selectedMail" ).removeClass( "selectedMail");
	$(div).addClass("selectedMail");
	
	
		$( ".mailContainer" ).addClass("hidden-xs");
		$( ".detailsContainer" ).removeClass("hidden-xs");
	
	
	var posting = $.get(getDocumentDetails,'documentHash='+documentHash, "json");
			
	  posting.done(function(data) {
		  setMailItemDetails(data);
		  $('#detailsContainer').show();
		  
	  });
	  posting.fail(function() {
		  window.location = 'opps';
	  });
}

function setMailItemDetails(data)
{
	
	$('#detailTitle').text(data.title);
	$('#detailSubTitle').text(data.subTitle);
	$('#docDetails').html('');
	 
	 var html = [];
	  for (var i in data.mailProperties)
	  {
		  html.push("<tr>");
		  html.push("<td><h5>"+i+'</h5></td>');
		  html.push("<td><h5>"+data.mailProperties[i]+'</h5></td>');
	  }
	  
	  $('#docDetails').append(html.join(""));   
	  
	
	  if ( $( "#viewButton" ).length ) {
		  
		  if (data.viewSupported)  
		  {
			  $( "#viewButtonNotSupported" ).hide();
			  $( "#viewButtonImg" ).removeClass();
			  $( "#viewButtonImg" ).addClass(getButtonIconClass( data.type));
			  
			  $( "#viewButton" ).show();
			  
			  $('#viewButton').off("click");
			  
			  $( "#viewButton" ).click(function() {
				  	 var output = "?documentId="+data.documentId+"&documentHash="+data.documentHash+
								 "&isDownload=false";
				
				  	window.open(getDocument+output, '_blank', 'resizable=1,fullscreen=0');
				  	
				});
		  }
		  else
	      {
			  $( "#viewButtonNotSupported" ).show();
			  $( "#viewButton" ).hide();
	      }
			  
		
	  }
	  if ( $( "#downloadButton" ).length ) {
		
		  if (data.downloadSupported)
		  {
			  $( "#downloadButtonImg" ).removeClass();
			  $( "#downloadButtonImg" ).addClass(getButtonIconClass( data.type));
			  $('#downloadButton').show();
			  $('#downloadButton').off("click");
			  
			  $( "#downloadButton" ).click(function() {
				 
					window.location.href = getDocument+"?documentId="+data.documentId+
										   "&documentHash="+data.documentHash+"&isDownload=true";
				});
		  }
		  else
	      {
			  $('#downloadButton').hide();
	      }
		
	  }
	  
	  if (data.viewSupported)  
	  {
		  setPreview(data, $( "#viewButton" ));
	  }
}




function getButtonIconClass(type)
{
	switch(type)
	{
		case 'audio': return 'glyphicon glyphicon-music';
		case 'video': return 'glyphicon glyphicon-facetime-video';
		default: return 'glyphicon glyphicon-file';
	}
}