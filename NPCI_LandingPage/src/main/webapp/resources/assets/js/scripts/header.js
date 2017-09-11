$(function() {

	 var langShort = $('#userLocale').text();
	
	 $(".userSettings").popover({
	        html : true, 
	        content: function() {
	          return $('.flyout').html();
	        }
	        
	    });
	 
	 $(".popover-dismiss").popover({
		 placement : 'bottom',
		 html: true, 
		  content: function() {
	          return $('#settingsHelp').html();
	        }
		
		 });
	 
	 
	 $("#settingsForm").on('submit', function(e){
		 e.preventDefault();
				 $.ajax({
					  type: 'POST',
					  url: $(this).attr('action'),
					  data: $(this).serialize(),
					  success: function(data){
						  
						  $("#settingsMessage").removeClass('alert alert-danger');
							$("#settingsMessage").addClass('alert alert-success');
							$("#settingsMessage").show();
						  
						  DisplayInDiv(
									$("#settingsMessage"),
									data);
					  },
					  error: function(data){
						  $("#settingsMessage").removeClass('alert alert-success');
						  $("#settingsMessage").addClass('alert alert-danger');
						  $("#settingsMessage").show();

						  DisplayInDiv(
									$("#settingsMessage"),data.responseText);
						}
				 });
		});
	 
	 $(document).on('click','.navbar-collapse.in',function(e) {
	
		        $(this).removeClass('in');
		});
	 
	  $('#changePasswordForm').on('submit', function(e){
	      e.preventDefault();
	  	var $form = $(this), 
		
		oldPassword = $form.find('input[name="oldPassword"]')
				.val(), newPassword = $form.find(
				'input[name="newPassword"]').val(), confirmPassword = $form
				.find('input[name="confirmPassword"]').val(), url = $form
				.attr('action');
		var posting = $.post(url, {
			oldPassword : oldPassword,
			newPassword : newPassword,
			confirmPassword : confirmPassword
		});
		posting.done(function(data) {
					$("#changePasswordResult").removeClass('alert alert-danger');
					$("#changePasswordResult").addClass('alert alert-success');
					$("#changePasswordResult").show();
				
					DisplayInDiv($("#changePasswordResult"),data);
					
				});
		posting.error(function(data){
			$("#changePasswordResult").removeClass('alert alert-success');
			$("#changePasswordResult").addClass('alert alert-danger');
			$("#changePasswordResult").show();
			if (data.status == '400')
			{
				
				DisplayInDiv(
						$("#changePasswordResult"),
						data.responseText);
			}
				
			if (data.status == '401')
				DisplayInDiv(
						$("#changePasswordResult"),
						data.responseText);
		});
	      
	    });
	
	
	  $("[name='notificationsEnable']").bootstrapSwitch();
	
});

$('input[name="notificationsEnable"]').on('switchChange.bootstrapSwitch', function(event, state) {
	
	if (state == false)
	{
		$('#channels').hide(500);
		$('#notificationBy').hide(500);
	}else{
		$('#channels').show(500);
		$('#notificationBy').show(500);
	}
	});

$('#changePasswordModal').on('hidden.bs.modal', function () {
	$("#changePasswordForm").find('input[name="oldPassword"]').val('');
	$("#changePasswordForm").find('input[name="confirmPassword"]').val('');
	$("#changePasswordForm").find('input[name="newPassword"]').val('');
	$("#changePasswordResult").hide();
})

$('#settingsModal').on('hidden.bs.modal', function () {
	
	$("#settingsMessage").hide();
})
