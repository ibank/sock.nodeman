/**
 * book mode
 *
 * @author nanhapark
 */
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
  //
  // fire keyboard event
  //
  var fireKey = function(keycode) {
    ["keyup", "keydown"].forEach(function(a) {
      var e = jQuery.Event(a);
      e.keyCode = keycode;
      $(document.body).trigger(e);
    });
  };
  
  //
  // left, right keyboard action
  //
  var E = {
    close:  function() {
      document.getElementById('qrcode').style.display = 'none'
    },
    left: function() {
      fireKey(37)
    },
    right: function() {
      fireKey(39)
    }
  };

  //
  // connect websocket
  //
  var s = io.connect(WS);
  s.on('return', function(data) {
    if (!E[data]) {
      alert('not found');
      return;
    }
    E[data]()
  });
  
  //
  // show qrcode after received socket sessionid
  //
  setTimeout(function() {
    var o = document.getElementById('qrcode');
    if (o) document.body.removeChild(o);

    var u2 = WEB + '/control/' + s.socket.sessionid;
    var a = 'http://chart.apis.google.com/chart?cht=qr&chs=500x500&chl=' + u2 + '&chld=H|0';
    var div = document.createElement('div');
    div.id = 'qrcode';
    div.style.position = 'absolute';
    div.style.top  = '10px';
    div.style.left = '10px';
    div.style.boxShadow = '0px 26px 190px rgba(0, 0, 0, 1)';
    div.style.zIndex = 1000000;
    div.innerHTML = '<img src="' + a + '" border="0">';
    document.body.appendChild(div);
  }, 100);
};
document.body.appendChild(s);
