var registerKey = (
  function () {

    var lastKey;
    var consecutivesCount = 0;
    var THRESHOLD = 3;
    var PROB_THRESHOLD = 36;
    var KEYS_SIZE = 50;
    var keys = [];
    var key_counts = [0, 0, 0, 0, 0, 0, 0, 0];
    var counter = 0;
    var keyNames = ["A", "B", "C", "D", "E", "F", "G"];
    var play = false;

    for (var i = 0; i < KEYS_SIZE; i++) {
     keys.push(null);
    }

    var registerKeyProb = function(key) {

      keys[counter] = key;
      counter++;
      for (var i = 0; counter === keys.length && i < keys.length; i++) {
        for (var j = 0; i === 0 && j < key_counts.length; j++)
          key_counts[j] = 0;
        if (keys[i] === null) {
          key_counts[7] += 1;
        }
        else
          key_counts[keyNames.indexOf(key)] += 1;
        play = true;
      }
      if (play) {
        var largest = key_counts[0];
        var mostLikelyKey = "A";
        for (var i = 0; i < key_counts.length; i++) {
          if (key_counts[i] > largest && keyNames[i]) {
            largest = key_counts[i];
            mostLikelyKey = keyNames[i];
          }
          else if (key_counts[i] > largest && keyNames[i] === null) {
            largest = key_counts[i];
            mostLikelyKey = null;
          }
        }
        if (mostLikelyKey !== null && largest > PROB_THRESHOLD)
          audio.playKey(mostLikelyKey);
      }
      if (counter === keys.length) // start from the begining
        counter = 0;
    }

    var registerKey = function(key) {
      var maybePlayKey = false;

      if (!lastKey) { // first key
        lastKey = key;
        consecutivesCount = 1;
      }
      else if (!key) { // no key
        lastKey = null;
        consecutivesCount = 0;
      }
      else if (key === lastKey) { // increment consecutivesCount
        consecutivesCount += 1;
        maybePlayKey = true;
      }
      else if (key !== lastKey) { // new lastKey
        lastKey = key;
        consecutivesCount = 1;
      }
      if (maybePlayKey && consecutivesCount == THRESHOLD) { // don't play keys if above threshold
        audio.playKey(key);
      }

    }

    return {
      register: registerKey
    }

})();