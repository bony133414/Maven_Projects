
$.ajaxSetup({
    complete: function(xhr, status) {
    			//status 0 to support IE
                if ((xhr.status == 307 || xhr.status == 0) && !$('#sessionExpiredModal').hasClass('in')) {
                	$('.modal').modal('hide');	
                	$('#sessionExpiredModal').modal('show');	
                }
                if (xhr.status == 500) {
                	window.location = 'opps';
                }
            }
        });

function setPreview(data, viewButton)
{

	  $('#docPreview').html('');
	  var  html = [];
	  var videoSource = getDocument+"?documentId="+data.documentId+"&documentHash="+data.documentHash+
		 "&isDownload=false";
	  
	  switch(data.type){
	    case 'video':
	  		{
				  html.push('<video width="100%" controls>');
				  html.push('<source src="'+videoSource+'" ');
				  html.push('type="'+data.mime+'">');
				  html.push('</video>');
				  viewButton.hide();
				 
	  		}
	  		break;
	    case 'audio':
	    	{
	    	  html.push('<audio  width="100%" controls>');
			  html.push('<source src="'+videoSource+'" ');
			  html.push('type="'+data.mime+'">');
			  html.push('</audio>');
			  viewButton.hide();
	    	}
	    	break;
	    default:
	    	{
	    	viewButton.show();
	    	}
	  }
	  
	  $('#docPreview').html(html.join(""));   
	  
}

function goBack()
{
	changeView("latestDocumentTab");
	return false;
}

