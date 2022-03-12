// Video Settings
const width = 640;
const height = 480;
const fps = 30;

// Globals
let videoCapture = null;
let stream = null;
let isStreaming = false;
let matSrc = null;
let matDst = null;
let matGrey = null;
let faces = null;
let classifier = null;
let videoMute = 1;
let seconds;
let totalNoFaceSeconds = 0;
let maxNoFaceSeconds = 0;
let startTime = new Date();
let endTime = new Date();
const videoButton = document.getElementById('video-btn');
const secondsShow = document.getElementById('seconds');


// Elements
const videoElem = document.getElementById('js-local-stream');
const faceCascadeFile = 'xml\\haarcascade_frontalface_default.xml';



//ロード
function onCvLoaded() {
    console.log('on OpenCV.js Loaded', cv);
    cv.onRuntimeInitialized = onReady; // Not Working...
}


function onReady() {
    console.log('On Ready');

    // Set Element Size
    videoElem.width = width;
    videoElem.height = height;
    // Start Video Capture
    videoCapture = new cv.VideoCapture(videoElem);
    // Load XML File With XHR
    const utils = new Utils('error-message'); // Set Element ID
    utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
        console.log('Face Cascade File Loaded');
    });

    onStart();
};

//ビデオ開始
function onStart() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
        .then((_stream) => {
            console.log('On Start : Success');
            stream = videoElem.srcObject = _stream;
            videoElem.play();
            matSrc = new cv.Mat(height, width, cv.CV_8UC4); // For Video Capture
            matDst = new cv.Mat(height, width, cv.CV_8UC4); // For Canvas Preview
            matGrey = new cv.Mat();
            faces = new cv.RectVector();
            classifier = new cv.CascadeClassifier();
            // Load Pre-Trained Classifiers
            classifier.load(faceCascadeFile);
            // Start Process Video
            setTimeout(processVideo, 0);
            isStreaming = true;
        })
        .catch((error) => {
            navigator.mediaDevices.getUserMedia({
                video: false,
                audio: false
            })
            document.getElementById('face').innerHTML = 'face_retouching_off';
            document.getElementById('face').style.color = '#c85000';

        });
}

videoButton.addEventListener('click', Video_Click);

function Video_Click() {
    if (videoMute == 0) { //ビデオをつける
        videoMute = 1;
        // onReady();
        onStart();

    } else { //ビデオを消す
        stream.getVideoTracks().forEach((track) => (track.enabled = false));
        videoElem.srcObject = null;
        isStreaming = false;
        videoMute = 0;
        // videStop();
        document.getElementById('face').innerHTML = 'face_retouching_off';
        document.getElementById('face').style.color = '#c85000';
    }

}


//顔検出
function processVideo() {
    if (!isStreaming) {
        console.log('Process Video : Streaming Stopped');
        matSrc.delete();
        matDst.delete();
        matGrey.delete();
        faces.delete();
        classifier.delete();

        return;
    }

    const begin = Date.now();
    videoCapture.read(matSrc); // Capture Video Image To Mat Src
    matSrc.copyTo(matDst); // Copy Src To Dst
    cv.cvtColor(matDst, matGrey, cv.COLOR_RGBA2GRAY, 0); // Get Grey Image
    classifier.detectMultiScale(matGrey, faces, 1.1, 3, 0); // Detect Faces

    if (faces.size() == 1) {
        //顔が検出された
        document.getElementById('face').innerHTML = 'face';
        document.getElementById('face').style.color = '#0078c8';
        startTime = new Date();
        secondsShow.innerHTML = "";

    } else {
        //顔が検出されてない
        stopTime = new Date();
        start();
    }

    // Loop
    const delay = 1000 / fps - (Date.now() - begin);
    setTimeout(processVideo, delay);
}


//時間計測
function start() {
    let alert = 1;
    let totalSeconds = Math.floor((stopTime - startTime) / 1000);
    const alertTime = 5;
    const hourNum = Math.floor(totalSeconds / 3600);
    const hour = hourNum ? hourNum + '時間' : '';
    const minutesNum = Math.floor((totalSeconds % 3600) / 60);
    const minutes = minutesNum ? minutesNum + '分' : '';
    const secondsNum = totalSeconds % 60;
    const secondsn = secondsNum ? secondsNum + '秒' : '0秒';
    if (totalSeconds >= alert) {
        //時間表示
        document.getElementById('face').innerHTML = 'face_retouching_off';
        document.getElementById('face').style.color = '#c85000';
        secondsShow.innerHTML = hour + minutes + secondsn;
    }
    if (totalSeconds == alertTime) {
        //アラート表示
        swal.fire({
            title: alertTime + '秒間、顔が認識されていません',
            icon: 'error',
            toast: true,
            position: 'top-end',   //画面右上 
            showConfirmButton: false,
            timer: 3000           //3秒経過後に閉じる
        });
    }
    if (totalSeconds > maxNoFaceSeconds) {
        maxNoFaceSeconds = totalSeconds;
    }

}


