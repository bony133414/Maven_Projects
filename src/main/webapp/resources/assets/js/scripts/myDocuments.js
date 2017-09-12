$(function() {
	
	window.scrollTo(0,0);
	loadDocumentsReady();
	$('#myDocumentsPagination').hide();
});

function showList(){
	$( ".mailContainer" ).removeClass("hidden-xs");
	$( ".detailsContainer" ).addClass("hidden-xs");
}

function goMobileBack()
{
	if($('.mailContainer').hasClass('hidden-xs')) {
		showList();
	}
	else {
		changeView("latestDocumentTab");
	}
}
function selectMyDocument(div, documentHash)
{

	$( ".selectedMail" ).removeClass( "selectedMail");
	$(div).addClass("selectedMail");
	

	$( ".mailContainer" ).addClass("hidden-xs");
	$( ".detailsContainer" ).removeClass("hidden-xs");
	
	var posting = $.get(getDocumentDetails, 'documentHash='+documentHash, "json");
			
		  posting.done(function(data) {
			  
			  setMyDocumentMailItemDetails(data);

			  
		  });
		  posting.fail(function() {
		    //alert( "error" );
			  window.location = 'opps';
		  });
}

function setMyDocumentStatusView(statusId)
{
	switch(statusId)
	{
	case 1: {
		$('#myDocumentsAvalibleStatus').hide();
		$('#myDocumentsRequestStatus').show();
		$('#myDocumentsRequestedStatus').hide();
	}
	break;
	case 2: {
		$('#myDocumentsAvalibleStatus').hide();
		$('#myDocumentsRequestStatus').hide();
		$('#myDocumentsRequestedStatus').show();
	}
	break;
	case 3:
	default: {
		$('#myDocumentsAvalibleStatus').show();
		$('#myDocumentsRequestStatus').hide();
		$('#myDocumentsRequestedStatus').hide();
	}
	break;
	}
}
function setMyDocumentMailItemDetails(data)
{
	
	setMyDocumentStatusView(data.status);
	$('#myDocumentsDetailTitle').text(data.title);
	$('#myDocumentsDetailSubTitle').text(data.subTitle);
	$('#myDocumentsDocDetails').html('');
	 
	 var html = [];
	  for (var i in data.mailProperties)
	  {
		  html.push("<tr>");
		  html.push("<td><h5>"+i+'</h5></td>');
		  html.push("<td><h5>"+data.mailProperties[i]+'</h5></td>');
	  }
	  
	  $('#myDocumentsDocDetails').append(html.join(""));   

	  
	    if ( $( "#myDocumentsViewButton" ).length ) {
			  if (data.viewSupported)  
			  {
				  $( "#viewButtonImg" ).removeClass();
				  $( "#viewButtonImg" ).addClass(getButtonIconClass( data.type));
				  $( "#myDocumentsViewButton" ).show();
				  
				  $('#myDocumentsViewButton').off("click");
				  
				  $( "#myDocumentsViewButton" ).click(function() {
						 var output = "?documentId="+data.documentId+"&documentHash="+data.documentHash+
						 "&isDownload=false";
		
						 window.open(getDocument+output, '_blank', 'fullscreen=0');
					  	
					});
			  }
			  else
		      {
				  $( "#myDocumentsViewButton" ).hide();
		      }
				  
			
		  }
		  if ( $( "#myDocumentsDownloadButton" ).length ) {
			  
			  if (data.downloadSupported)
			  {
				  $( "#downloadButtonImg" ).removeClass();
				  $( "#downloadButtonImg" ).addClass(getButtonIconClass( data.type));
				  $('#myDocumentsDownloadButton').show();
				  $('#myDocumentsDownloadButton').off("click");
				  
				  $( "#myDocumentsDownloadButton" ).click(function() {
					 
						window.location.href = getDocument+"?documentId="+data.documentId+
											   "&documentHash="+data.documentHash+"&isDownload=true";
					});
			  }
			  else
		      {
				  $('#myDocumentsDownloadButton').hide();
		      }
		  }
	  if (data.status == 1)
	  {
		  $('#myDocumentsRequestButton').removeClass('active');
		  
		  $('#myDocumentsRequestButton').off("click");
		  
		  $( "#myDocumentsRequestButton" ).click(function() {
			  
			  var posting = $.get(requestArchiveDocument,'documentId='+data.documentId+'&documentHash='+data.documentHash, "json");
				posting.done(function(responseData) {
					
					setMyDocumentStatusView(responseData.statusId);
			});
		  });
	  }
	
	  $("#myDocumentsDetailsContainer").show();
	  setPreview(data, $( "#myDocumentsViewButton" ));
}

function loadDocumentsReady()
{
	var rows = 10;
	
	$('#myDocumentsPagination').twbsPagination({totalPages: 5 ,
	        visiblePages: 5});
	
	
	 $.ajax({
		  type: 'POST',
		  url: getMyDocumentPages,
		  data: 'rows='+rows,
		  success: function(data){

			  if(parseInt(data) == 0)
			  {
				  $('#myDocumentsPagination').twbsPagination('destroy');
				  $('#myDocumentsList').empty();
				  return;
				  
			  }

			  $('#myDocumentsPagination').show();
			  $('#myDocumentsPagination').twbsPagination('init',{
			        totalPages: parseInt(data) ,
			        visiblePages: 5,
			        onPageClick: function (event, page) {
			       	 $.ajax({
						  type: 'POST',
						  url: getMyDocuments,
						  data: 'page='+page+'&rows='+rows,
						  success: function(data){
							 // alert(JSON.stringify(data));
							  
							 $('#myDocumentsList').html(""); 
							  var html = [];
						
							  for (i = 0; i < data.rows.length; i++) { 
								  html.push('<li class="text-left"><div onclick="selectMyDocument(this,\''+data.rows[i].documentHash+'\')">');
								  html.push('<table style="width:100%">');
								  html.push('<table style="width:100%">');
								  html.push('<tr><td width="30px"><div class="mailCircle"></div></td>');
								  html.push('<td><a  href="#">'+data.rows[i].documentType+'</a></td>');
								  html.push('<td align="right"><img src="/digitalmailweb/assets/images/arrow_right_simple.png" alt="Logo" width="10px" height="15px"/>');
								  html.push(data.rows[i].localizedDateCreated);
								  html.push('</td></tr>');
//								  html.push('<tr><td></td><td colspan="3"  style="padding-top: 8px;">'+data.rows[i].description+'</td></tr>');
								  html.push('<tr><td></td><td colspan="3"  style="padding-top: 8px;">'+data.rows[i].documentId+'</td></tr>');
								  html.push('</table></div></li>');
							  }
							 
							  $('#myDocumentsList').append(html.join("")); 
						  },
			
						  
						  dataType: 'json'
					 });
			     }
			  });
		  }
	 });
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