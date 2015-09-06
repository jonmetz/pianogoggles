/**
 * Created by jonzitome on 11/15/14.
 */

var audio = (function () {
    var audioBuffers = {};
    var context = new(window.AudioContext || window.webkitAudioContext)();
    var keyNames = ["A", "B", "C", "D", "E", "F", "G"];

    function loadKey(keyname) {

        var request = new XMLHttpRequest();
        var url = "assets/3" + keyname + ".mp3";
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        // Decode asynchronously
       request.onload = function() {
          context.decodeAudioData(request.response, function(buffer) {
            audioBuffers[keyname] = buffer;
          }, function(err) {console.log("error decoding " + err);})
        }
      request.send();
    }

    var loadKeys = function() {
        // if (audioFiles) // caching
        //     return;
        for (i = 0; i < keyNames.length; i++) {
            var keyName = keyNames[i];
            loadKey(keyName);
        }
    };
    var playKey = function(key) {
        console.log(key);
        var source = context.createBufferSource(); // creates a sound source
        var audioBuffer = audioBuffers[key];
        source.buffer = audioBuffer;                    // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
    };

    var runaway = function() {
        loadKeys();
        var keys = ["E", "E", "E", "E", "D", "D", "D", "D", "C", "C", "C", "C", "A", "A", "G", "E"];
        var i = 0;
        setInterval(function() { playKey(keys[i]); i++;}, 1000);
    };

    return {
        loadKeys: loadKeys,
        playKey: playKey,
        audioSources: audioBuffers,
        runaway: runaway
    };

             })();

audio.loadKeys();