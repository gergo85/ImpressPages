var ModuleInstall = new function () {
    "use strict";

    var internalFunction = function () {

    };

    this.step3Click = function () {
        $('#content').hide();
        $('#loading').show();
        $('.errorContainer').empty();

        var db = {
            'hostname': $('#db_server').val(),
            'username': $('#db_user').val(),
            'password': $('#db_pass').val(),
            'database': $('#db_db').val(),
            'tablePrefix': $('#db_prefix').val()
        };

        var postData = {
            'a': 'createDatabase',
            'db': db,
            'jsonrpc': '2.0'
        };

        $.ajax({
            url: 'index.php',
            data: postData,
            dataType: 'json',
            type: 'POST',
            success: function (response) {

                $('#loading').hide();
                $('#content').show();


                if (response && response.result) {
                    document.location = 'index.php?step=4';
                } else if (response && response.error && response.error.message) {
                    $('.errorContainer').append('<p class="error"></p>');
                    $('.errorContainer .error').text(response.error.message);
                } else {
                    alert('Unknown response. #FYLBK');
                }
            },
            error: function (response) {
                console.log('error', response);
                $('#loading').hide();
                $('#content').show();

                alert('Unexpected error. #KJLUH');
            }
        });
    };

    this.step4Click = function() {
        $('.errorContainer').empty();

        var postData = {
            'a': 'writeConfig',
            'site_name': $('#config_site_name').val(),
            'site_email': $('#config_site_email').val(),
            'install_login': $('#config_login').val(),
            'install_pass': $('#config_pass').val(),
            'email': $('#config_email').val(),
            'timezone': $('#config_timezone').val(),
            'jsonrpc': '2.0'
        };

        $.ajax({
            url: 'index.php',
            data: postData,
            dataType: 'json',
            type: 'POST',
            success: function (response) {

                if (response && response.result) {
                    document.location = 'index.php?step=5';
                } else if (response && response.error && response.error.message) {
                    $('.errorContainer').append('<p class="error"></p>');
                    $('.errorContainer .error').text(response.error.message);

                    if (response.error.errors) {
                        // TODOX use theese errors instead of message
                    }
                } else {
                    alert('Unknown response. #FYLXK');
                }
            },
            error: function () {
                alert('Unexpected error. #KMLUH');
            }
        });
    };
};