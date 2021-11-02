funk = "";
flower = "";
funk_status = "";
flower_status = "";
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
scoreRight = 0;
scoreLeft = 0;

function preload() {
    funk = loadSound("Bruno1.mp3");
    flower = loadSound("Malone2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    funk_status = funk.isPlaying();
    flower_status = flower.isPlaying();

    if(scoreRight > 0.2) {
        circle(rightX, rightY, 20);
            flower.stop();

        if(funk_status == false) {
            funk.play();
            document.getElementById("song").innerHTML = "Playing: Sunflower By Post Malone";
        }
    }

    if(scoreLeft > 0.2) {
        funk.stop();

        if(flower_status == false) {
            flower.play();
            document.getElementById("song").innerHTML = "Plyaing: Uptown Funk By Mark Ronson ft. Bruno Mars";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}