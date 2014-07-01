# README #

Admin Dual Line Login is a customization that splits the single login field into separated Username and Password fields in PowerSchool Administrator.

### Installation ###
This plugins support CPM plugin installation.
If you were given a .zip file to install the plugin,
use the Plugin Management Configuration page to install the plugin.

If you are installing this plugin from the source code,
create a .zip file containing just the plugin.xml file and
web_root folder and install the plugin with the .zip file you just created.

This plugin uses a page fragment to create the login form's username and password fields. Page fragments require an
insertion point, but the login page (pw.html) does not provide one. The following code must be manually
added to the web_root/admin/pw.html file to create a custom insertion point:

<div id="cust-pw-footer">~[cust.insertion_point:pw.footer]</div>

The above code must be inserted within the <body></body> portion of the pw.html file. It can go anywhere within the
body tag of the page.

NOTE: Although the user is redirected to /admin/home.html when the user enters incorrect login information, the
custom insertion point shown above is not needed on home.html. It is only required on pw.html.