pjax-ractivejs
==============
Isomorphic javascript PJAX with Ractive.js. Using javascript on client and server sharing libs and templates the natural format is CommonJS (because Node.js) and thereby Browserify on the client.

This is a least viable client - server setup using pushState + Ajax; PJAX, with javascript all the way and with full template re-use using Ractive.js (kinda like Handlebars templating).
##Notes
*Server side rendering of all route accessible pages/views
*Twitter does something similar
*Borrowed _a lot_ from [PJAX-Standalone](https://github.com/thybag/PJAX-Standalone/blob/master/pjax-standalone.js) 
*Doesn't return rendered html on XHR requests (like PJAX-Standalone), but json data (like Twitter) + parsed Ractive template (parsed tpl is valid json!)
*
