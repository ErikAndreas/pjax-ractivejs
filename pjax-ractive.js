var request = require('superagent');
var Ractive = require('ractive');

var pr = {
  addEvent:function(obj, event, callback) {
    obj.addEventListener(event, callback, false);
  },
  parseLinks:function(doo) {
    var nodes = doo.getElementsByTagName('a');
    for (var i=0;i<nodes.length;i++) {
      var node = nodes[i];
      if (node.getAttribute('data-pjax')) {
        var opt = {history: true};
        opt.url = node.href;
        (function (opt) {
        pr.addEvent(node, 'click', function (event) {
          // Allow middle click (pages in new windows)
          if ( event.which > 1 || event.metaKey || event.ctrlKey ) return;
          // Don't fire normal event
          if(event.preventDefault){ event.preventDefault(); }else{ event.returnValue = false; }
          pr.handle(opt);
        });
      })(opt);
      }
    }
  },
  handle:function(o) {
    // TODO: fire beforeSend evt    
    request
      .get(o.url)
      .set('x-pjax','true')
      .end(function(err, res) {
        document.title = res.body.data.title;
        if (o.history) {
          window.history.pushState(o, res.body.data.title , o.url);
        }
        var ractive = new Ractive({
          el: 'content', // TODO: make this conf, pass into init()
          template: res.body.tpl,
          data: res.body.data
        });    
        // TODO: fire complete evt    
      });
  },
	init:function() {
    if(document.readyState === 'complete') {
      pr.parseLinks(document);
    } else {
      pr.addEvent(window, 'load', function(){ 
        pr.parseLinks(document);
      });
    }
    window.history.replaceState({'url': document.location.href}, document.title);
    pr.addEvent(window, 'popstate', function(st) {
      console.log('popstate', st);
      if (st.state) {
        st.state.history = false;
        pr.handle(st.state);
      }
    });
  }
};

module.exports = pr;