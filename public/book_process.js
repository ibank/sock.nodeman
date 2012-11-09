var t = document.getElementById('socket.io');
if (t) document.body.removeChild(t);

var WS = 'http://socket.nodeman.org';
var WEB = 'http://socket.nodeman.org';

var s = document.createElement('script');
s.id = 'socket.io';
s.type = 'text/javascript';
s.src = WS + '/socket.io/socket.io.js';
s.onload = function() {
  console.log('io load complete');
  var fireKey = function(keycode) {
    ["keyup", "keydown"].forEach(function(a) {
      var e = jQuery.Event(a);
      e.keyCode = keycode;
      $(document.body).trigger(e);
    });
  };
  var h = WS, E = {
    close:  function() { document.getElementById('qrcode').style.display = 'none'  },
    left:  function() {
      fireKey(37)
    },
    right: function() {
      fireKey(39)
    }
  };

  var u = WEB + '/control';
  var s = io.connect(h);

  setTimeout(function() {
    var o = document.getElementById('qrcode');
    if (o) document.body.removeChild(o);

    var u2 = u + '/' + s.socket.sessionid;
    var a = 'http://chart.apis.google.com/chart?cht=qr&chs=500x500&chl=' + u2 + '&chld=H|0';
    var div = document.createElement('div');
    div.id = 'qrcode';
    div.style.position = 'absolute';
    div.style.top  = '100px';
    div.style.left = '200px';
    div.style.zIndex = 100000;
    div.innerHTML = '<img src="' + a + '">';
    document.body.appendChild(div);
  }, 100);

  s.on('return', function(data) {
    if (!E[data]) {
      alert('not found');
      return;
    }
    E[data]()
  });
};
document.body.appendChild(s);
