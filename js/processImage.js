var processImage = (function () {
    var video = document.getElementById("rawVideo");
    var hiddenCanvas = document.getElementById("hiddenCanvas");
    var hiddenCtx = hiddenCanvas.getContext("2d");
    var keyCoordinates;
    var keyBuckets = [];

    // maximum diff between two pixels to consider it different
    var MAXRGBDIFF = 200;

    var MINPIXELSINBUCKET = 50;

    function publicInitialize() {
        var videoHeight = video.height;
        var videoWidth = video.width;

        keyCoordinates = drawKeys.getKeyCoordinates();
        for (var i = 0; i < keyCoordinates.numKeys; i++) {
            keyBuckets.push(0);
        }

        setInterval(
            function () {
                hiddenCtx.drawImage(video, 0, 0, videoWidth, videoHeight);
                var frame = hiddenCtx.getImageData(keyCoordinates.left, keyCoordinates.top, keyCoordinates.width, keyCoordinates.height);
                processFrame(frame);
            },
            15
        );
    }

    function processFrame(frame) {

        /* remove, just to test we're capturing the right stuff */
        var helperCanvas = document.getElementById("helperCanvas");
        var helperCtx = helperCanvas.getContext("2d");

        helperCtx.putImageData(frame, 0, 0);

        if(checkBackground.isReady()) {
            detectFingers(frame);
        } else {
            checkBackground.processFrame(frame);
        }
    }

    function detectFingers(frame) {

        var backgroundThreshold = checkBackground.getBackgroundThreshold();

        for (var x = 0; x < keyCoordinates.width; x++) {
            var bucket = parseInt(x / keyCoordinates.keyWidth);
            if (bucket > keyBuckets.length - 1) {
                bucket = keyBuckets.length - 1;
            }

            for (var y = 0; y < keyCoordinates.height; y++) {
                var frameIndex = 4*(y*keyCoordinates.width + x);

                var diff = Math.abs(frame.data[frameIndex] - backgroundThreshold[frameIndex])
                    + Math.abs(frame.data[frameIndex + 1] - backgroundThreshold[frameIndex + 1])
                    + Math.abs(frame.data[frameIndex + 2] - backgroundThreshold[frameIndex + 2]);

                if (diff > MAXRGBDIFF) {
                    keyBuckets[bucket]++;

                    if (bucket > 0) {
                        keyBuckets[bucket - 1]-= 0.05;
                    }
                    if (bucket < keyBuckets.length - 1) {
                        keyBuckets[bucket + 1]-= 0.05;
                    }
                }
            }
        }


        // console.log(keyBuckets);

        var bestIndex = null;
        // default threshold before we detect a finger
        var bestIndexCt = MINPIXELSINBUCKET;

        for (var i = 0; i < keyBuckets.length; i++) {
            if (keyBuckets[i] > bestIndexCt) {
                var encoding = i;
                if (i <= 4) {
                    encoding +=2;
                } else {
                    encoding -=5;
                }
                // 65 = "A" in ascii
                bestIndex = String.fromCharCode(65 + encoding);
                bestIndexCt = keyBuckets[i];
                // reset for the next frame
                keyBuckets[i] = 0;
            }
        }

        console.log(bestIndex);
        registerKey.register(bestIndex);
    }

    return {
        initialize: publicInitialize
    }

})();