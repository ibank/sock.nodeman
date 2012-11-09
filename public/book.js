/**
 * book mode
 *
 * @author nanhapark
 */
(function() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = 'http://socket.nodeman.org/book_process.js?' + (+new Date());
  document.body.appendChild(s);
})();
