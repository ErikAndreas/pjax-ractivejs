pjax-ractivejs
==============
Isomorphic javascript, PJAX with Ractive.js. 

Using javascript on client and server sharing libs and templates the natural format is CommonJS (because Node.js) and thereby Browserify on the client.

This is a least viable client - server setup using pushState + Ajax; PJAX, with javascript all the way and with full template re-use using Ractive.js (kinda like Handlebars templating).
##Notes
* Server side rendering of all route accessible pages/views
* Twitter does something similar
* Borrowed _a lot_ from [PJAX-Standalone](https://github.com/thybag/PJAX-Standalone/blob/master/pjax-standalone.js) 
* Doesn't return rendered html on XHR requests (like PJAX-Standalone), but json data (like Twitter) + parsed Ractive template (parsed tpl is valid json!)
* Express.js template rendering could be simplified and more express-ish when/if Ractive [fixes renderFile/__express](https://github.com/ractivejs/ractive/issues/538)

##Run it
```bash
$ npm install
```

```bash
$ node server.js
```

Browse to http://localhost:3000/index. If/when you've made changes to index.js or pjax-ractive.js you should run ``` $ npm run build-js``` to generate new bundle.js