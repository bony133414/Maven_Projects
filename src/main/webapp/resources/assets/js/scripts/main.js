$(function() {
	$.ajaxSetup({ cache: false });
	setActive("#latestDocumentTab");
	changeView("latestDocumentTab");

	
});

function setActive(source){
	$(".hp-nav li a").removeClass("activeMenu");
	$(source).addClass('activeMenu');
}

function changeView(source){
	setActive("#"+source);
	if (source == 'documentAuditTab')
	{
		source = 'documentAudit/documentAuditTab';
	}
		
	
	$( "#mainContent" ).load( source, function( response, status, xhr ) {
		
		  if (xhr.status == 307 && !$('#sessionExpiredModal').hasClass('in')) {
          	//$('.modal').modal('hide');	
          	$('#sessionExpiredModal').modal('show');	
          }
		});

}


function goToSearch()
{
	changeView("searchTab");
	
}

function showMyDocuments()
{
	changeView("myDocumentsTab");
	
}

function showSummary(documentTypeKey,documentTypeName)
{
	$( "#mainContent" ).load( "summaryTab", { 'documentTypeKey': documentTypeKey, 'documentTypeName' : documentTypeName }, 
			function(response, status, xhr ) {
	
		  if (xhr.status == 307 && !$('#sessionExpiredModal').hasClass('in')) {
          	//$('.modal').modal('hide');	
          	$('#sessionExpiredModal').modal('show');	
          }
	});
	
	
}