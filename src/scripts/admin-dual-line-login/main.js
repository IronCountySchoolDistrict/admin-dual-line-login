/*global $, b64_md5, hex_hmac_md5, document, pskey*/
define(["jquery"], function($) {
    "use strict";
    return {
        main: function() {
            this.removeElements();
            this.insertElements();
            this.setFocus();
            this.bindEvents();
        },
        
 
        // Remove DOM elements and attributes that we will be replacing
        removeElements: function() {
            // Remove the original onsubmit attribute.
            $("#LoginForm").attr("onsubmit", "");
            $("#btnEnter").attr("onclick", "");

            // Modify form inputs.
            $("label[for=fieldPassword]").remove();

            $("#fieldPassword").remove();

            $("input[name=username][type=hidden]").remove();
        },

        insertElements: function() {
            var fieldsTemplate = $($("#fields-template").html());
            fieldsTemplate.insertAfter("fieldset div:eq(0)");
        },

        setFocus: function() {
            $("#newUsername").focus();
        },

        bindEvents: function() {
            var _this = this;
            $("#LoginForm").on("submit", function(event) {
                return _this.doCustomAdminLogin(this); // this === form
            });

            $("#newUsername, #newPassword").on("keypress", function(event) {
                _this.capsLockOn(event);
            });
        },

        makePasswordHash: function(password) {
            return hex_hmac_md5(pskey, b64_md5(password));
        },

        doCustomAdminLogin: function(form) {
            var clearTextPassword = form.password.value;
            if (form.ldappassword !== null) {
                // LDAP is enabled, so send the clear-text password
                // Customers should have SSL enabled if they are using LDAP
                form.ldappassword.value = clearTextPassword; // Send the pw for LDAP
            } 
            form.password.value = this.makePasswordHash(clearTextPassword);
            
            return true;
        },

        capsLockOn: function(e) {
            var kc,
                sk;

            kc = e.keyCode || e.which;
            sk = e.shiftKey || kc === 16;
            // If user is typing in all caps without using shift,
            // or if they are typing with shift held down but still getting lowercase letters.
            if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
                document.getElementById("divMayus").style.display = "inline";
            } else {
                document.getElementById("divMayus").style.display = "none";
            }

            // If user types in a semi-colon, alert them that they no longer need to use
            // a semi-colon to separate the username and password.
            if (kc === 59) {
                document.getElementById("divSemi").style.display = "inline";
            } else {
                document.getElementById("divSemi").style.display = "none";
            }
        }
    };
});