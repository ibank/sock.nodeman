/**
 * book mode
 *
 * @author nanhapark
 */
(function() {
  if (!jQuery) { alert('not found jQuery'); return }

  $('#socketio').remove();

  var URL = 'http://socket.nodeman.org';

  $.getScript(URL + '/socket.io/socket.io.js', function() {
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
        $('#qrcode').fadeOut()
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
    var s = io.connect(URL);
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
      $('#qrcode').remove();

      var u2 = URL + '/control/' + s.socket.sessionid;
      console.log(u2);
      var a = 'http://chart.apis.google.com/chart?cht=qr&chs=500x500&chl=' + u2 + '&chld=H|0';
      $('<div></div>').attr({id: 'qrcode'}).css({
        position: 'absolute',
        top : '10px',
        left: '10px',
        boxShadow: '0px 26px 190px rgba(0, 0, 0, 1)',
        zIndex: 1000000
      }).html('<img src="' + a + '" border="0">').appendTo(document.body);
    }, 100);
  });
})();
