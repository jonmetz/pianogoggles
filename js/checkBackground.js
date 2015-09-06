var checkBackground = (
  function () {
    var THRESHOLD = 150750;
    // var INTERVAL = 100;
    var STABILITY_THRESHOLD = 50;
    var ready = false;
    var thresholdingFrames = [];
    var backgroundThreshold = [];
    var counter = 0;

    var getBackgroundThreshold = function() {
      return backgroundThreshold;
    }

    var computeBackgroundThreshold = function() {
        for (var index = 0; index < thresholdingFrames[0].data.length; index++) {
            backgroundThreshold.push(0);
            for (var frame = 0; frame < thresholdingFrames.length; frame++) {
                backgroundThreshold[index] += thresholdingFrames[frame].data[index];
            }
            backgroundThreshold[index] = backgroundThreshold[index] / thresholdingFrames.length;
        }

        thresholdingFrames = [];
        messageUser.write('Start playing!');
    }

    var isReady = function() {
      return ready;
    }

    var processFrame = function(frame) {
      if (thresholdingFrames.length === 0) { // Is this the first frame
        thresholdingFrames.push(frame);
        counter++;
        return; // quit without doing other shit
      }
      // else
      var lastFrame = thresholdingFrames[thresholdingFrames.length - 1];
      var diff = getDiffFrames(frame, lastFrame);
      if (diff > THRESHOLD) {
        // background isn't stable, restart process
        thresholdingFrames = [];
        counter = 0;
      }
      else { // background is stable for now, keep checking
        counter++;
        thresholdingFrames.push(frame);
      }
      if (counter > STABILITY_THRESHOLD) { // Are we done yet?
        console.log("DONE");
        computeBackgroundThreshold();
        ready = true;
      }
    }


    var getDiffFrames = function(frame1, frame2) {
      var diff = 0;
      var i_frame1, i_frame2;
      var data1 = frame1.data;
      var data2 = frame2.data;
      for (var i = 0; i < data1.length; i++) {
        i_frame1 = data1[i];
        i_frame2 = data2[i];
        if (i_frame1 > i_frame2) {
          diff += i_frame1 - i_frame2;
        }
        else {
          diff += i_frame2 - i_frame1;
          // console.log(i_frame2 - i_frame1);
        }
      }
      return diff;
    };

    return {
      isReady: isReady,
      getBackgroundThreshold: getBackgroundThreshold,
      processFrame: processFrame,
      THRESHOLD: THRESHOLD
    }

})();