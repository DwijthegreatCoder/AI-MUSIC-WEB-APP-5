song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scorerightWrist = 0;
scoreleftWrist = 0;
song1_status = "";
song2_status = "";


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function draw() {
    image(0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song1_status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scorerightWrist > 0.002) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "PLaying Harry Potter theme song";
        } 
    }

        if(scoreleftWrist > 0.002) {
            circle(leftWristX, leftWristY, 20);
            song1.stop();
    
            if(song2_status == false)
            {
                song2.play();
                document.getElementById("song").innerHTML = "PLaying Peter Pan song";
            }

        
        }
}

function modelLoaded() {
    console.log("Posenet is Intialized!!!!!!!!!!!!!!")
}
function gotPoses(results) {
    if(results.length > 0) 
    {
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreleftWrist);
        console.log("scoreRightWrist = " + scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}