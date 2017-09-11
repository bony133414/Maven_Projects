//Setup the Login page scripts
/*
/$(document).ready(function () {
    //Submit event handler for the login form
    $("#loginForm").submit(function (event) {
    	PreventEventDefault(event);
        var url = $("#loginForm").attr('action');
        var form_data = {
            username: $("#loginForm").find('input[name="j_username"]').val(),
            password: $("#loginForm").find('input[name="j_password"]').val(),
        };
        ShowProgressAnimation();
        var posting = $.post(url, form_data, "json");
        posting.done(function (data) {
            HideProgressAnimation();
            if (data.Status === "success") window.location.replace(data.URL);
            else DisplayMessage($("#errorblock"), "<p class='error'>Invalid username and/or password.</p>");
        });
    });
*/

$(function() {
	if (!!document.getElementById("dd"))
	{
		var dd = new DropDown( $('#dd') );

		$(document).click(function() {
			$('.lang-dropdown').removeClass('active');
		});

	}
	
	
	 $('#loginForm').on('submit', function(e){
	        e.preventDefault();
	  	    var $form = $(this);
			var username = $form.find('input[name="j_username"]').val();
		  	var password = $form.find('input[name="j_password"]').val();
		  	//TODO - fix to work with desire login
		  	var emailRegex = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
		  	if (!emailRegex.test(username))
		  		window.location = 'loginfailed';

		  	var url = url = $form.attr('action');
			var posting = $.post(url, {
				j_username : username,
				j_password : password,
			});
			posting
			.done(function(data) {
				console.log("success"+data)
				var newDoc = document.open("text/html", "replace");
				newDoc.write(data);
				newDoc.close();
				
			});
			posting.error(function(data){
				console.log("error"+data)
				window.location = 'loginfailed';
				
			});
			
	    });
	
});


$('#ForgotPasswordButton').click(function () {
	$("#ForgotPasswordForm").submit();
});

$('#ForgotPasswordModal').on('hidden.bs.modal', function () {
	
	$("#ForgotPasswordResult").hide();
	$("#ForgotPasswordButton").removeClass('active');
})
$('#ForgotPasswordModal').on('show.bs.modal', function () {
	console.log("startForgotPasswordModal show.bs.modal")
	$("#ForgotPasswordResult").hide();
	$("#ForgotPasswordFormGroup").show();
	$("#ForgotPasswordButton").show();
	$("#ForgotPasswordTextInfo").show();
	console.log("endForgotUsernameButton show.bs.modal")
	
})
//Display the forgot password dialog in response to the "Forgot password" link click
/*$("#ForgotPasswordLink").click(function() {
	DisplayModalDialog("#ForgotPasswordDialog", 300, 450);
});*/

$("#ForgotPasswordForm").validate({
	errorLabelContainer : $("#ForgotPasswordErrors"),
	rules : {
		userName : {
			required : true
		},
	},
	messages : {
		userName : "The user name is required",
	}
});
//Forgot password form submit event handler
$("#ForgotPasswordForm")
		.submit(
				function(event) {
					PreventEventDefault(event);
					if ($(this).valid()) {
						var $form = $(this), /* get some values from elements on the page: */
						userName = $form.find('input[name="userName"]').val(), url = $form
								.attr('action');

						var posting = $.post(url, {
							userName : userName
						});
						posting.done(function(data) {
							console.log("success")
							$("#ForgotPasswordFormGroup").hide();
							$("#ForgotPasswordButton").hide();
							$("#ForgotPasswordTextInfo").hide()
							$("#ForgotPasswordResult").addClass('alert alert-success');
							$("#ForgotPasswordResult").show();
							DisplayInDiv(
												$("#ForgotPasswordResult"),
												data);
							console.log("successend")
									
								});
						posting.error(function(data){
						
							$("#ForgotPasswordResult").addClass('alert alert-danger');
							$("#ForgotPasswordResult").show();
								
								DisplayInDiv($("#ForgotPasswordResult"),data.responseText);
						});
					}
				});
$('#ForgotUsernameButton').click(function () {
	console.log("ForgotUsernameButton")
	$("#ForgotUsernameForm").submit();
});

$('#ForgotUsernameModal').on('hidden.bs.modal', function () {
	console.log("ForgotUsernameButton")
	$("#ForgotUsernameResult").hide();

	$("#ForgotUsernameButton").removeClass('active');
})

$('#ForgotUsernameModal').on('show.bs.modal', function () {
	console.log("startForgotUsernameButton show.bs.modal")
	$("#ForgotUsernameResult").hide();
	$("#forgotUsernameFormGroup").show();
	$("#ForgotUsernameButton").show();
	$("#forgotUsernameTextInfo").show();
	console.log("endForgotUsernameButton show.bs.modal")
	
})

$("#ForgotUsernameForm").validate({
	errorLabelContainer : $("#ForgotUsernameErrors"),
	rules : {
		emailID : {
			required : true,
			email: true
		},
	},
	messages : {
		emailID : "Please enter a valid email address",
	}
});
//Forgot password form submit event handler
$("#ForgotUsernameForm")
		.submit(
				function(event) {
					console.log("ForgotUsernameFormsubmit")
					PreventEventDefault(event);
					if ($(this).valid()) {
						//console.log("ForgotUsernameFormsubmit111111111111")
						var $form = $(this), /* get some values from elements on the page: */
						emailID = $form.find('input[name="emailID"]').val(), url = $form
								.attr('action');
					//	console.log("ForgotUsernameFormsubmit22222222222")
						var posting = $.post(url, {
							emailID : emailID
						});
						posting.done(function(data) {
							console.log("success")
							
							$("#forgotUsernameFormGroup").hide();
							$("#ForgotUsernameButton").hide();
							$("#forgotUsernameTextInfo").hide();
							$("#ForgotUsernameResult").addClass('alert alert-success');
							$("#ForgotUsernameResult").show();
										DisplayInDiv(
												$("#ForgotUsernameResult"),
												data);
										console.log("success end")
								});
						posting.error(function(data){
							console.log("error")
						
							$("#ForgotUsernameResult").addClass('alert alert-danger');
							$("#ForgotUsernameResult").show();
								
								DisplayInDiv($("#ForgotUsernameResult"),data.responseText);
						});
					}
				});


function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;
 
        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
           
            return false;
        });
 
        obj.opts.on('click',function(){
            var opt = $(this);
            var langKey = opt.find('a').attr('href');
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            window.location.replace("\changeLanguage?languageId="+langKey);
        });
    },
    getValue : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    }
}