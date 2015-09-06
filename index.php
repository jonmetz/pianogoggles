<!DOCTYPE html>
<html>
    <head>
      <link rel="stylesheet" type="text/css" href="css/main.css" />
      <meta name="mobile-web-app-capable" content="yes">
    </head>
    <body>
      <script src="https://code.jquery.com/jquery-2.1.1.js"></script>
      <script src="//code.jquery.com/jquery-2.1.1.js"></script>
        <div id="message">Find a Smooth Surface</div>

        <video id="rawVideo" class="js-raw-video" width="480" height="360" autoplay></video>
        <canvas id="hiddenCanvas" width="480" height="360"></canvas>
        <canvas id="canvas" width="480" height="360"></canvas>
        <canvas id="helperCanvas" width="480" height="360"></canvas>


        <script src="js/webcam.js"></script>
        <script src="js/drawBackground.js"></script>
        <script src="js/processImage.js"></script>
        <script src="js/main.js"></script>
        <script src="js/audio.js"></script>
        <script src="js/messageUser.js"></script>
        <script src="js/drawKeys.js"></script>
        <script src="js/registerKey.js"></script>
        <script src="js/checkBackground.js"></script>
        <!-- <script src="//js.live.net/v5.0/wl.js"></script>
        <script>
        console.log('ass');
        var clientId = "0000000048132188";
        var redirectUri = "https://pianogoggles.herokuapp.com/";
        WL.init({ client_id: clientId, redirect_uri: redirectUri });

        WL.login({ "scope": "wl.skydrive_update" }).then(
        function(response) {
        displayDialog();
        registerOnClickHandlers();
        },
        function(response) {
        log("Failed to authenticate.");
        }
        );
        function registerOnClickHandlers() {
        var uploadFileButton =
        document.getElementById('save-to-skydrive-upload-button');
        uploadFileButton.disabled = true;
        uploadFileButton.onclick = function() {
        closeDialog();
        saveToSkyDrive();
        };

        var fileInputElement =
        document.getElementById('save-to-skydrive-file-input');
        fileInputElement.onchange = function() {
        uploadFileButton.disabled = (fileInputElement.value === "");
        };
        }

        function saveToSkyDrive() {
        WL.fileDialog({ mode: 'save' }).then(
        function(response) {
        var folder = response.data.folders[0];

        WL.upload({
        path: folder.id,
        element: 'save-to-skydrive-file-input',
        overwrite: 'rename'
        }).then(
        function(response) {
        log("You saved to " + response.source + ". " +
        "Below is the result of the upload.");
        log("");
        log(JSON.stringify(response));
        },
        function(errorResponse) {
        log("WL.upload errorResponse = " + JSON.stringify(errorResponse));
        },
        function(progress) {
        // progress events for the upload are raised here
        }
        );
        }, function(errorResponse) {
        log("WL.fileDialog errorResponse = " + JSON.stringify(errorResponse));
        }
        );
        }

        function log(message) {
        var child = document.createTextNode(message);
        var parent = document.getElementById('JsOutputDiv') || document.body;
        parent.appendChild(child);
        parent.appendChild(document.createElement("br"));
        }
        var onLoginComplete = function() {
        console.log('as');
        }
        function signInUser() {
        WL.login({
        scope: "wl.signin"
        }, onLoginComplete);
        }
        signInUser();
        </script> -->
    </body>
</html>
