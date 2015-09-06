var messageUser = (function () {
    var element = $("#message");
    // countdown = function() {
    //   setInterval()
    var write = function(message) {
      element.text(message);
    }
    var wipe = function() {
      write('');
    }

     return {
       element: element,
       write: write,
       wipe: wipe
    }

})();