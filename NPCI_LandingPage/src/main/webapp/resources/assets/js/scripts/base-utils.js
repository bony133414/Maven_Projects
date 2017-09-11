//jQuery validator "require at least one field" custom action
/*jQuery.validator.addMethod("require_from_group", function(value, element,
		options) {
	var numberRequired = options[0];
	var selector = options[1];
	// Look for our selector within the parent form
	var validOrNot = $(selector, element.form).filter(function() {
		// Each field is kept if it has a value
		return $(this).val();
		// Set to true if there are enough, else to false
	}).length >= numberRequired;

	if (!$(element).data('being_validated')) {
		var fields = $(selector, element.form);
		fields.data('being_validated', true);
		// .valid() means "validate using all applicable rules" (which
		// includes this one)
		fields.valid();
		fields.data('being_validated', false);
	}
	return validOrNot;
	// {0} below is the 0th item in the options field
}, jQuery.format(" Please fill out at least {0} of these fields."));*/

// stop form from submitting normally
function PreventEventDefault(event) {
	if (event.preventDefault)
		event.preventDefault();/* stop form from submitting normally */
}

// Clear a form
function ClearForm($form) {
	$form.find('input:text, input:password, input:file, select, textarea').val(
			'');
	$form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr(
			'selected');
}

// Clear a Div
function ClearDiv(div) {
	div.html("");
}

// Display a message in a div
function DisplayInDiv(div, message) {
	ClearDiv(div);
	div.html(message);
}

// Setup the effect to display for a dialog
function SetDialogEffect(effectName, effectDuration) {
	return {
		effect : effectName,
		duration : effectDuration
	};
}

// Display a Dialog given it's HTML DIV, height and width.
function DisplayModalDialog(dialogDiv, height, width) {
	$(dialogDiv).dialog({
		height : height,
		width : width,
		modal : true,
		resizable : false,
		show : SetDialogEffect("blind", 300),
		hide : SetDialogEffect("clip", 300),
		close : function(event, ui) {
			$(this).dialog("destroy");
		},
		position : [ 'middle', 140 ]
	});
}
/*
function DisplayComboBox(ComboBoxControl) {
	ComboBoxControl.combobox();
	$("#toggle").click(function() {
		ComboBoxControl.toggle();
	});
}

// Setup the Combo box
(function($) {
	$
			.widget(
					"ui.combobox",
					{
						_create : function() {
							var input, that = this, wasOpen = false, select = this.element
									.hide(), selected = select
									.children(":selected"), value = selected
									.val() ? selected.text() : "", wrapper = this.wrapper = $(
									"<span>").addClass("ui-combobox")
									.insertAfter(select);

							function removeIfInvalid(element) {
								var value = $(element).val(), matcher = new RegExp(
										"^"
												+ $.ui.autocomplete
														.escapeRegex(value)
												+ "$", "i"), valid = false;
								select.children("option").each(function() {
									if ($(this).text().match(matcher)) {
										this.selected = valid = true;
										return false;
									}
								});

								if (!valid) {
									// remove invalid value, as it didn't match
									// anything
									$(element).val("").attr("title",
											value + " didn't match any item")
											.tooltip("open");
									select.val("");
									setTimeout(function() {
										input.tooltip("close")
												.attr("title", "");
									}, 2500);
									input.data("ui-autocomplete").term = "";
								}
							}

							input = $("<input>")
									.appendTo(wrapper)
									.val(value)
									.attr("title", "")
									.addClass(
											"ui-state-default ui-combobox-input")
									.autocomplete(
											{
												delay : 0,
												minLength : 0,
												source : function(request,
														response) {
													var matcher = new RegExp(
															$.ui.autocomplete
																	.escapeRegex(request.term),
															"i");
													response(select
															.children("option")
															.map(
																	function() {
																		var text = $(
																				this)
																				.text();
																		if (this.value
																				&& (!request.term || matcher
																						.test(text)))
																			return {
																				label : text
																						.replace(
																								new RegExp(
																										"(?![^&;]+;)(?!<[^<>]*)("
																												+ $.ui.autocomplete
																														.escapeRegex(request.term)
																												+ ")(?![^<>]*>)(?![^&;]+;)",
																										"gi"),
																								"<strong>$1</strong>"),
																				value : text,
																				option : this
																			};
																	}));
												},
												select : function(event, ui) {
													ui.item.option.selected = true;
													that
															._trigger(
																	"selected",
																	event,
																	{
																		item : ui.item.option
																	});
												},
												change : function(event, ui) {
													if (!ui.item) {
														removeIfInvalid(this);
													}
												}
											})
									.addClass(
											"ui-widget ui-widget-content ui-corner-left");

							input.data("ui-autocomplete")._renderItem = function(
									ul, item) {
								return $("<li>").append(
										"<a>" + item.label + "</a>").appendTo(
										ul);
							};

							$("<a>").attr("tabIndex", -1).attr("title",
									"Show All Items").tooltip().appendTo(
									wrapper).button({
								icons : {
									primary : "ui-icon-triangle-1-s"
								},
								text : false
							}).removeClass("ui-corner-all").addClass(
									"ui-corner-right ui-combobox-toggle")
									.mousedown(
											function() {
												wasOpen = input.autocomplete(
														"widget")
														.is(":visible");
											}).click(function() {
										input.focus();

										// close if already visible
										if (wasOpen) {
											return;
										}
										// pass empty string as value to search
										// for, displaying all results
										input.autocomplete("search", "");
									});

							input.tooltip({
								tooltipClass : "ui-state-highlight"
							});
						},

						_destroy : function() {
							this.wrapper.remove();
							this.element.show();
						}
					});
})(jQuery);
*/
function HideProgressAnimation() {
	var submittingDialog = $("#submittingDialog");
	// Try to close and distroy the dialog only if open.
	if (submittingDialog != null && submittingDialog.dialog("isOpen")) {
		submittingDialog.dialog("close");
		submittingDialog.dialog("destroy");
	}
}

function ShowProgressAnimation() {
	var submittingDialog = $("#submittingDialog");
	submittingDialog.dialog({
		modal : true,
		width : 200,
		height : 55,
		dialogClass : 'noTitleBar',
	});
}

// Check for internet connection
function IsConnectedToTheInternet() {
	var s = $.ajax({
		type : "HEAD",
		url : window.location.href.split("?")[0] + "?" + Math.random(),
		async : false
	}).status;
	// thx
	// http://www.louisremi.com/2011/04/22/navigator-online-alternative-serverreachable/
	return s >= 200 && s < 300 || s === 304;
}

function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)? (\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}


function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
