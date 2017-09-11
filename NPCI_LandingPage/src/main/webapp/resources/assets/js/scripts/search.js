$(document).ready(function() {
	 $( "#searchViewButton" ).show().hide();
	 $( "#searchViewButton" ).hide();
	 $( "#viewButtonNotSupported" ).hide();
	 
	 $("input").keypress(function (e) {
		 
		 	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	        	 $( "#search" ).trigger( "click" );
	            return false;
	        } else {
	            return true;
	        }
	    });
	
	 $("select").keypress(function (e) {
		 
		 	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	        	 $( "#search" ).trigger( "click" );
	            return false;
	        } else {
	            return true;
	        }
	    });

} );

$(function() {
	 var langShort = $('#userLocale').text();

	 if ($(".datepicker").length > 0)
	 {
		  var datepicker = $.fn.datepicker.noConflict();
		  $.fn.bootstrapDP = datepicker;  
		  $('.datepicker').bootstrapDP({language: langShort});
	 }
	
	 $('#collapseSearch').tooltip();
	 $('#searchPagination').hide();
	 /*$('#searchPagination').twbsPagination({totalPages: 5 ,
	        visiblePages: 5});*/
	 
});

var searchState = 0;
function goMobileBack()
{
	switch (searchState) {
	case 0:
		goBack();
		break;
	case 1:
		$( "#searchFormDiv" ).removeClass("hidden-xs");
	
		 $( "#searchResultContainer" ).addClass("hidden-xs");
		 $( "#searchDetailsContainer" ).addClass("hidden-xs");
		 $( "#searchDetailsContainer" ).hide();
		 showSearchForm();
		 searchState = 0;
		break;
	case 2:
		 $( "#searchResultContainer" ).addClass("searchResultContainerLeft");
		 $( "#searchResultContainer" ).removeClass("hidden-xs");
		 $( "#searchDetailsContainer" ).addClass("hidden-xs");
		 searchState = 1;
		break;
	default:
		break;
	}
	
}

$('#search').click(function () {
	 var btn = $(this);
	 if(isValidSearchField())
		{
		 	btn.button('loading');
			searchState = 1;
		    $('#searchInTrimForm').submit();
		    
			$( "#searchFormDiv" ).addClass("hidden-xs");
			 $( "#searchResultContainer" ).removeClass("hidden-xs");
		}
		else
		 {
			$('#searchInTrimForm').submit();
		 }
});

//Search Form submit event handler.
$("#searchInTrimForm").submit(function(event) {
	event.preventDefault();
	
	if(isValidSearchField())
		{
			$("#error_msg").html("");
			$("#error_msg_fromDate").html("");
			$("#error_msg_toDate").html("");
			$("#error_msg_soldTo").html("");
			$("#error_msg_merchantId").html("");
			$("#error_msg_shipTo").html("");
			
			PostSearch();
			window.scrollTo(0,0);
//			 $( "#searchResultContainer" ).removeClass("searchResultContainerLeft");
//			 $( "#searchResultContainer" ).reClass("hidden-xs");
			$("#contentList").show();
		}
		else
		{
			$("#error_msg").html(selectC);
			$("#contentList").empty();
			$("#contentList").hide();
			$('#searchPagination').hide();
			$('#notFoundDiv').hide();
		}
});

function isValidSearchField()
{
	var soldTo=$('#soldTo');
	var documentNo=$('#documentNo');
	var merchantId=$('#merchantId');
	var shipTo=$('#shipTo');
	var fromDate=$('#fromDate');
	var toDate=$('#toDate');
	var numberReg = /^[a-zA-Z0-9]+$/;
//	var dateReg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
	var dateReg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	var sDate = new Date(fromDate.val());
	var eDate = new Date(toDate.val());
	var isFdLessThanTd = fromDate.val() == "" ||  toDate.val() == "" || sDate <= eDate;
    var isValid = (soldTo.val() == "" || numberReg.test(soldTo.val())) 
    						&& (merchantId.val() == "" || numberReg.test(merchantId.val())) && (shipTo.val() == "" || numberReg.test(shipTo.val()));
    //alert("isValid"+isValid);
    var isDateValid = (fromDate.val() == "" || dateReg.test(fromDate.val())) && (toDate.val() == "" || dateReg.test(toDate.val()));
    //alert("isDateValid"+isDateValid);
    
	if(toDate.val() != "" && !dateReg.test(toDate.val()))
	{
    	$("#error_msg_toDate").html("*");
	}
	
	
    if(fromDate.val() != "" && !dateReg.test(fromDate.val()))
	{
		$("#error_msg_fromDate").html("*");
	}
    
    if(isDateValid && !isFdLessThanTd)
	{
    	$("#error_msg_fromDate").html("*");
    	$("#error_msg_toDate").html("*");
	}
    
    if(isFdLessThanTd && isDateValid)
    {
    	$("#error_msg_fromDate").html("");
    	$("#error_msg_toDate").html("");
    }
    
	if(soldTo.val() != "" && !numberReg.test(soldTo.val()))
	{
		$("#error_msg_soldTo").html("*");
	}
	else
	{
		$("#error_msg_soldTo").html("");
	}
	
	if(merchantId.val() != "" && !numberReg.test(merchantId.val()))
	{
		$("#error_msg_merchantId").html("*");
	}
	else
	{
		$("#error_msg_merchantId").html("");
	}
	
	
	if(shipTo.val() != "" && !numberReg.test(shipTo.val()))
	{
		$("#error_msg_shipTo").html("*");
	}
	else
	{
		$("#error_msg_shipTo").html("");
	}
    		
    if(isFieldsNull()){return false;}
    else if(isValid&&isDateValid && isFdLessThanTd){return true;}
    else{return false;}
}

function isFieldsNull()
{
	
	var soldTo=$('#soldTo');
	var documentNo=$('#documentNo');
	var merchantId=$('#merchantId');
	var shipTo=$('#shipTo');
	var fromDate=$('#fromDate');
	var toDate=$('#toDate');
	if((soldTo.val() == "" || soldTo.val() == null) && (documentNo.val() == "" || documentNo.val() == null) 
			&& (merchantId.val() == "" || merchantId.val() == null)
			&& (shipTo.val() == "" || shipTo.val() == null)
			&& (fromDate.val() == "" || fromDate.val() == null)
			&& (toDate.val() == "" || toDate.val() == null)
//			&& $('#Country :selected').val() == 0
			&& $('#documentCategory :selected').val() == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function showSearchForm()
{
	searchState = 0;
	$('#collapseSearch').hide();

	$( "#searchFormDiv" ).show();
	$( "#searchFormDiv" ).removeClass("hidden-xs");
	 $( "#searchResultContainer" ).removeClass("searchResultContainerLeft");
	
	
	$( "#searchDetailsContainer" ).hide();	
		$( ".selectedMail" ).removeClass( "selectedMail");
}

function selectSearch(div,documentHash)
{

	$( ".selectedMail" ).removeClass( "selectedMail");
	$(div).addClass("selectedMail");
	
	$('#collapseSearch').show();
	$( "#searchFormDiv" ).hide();
	
//	 $( "#searchDetailsContainer" ).show();	
//	 $( "#searchDetailsContainer" ).removeClass("hidden-xs");
	 $( "#searchResultContainer" ).addClass("searchResultContainerLeft");
	 $( "#searchResultContainer" ).addClass("hidden-xs");
	 window.scrollTo(0,0);
	var posting = $.get(getDocumentDetails, 'documentHash='+documentHash, "json");
			
		  posting.done(function(data) {
			
			  setSearchMailItemDetails(data);
			  $('#searchDetailsContainer').show();
			  
		  });
		  posting.fail(function() {
			  window.location = 'opps';
		  });
}

function documentCategoryChanged()
{
	var documentCategoryId = $('#documentCategory :selected').val();
	$('#documentTypeSearch option[value]').each(function() {
	    if( $(this).attr("value") > 0 ) { $(this).remove(); };
	});
	if (documentCategoryId == 0)
	{
		
		
		$("#docTypeOption").hide();
		return;
	}
	
	var posting = $.get(getDocumentType, 'documentCategory='+documentCategoryId ,"json");
	posting.done(function(responseData) {
		if (responseData != null && responseData.length >= 1) {
			
			var options = $("#documentTypeSearch");
			$.each(responseData, function() {
			    options.append($("<option />").val(this.key).text(this.value));
			});
			
		
			$("#docTypeOption").show();
			
		}
	});
	
}

function getNumberOfRowsByScreen()
{
	var rows;
	
	switch(screen.height)
	{
		case 900: return 8;
		case 1024: return 10;
		default: return 5;
	
	};
}
function setSearchStatusView(statusId)
{
	switch(statusId)
	{
	case 1: {
		$('#searchAvalibleStatus').hide();
		$('#searchRequestStatus').show();
		$('#searchRequestedStatus').hide();
	}
	break;
	case 2: {
		$('#searchAvalibleStatus').hide();
		$('#searchRequestStatus').hide();
		$('#searchRequestedStatus').show();
	}
	break;
	case 3:
	default: {
		$('#searchAvalibleStatus').show();
		$('#searchRequestStatus').hide();
		$('#searchRequestedStatus').hide();
	}
	break;
	}
}
function setSearchMailItemDetails(data)
{
	searchState = 2;
	setSearchStatusView(data.status);
//	$( "#searchDetailsContainer" ).show();	
//	 $( "#searchDetailsContainer" ).removeClass("hidden-xs");
	$( "#searchDetailsContainer" ).hide();
	$( "#searchDetailsContainer" ).addClass("hidden-xs");
	$('#searchDetailTitle').text(data.title);
	$('#searchDetailSubTitle').text(data.subTitle);
	$('#searchDocDetails').html('');
	 
	 var html = [];
	  for (var i in data.mailProperties)
	  {
		  html.push("<tr>");
		  html.push("<td><h5>"+i+'</h5></td>');
		  html.push("<td><h5>"+data.mailProperties[i]+'</h5></td>');
	  }
	  
	  $('#searchDocDetails').append(html.join(""));   
	  
	    if ( $( "#searchViewButton" ).length ) {
			  if (data.viewSupported)  
			  {
				  $( "#viewButtonNotSupported" ).hide();
				  $( "#viewButtonImg" ).removeClass();
				  $( "#viewButtonImg" ).addClass(getButtonIconClass( data.type));
				  $( "#searchViewButton" ).show();
				  
				  $('#searchViewButton').off("click");
				  
				  $( "#searchViewButton" ).click(function() {
					  	
						 var output = "?documentId="+data.documentId+"&documentHash="+data.documentHash+
						 "&isDownload=false";
		
						 window.open(getDocument+output, '_blank', 'resizable=1,fullscreen=0');
					  	
					});
			  }
			  else
		      {
				  $( "#viewButtonNotSupported" ).show();
				  $( "#searchViewButton" ).hide();
		      }
				  
			
		  }
		  if ( $( "#searchDownloadButton" ).length ) {
			  
			  if (data.downloadSupported)
			  {
				  $( "#downloadButtonImg" ).removeClass();
				  $( "#downloadButtonImg" ).addClass(getButtonIconClass( data.type));
				  $('#searchDownloadButton').show();
				  $('#searchDownloadButton').off("click");
				  
				  $( "#searchDownloadButton" ).click(function() {
					 
						window.location.href = getDocument+"?documentId="+data.documentId+
											   "&documentHash="+data.documentHash+"&isDownload=true";
					});
			  }
			  else
		      {
				  $('#searchDownloadButton').hide();
		      }
		  }
	  
	  if (data.status == 1)
	  {
		  $( "#requestButtonImg" ).removeClass();
		  $( "#requestButtonImg" ).addClass(getButtonIconClass( data.type));
		  $('#searchRequestButton').removeClass('active');
		  
		  $('#searchRequestButton').off("click");
		  
		  $( "#searchRequestButton" ).click(function() {
			 
			  var posting = $.get(requestArchiveDocument,'documentId='+data.documentId+'&documentHash='+data.documentHash, "json");
				posting.done(function(responseData) {
					
					setSearchStatusView(responseData.statusId);
			});
		  });
	  }
	  $( "#searchDetailsContainer" ).show();	
		 $( "#searchDetailsContainer" ).removeClass("hidden-xs");
		 if (data.viewSupported)
		 {
			 setPreview(data, $( "#searchViewButton" ));
		 }
	 
}

function PostSearch() {
	var rows = 10;
	$("#contentList").empty();
	if($('#searchPagination').html().length == 0)
	 {
		$('#searchPagination').twbsPagination({totalPages: 5 ,
	        visiblePages: 5});
	 }
	 else 
	 {
		 $('#searchPagination').twbsPagination('destroy');
	 }
	
		 $.ajax({
			  type: 'POST',
			  url: getNumberOfPages,
			  data: $('#searchInTrimForm').serialize()+'&rows='+rows,
			  success: function(data){
	
				  if(parseInt(data) == 0)
				  {
					  $('#notFoundDiv').show();
					  $('#searchPagination').twbsPagination('destroy');
					  $('#contentList').empty();
					  $('#search').button('reset');
					  return;
					  
				  }
				  $('#notFoundDiv').hide();
				  $('#searchPagination').show();
				  $('#searchPagination').twbsPagination('init',{
				        totalPages: parseInt(data) ,
				        visiblePages: 5,
				        onPageClick: function (event, page) {
				       	 $.ajax({
							  type: 'POST',
							  url: getDocumentList,
							  data: $('#searchInTrimForm').serialize()+'&page='+page+'&rows='+rows,
							  success: function(data){
						
								  
								 $('#contentList').html(""); 
								  var html = [];
							
								  for (i = 0; i < data.rows.length; i++) { 
									  html.push('<li class="text-left"><div onclick="selectSearch(this,\''+data.rows[i].documentHash+'\')">');
									  html.push('<table style="width:100%">');
									  html.push('<table style="width:100%">');
									  html.push('<tr><td width="30px"><div class="mailCircle"></div></td>');
									  html.push('<td><a  href="#">'+data.rows[i].documentType+'</a></td>');
									  html.push('<td align="right"><img src="/digitalmailweb/assets/images/arrow_right_simple.png" alt="Logo" width="10px" height="15px"/>');
									  html.push(data.rows[i].localizedDateCreated);
									  html.push('</td></tr>');
//									  html.push('<tr><td></td><td colspan="3"  style="padding-top: 8px;">'+data.rows[i].description+'</td></tr>');
									  html.push('<tr><td></td><td colspan="3"  style="padding-top: 8px;">'+data.rows[i].documentId+'</td></tr>');
									  html.push('</table></div></li>');
								  }
								 
								  $('#contentList').append(html.join("")); 
								  $('#search').button('reset');
								  
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
