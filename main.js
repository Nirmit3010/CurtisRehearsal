song1 = "";
song2 = "";
song3 = "";
song4 = "";
song5 = "";
song6 = "";
song7 = "";
song8 = "";
rightWristY = 0;
rightWristX = 0;
leftWristY = 0;
leftWristX = 0;
dropdown = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song3 = loadSound("[MP3DOWNLOAD.TO] Violin Sonata No. 3 in C Major, BWV 1005_ IV. Allegro assai-320k.mp3");
    song4 = loadSound("[MP3DOWNLOAD.TO] Liebesleid (1995 Remastered Version)-320k.mp3");
    song1 = loadSound("[MP3DOWNLOAD.TO] Chopin - Nocturne in E Flat Major (Op. 9 No. 2)-320k.mp3");
    song2 = loadSound("[MP3DOWNLOAD.TO] Debussy - Arabesque No. 1-320k.mp3");
    song3 = loadSound("[MP3DOWNLOAD.TO] Chopin - Nocturne in E Flat Major (Op. 9 No. 2)-320k.mp3");
    song4 = loadSound("[MP3DOWNLOAD.TO] Liszt - Hungarian Rhapsody No.  2-320k.mp3");
    song5 = loadSound("[MP3DOWNLOAD.TO] Yo-Yo Ma - Bach_ Cello Suite No. 1 in G Major, Prélude (Official Video)-320k.mp3");
    song6 = loadSound("[MP3DOWNLOAD.TO] Saint-Saens _ The Swan ( Le Cygne )  - Carnival of the Animals-320k.mp3");
    song7 = loadSound("[MP3DOWNLOAD.TO] Oh Yoon Hee ft. Cheon Seo Jin - Una Voce Poco Fa - MINALOG (Lyrics)-320k.mp3");
    song8 = loadSound("[MP3DOWNLOAD.TO] Maria Callas -Verdi- La traviata -Libiamo ne` lieti calici-320k.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    dropdown = document.getElementById("instruments").value;
    if (dropdown = "blank") {
        document.getElementById("sound1").innerHTML = "";
        document.getElementById("sound2").innerHTML = "";
    }


}

function modelLoaded() {
    console.log("Posenet Initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWrist=" + scoreLeftWrist);
        console.log("ScoreRightWrist=" + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("LeftWristX=" + leftWristX + "LeftWristY=" + leftWristY);
        console.log("RightWristX=" + rightWristX + "RightWristY=" + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    s1_status=song1.isPlaying();
    s2_status=song2.isPlaying();
    fill("#090979");
    stroke("#090979");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(s2_status==false)
        {
            song=song2;
            song.play();
        }
    }
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
    }
    dropdown = document.getElementById("instruments").value;
}

function play() {
    dropdown = document.getElementById("instruments").value;
    if (dropdown == "piano") {
        document.getElementById("sound1").innerHTML = "Nocturne No. 2";
        document.getElementById("sound2").innerHTML = "Arabesque No. 1";
        song3.stop();
        song4.stop();
        song5.stop();
        song6.stop();
        song7.stop();
        song8.stop();
        if (leftWristX > 0 && leftWristX <= 300) {
            song2.stop();
            song1.play();
        } else if (rightWristX > 300 && rightWristX <= 600) {
            song1.stop();
            song2.play();
        }
    }
}

function pause() {
    if (dropdown == "piano") {
        song3.pause();
        song4.pause();
    } else if (dropdown == "violin") {
        song1.pause();
        song2.pause();
    } else if (dropdown == "cello") {
        song5.pause();
        song6.pause();
    } else if (dropdown == "voice") {
        song7.pause();
        song8.pause();
    }
}

function end() {
    song3.stop();
    song4.stop();
    song1.stop();
    song2.stop();
    song5.stop();
    song6.stop();
    song7.stop();
    song8.stop();
}