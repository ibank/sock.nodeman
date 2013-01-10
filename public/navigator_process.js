/**
 * 1st Korea Node.js Conference
 * Expression Part
 *
 * @author nanhapark
 */
(function() {
  var prefix = 'websocket bookmarklet service :: ';

  if (typeof jQuery == 'undefined') { alert(prefix + 'not found jQuery'); return }

  $('#socketio').remove();

  //
  // core url
  // 포트를 지정하지 않으면, 브라우져 포트를 따라감.
  //
  var URL = 'http://socket.nodeman.org:80';

  //
  // target id
  //
  var TARGET_ID = 'socket_nodeman_qrcode';

  //
  // express qrcode
  //
  var QRCode = {
    remove: function() {
      $('#qrcode').fadeOut(1000, function() { $(this).remove() });
    },
    append: function(url) {
      this.remove();

      var $target = $('#' + TARGET_ID);
      if ($target.length > 0) {
        var w = $target.width() || 200, h = $target.height() || 200;
        console.log(w, h);
        var a = 'http://chart.apis.google.com/chart?cht=qr&chs=' + w + 'x' + h + '&chl=' + url + '&chld=H|0';
        $('<div></div>').attr({id: 'qrcode'}).css({
          boxShadow: '0px 26px 190px rgba(0, 0, 0, 1)',
        }).html('<img src="' + a + '" border="0">').appendTo($target).hide().fadeIn(1000);
      } else {
        var a = 'http://chart.apis.google.com/chart?cht=qr&chs=500x500&chl=' + url + '&chld=H|0';
        $('<div></div>').attr({id: 'qrcode'}).css({
          position: 'absolute',
          top : '10px',
          left: '10px',
          boxShadow: '0px 26px 190px rgba(0, 0, 0, 1)',
          zIndex: 1000000
        }).html('<img src="' + a + '" border="0">').appendTo(document.body).hide().fadeIn(1000);
      }
    }
  };

  //
  //
  //
  $.getScript(URL + '/socket.io/socket.io.js', function() {
    console.log(prefix + 'io load complete');
    //
    // controller fire keyboard event
    //
    var ctrlfireKey = function(keycode) {
      ["keyup", "keydown"].forEach(function(a) {
        fireKey(document.documentElement, a, keycode);
      });
    };

    //$(document).bind('keyup keydown', function(e) {
    //  console.log(prefix + e.keyCode);
    //});
    
    //
    // left, right keyboard action
    //
    var E = {
      close:  function() {
        QRCode.remove()
      },
      left: function() {
        ctrlfireKey(37)
      },
      right: function() {
        ctrlfireKey(39)
      },
      up: function() {
        ctrlfireKey(38)
      },
      down: function() {
        ctrlfireKey(40)
      }
    };

    //
    // connect websocket
    //
    var s = io.connect(URL);
    s.on('return', function(data) {
      console.log(prefix + data);
      if (!E[data]) {
        alert(prefix + 'action not found');
        return;
      }
      E[data]()
    });
    
    //
    // show qrcode after received socket sessionid
    //
    s.on('connect', function() {
      var u = URL + '/control/' + s.socket.sessionid;
      QRCode.append(u);
    });
  });

  //
  // w3c keyboard event fire
  //
  function fireKey(el, type, key) {
    var eventObj;
    if (document.createEventObject) {
      eventObj = document.createEventObject();
      eventObj.keyCode = key;
      el.fireEvent('on' + type, eventObj);
    } else if(document.createEvent) {
      eventObj = document.createEvent("Events");
      eventObj.initEvent(type, true, true);
      eventObj.keyCode = key;
      eventObj.which = key;
      el.dispatchEvent(eventObj);
    }
  }
})();
