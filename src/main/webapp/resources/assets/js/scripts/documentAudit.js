
$('#search').click(function () {
    //var btn = $(this);
  //  btn.button('loading');
    $('#documentAuditTable').hide();
    $('#documentAuditForm').submit();

});

$(document).ready(function() {

    $('#documentAuditTable').hide();
    $('#noData').hide();
    $('#documentAuditForm').validate(

        {
            rules: {
                documentID: {

                    required: true
                  //  documentID:true
                }
            },
            messages: {
                documentID: "Please enter a valid Document ID "
            },


        highlight: function(element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
            $('#documentAuditTable').hide();
            $('#noData').hide();
    },
    success: function(element) {
        element
            .closest('.control-group').removeClass('error').addClass('success');
    },

   submitHandler: function(form) {

            var documentID = $('#documentID').val();
            var json = { "documentID": documentID};
            console.log('inside submitHandler');
            var isFormValid = $("#documentAuditForm").valid();
            console.log('after form validate');
              $.ajax({
                url: $("#documentAuditForm").attr("action"),
                data: JSON.stringify(json),
                type: "POST",

                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function (response) {
                    console.log("ajax response ---");
                    var result = response.toString();

                    if (result == '') {
                        $('#noData').show();
                        console.log('no data found');
                      //  $('#search').button('reset');
                        if ($('#documentAuditTable').is(':visible')) {
                            $('#documentAuditTable').hide();
                            $('#noData').show();
                            console.log('inside table hide');
                        }
                       // response([{ label: 'No results found.', val: -1}]);
                        $('#documentAuditForm').show
                     }
                    else {
                        $('#noData').hide();
                    //  console.log('inside response');
                        var trHTML = '';
                        $.each(response, function (i, item) {
                            trHTML += '<tr><td>' + item.userID + '</td><td>' + item.documentAction + '</td><td>' + item.documentActionDate + '</td></tr>';
                            console.log('inside response1111111');
                        });
                        $('#documentAuditTable').show();
                        $('#documentAuditTable tbody').remove();
                        $('#documentAuditTable').append(trHTML);
                     
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('error: ' + textStatus + ': ' + errorThrown);
                }
            });

        }

        });





});
