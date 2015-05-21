/*global $j, b64_md5, hex_hmac_md5, document, pskey*/
$j(document).ready(function() {
    'use strict';
    var oldUsername,
        fieldsTemplate;

    $j('#btnEnter').on('click', function(event) {
        event.preventDefault();
        psCustomEnter();
    });

    $j('#LoginForm').on('submit', function(event) {
        event.preventDefault();
        doCustomAdminLogin(this);
    });

    // Remove the original onsubmit attribute.
    $j('#LoginForm').attr('onsubmit', '');
    $j('#btnEnter').attr('onclick', '');

    // Modify form inputs.
    $j('label[for="fieldPassword"]').remove();

    $j('#fieldPassword').remove();

    oldUsername = $j('input[name="username"][type="hidden"]');
    oldUsername.remove();

    fieldsTemplate = $j($j('#fields-template').html());
    fieldsTemplate.insertAfter('fieldset div:eq(0)');

    $j('#newUsername').focus();

    $j('#newUsername, #newPassword').on('keypress', function(event) {
        capslockon(event);
    });

    function psCustomEnter() {
        var form = $j('#LoginForm')[0];
        if (doCustomAdminLogin(form)) {
            form.submit();
        }
    }

    function doCustomAdminLogin(form) {
        var clearTextPassword,
            base64Password;

        clearTextPassword = form.password.value;
        base64Password = b64_md5(clearTextPassword);

        form.password.value = hex_hmac_md5(pskey, base64Password);

        if (form.ldappassword !== null) {
            // LDAP is enabled, so send the clear-text password
            // Customers should have SSL enabled if they are using LDAP
            form.ldappassword.value = clearTextPassword; // Send the pw for LDAP
        }
        return true;
    }

    function capslockon(e) {
        var kc,
            sk;

        kc = e.keyCode || e.which;
        sk = e.shiftKey || kc === 16;
        // If user is typing in all caps without using shift,
        // or if they are typing with shift held down but still getting lowercase letters.
        if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
            document.getElementById('divMayus').style.display = 'inline';
        } else {
            document.getElementById('divMayus').style.display = 'none';
        }

        // If user types in a semi-colon, alert them that they no longer need to use
        // a semi-colon to separate the username and password.
        if (kc === 59) {
            document.getElementById('divSemi').style.display = 'inline';
        } else {
            document.getElementById('divSemi').style.display = 'none';
        }
    }
});