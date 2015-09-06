var webcam = (function () {
    var $rawVideo = $('.js-raw-video');

    function publicInitialize() {

        MediaStreamTrack.getSources(function(mediaSources) {
            var environmentWebcam;

            for(var i = 0; i < mediaSources.length; i++) {
                console.log(mediaSources[i]);

                if (mediaSources[i].facing == 'environment' && mediaSources[i].kind == 'video') {
                    environmentWebcam = mediaSources[i].id;
                }
            }

            navigator.webkitGetUserMedia(
                {
                    video: {
                        optional: [{sourceId: environmentWebcam}]
                    }
                }, success, error);
        });
    }

    function success (stream) {
        $rawVideo.attr('src', webkitURL.createObjectURL(stream));
        // drawBackground.initialize();
        processImage.initialize();
    }

    function error (err) {
        console.log(err);
    }

    return {
        initialize: publicInitialize
    }

})();
