var drawBackground = (function () {
    var video = document.getElementById("rawVideo");
    var canvas = document.getElementById("hiddenCanvas");
    var context = canvas.getContext("2d");
    var threshold = [];

    function publicInitialize() {
        var videoHeight = video.height;
        var videoWidth = video.width;
        var pad = 350;
        var keyWidth = Math.floor((videoWidth - pad) / 7);
        var keyHeight = Math.floor(.4 * videoHeight);

        var totalWidth = 7*keyWidth;
        var totalHeight = keyHeight;

        //create thresholding array for every pixel in piano key regions
        for(var i = 0; i < totalWidth*totalHeight*4; i++)
        {
            threshold.push(0);
        }

        //create mapping of indices
        var frameInd = [];
        var upperLeftCornerX = videoHeight - keyHeight;
        var upperLeftCornerY = pad/2;
        for(var i = 0; i < totalHeight; i++)
        {
            for(var j = 0; j < totalWidth; j++)
            {
                for(var k = 0; k < 4; k++)
                    frameInd.push(k + (i + upperLeftCornerX) + (j + upperLeftCornerY));
            }
        }

        var counter = 0;
        var backgroundTimeout = setInterval(function() {
                context.drawImage(video, 0, 0, videoWidth, videoHeight);
                var frame = context.getImageData(0, 0, videoWidth, videoHeight);

                for(var i = 0; i < frameInd.length; i++)
                {
                    threshold[i] += frame.data[frameInd[i]];
                }
                console.log(counter);
                console.log(threshold);

                counter++;

                if (counter >= 50) {
                    for (var i = 0; i < threshold.length; i++) {
                        threshold[i] /= counter;
                    }
                    clearTimeout(backgroundTimeout);
                    console.log("done!");
                    console.log(threshold);
                }
            }
            , 100);

        //accumulate data for 5 seconds
        /*
        for(var counter = 0; counter < 50; counter++)
        {
            setTimeout(function() {
                context.drawImage(video, 0, 0, videoWidth, videoHeight);
                var frame = context.getImageData(0, 0, videoWidth, videoHeight);

                for(var i = 0; i < frameInd.length; i++)
                {
                    threshold[i] += frame.data[frameInd[i]];
                }
                console.log(threshold);
            }
            , 100);
        }

        for(var i = 0; i < 50 ; i++)
        {
            threshold[i] /= 50.0;
        }

        console.log(threshold);*/
    }



    return {
        initialize: publicInitialize
    }

})();