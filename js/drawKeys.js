var drawKeys = (function () {
    var video = document.getElementById("rawVideo");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var keyCoordinates = {};

    function publicInitialize() {
        var videoHeight = video.height;
        var videoWidth = video.width;
        var pad = 320;
        var numKeys = 7;
        var keyWidth = Math.floor((videoWidth - pad) / numKeys);
        var keyHeight = Math.floor(.4 * videoHeight);

        keyCoordinates['left'] = pad/2;
        keyCoordinates['top'] = videoHeight- keyHeight;
        keyCoordinates['width'] = videoWidth - pad;
        keyCoordinates['keyWidth'] = keyWidth;
        keyCoordinates['height'] = keyHeight;
        keyCoordinates['numKeys'] = numKeys;

        context.beginPath();
        context.lineWidth = 5;
        for(var i = 0; i < numKeys; i++)
        {
            context.strokeRect(i*keyWidth + pad/2, videoHeight-keyHeight, keyWidth, keyHeight);
        }
    }

    function publicGetKeyCoordinates() {
        return keyCoordinates;
    }


    return {
        initialize: publicInitialize,
        getKeyCoordinates: publicGetKeyCoordinates
    }

})();