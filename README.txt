This plugin uses a page fragment to create the login form's username and password fields. Page fragments require an
insertion point, but the login page (pw.html) does not provide one. The following code must be manually
added to the web_root/admin/pw.html file to create a custom insertion point:

<div id="cust-pw-footer">~[cust.insertion_point:pw.footer]</div>

The above code must be inserted within the <body></body> portion of the pw.html file. It can go anywhere within the
body tag of the page.