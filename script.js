var audio = new Audio("assets/audio/letitgo.mp3");
var getVol;
var beforemute;


function init(){
    myFunc = function(){};
    document.getElementById("volumeSlider").addEventListener("input", setVolume);
    document.getElementById("volumeSlider").addEventListener("change", setVolume);
    setVolume();
    $('#toast').hide();
    // console.log("%cMade with ❤️ by tapped", "color: #199F4A; font-size: 20px;");
    
    document.addEventListener("keydown", function(e){
        if(e.keyCode == 32){
            if(audio.paused){
                playAudio();
            }else{
                pauseAudio();
            }
        }
    });

    var intervalId = window.setInterval(function(){
        progressBar();
        document.getElementById("audioProgress").dispatchEvent(new Event('input'));
      }, 200);
      
}


function playAudio () {
    audio.play();
    document.getElementById("playpause").setAttribute("name", "pause-circle-sharp");
    document.getElementById("playpause").setAttribute("onclick", "pauseAudio()");
}

function pauseAudio () {
    audio.pause();
    document.getElementById("playpause").setAttribute("name", "play-circle-sharp");
    document.getElementById("playpause").setAttribute("onclick", "playAudio()");
}

function stopAudio () {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("playpause").setAttribute("name", "play-circle-sharp");
    document.getElementById("playpause").setAttribute("onclick", "playAudio()");
}
function loopAudio() {
    if (audio.loop == false) {
        audio.loop = true;
        document.getElementById("loop").style.color = "#199F4A";
        document.getElementById("loop").style.opacity = "1";
    } else {
        audio.loop = false;
        document.getElementById("loop").style.color = "";
        document.getElementById("loop").style.opacity = "";
    }
}

function muteAudio() {
    if (audio.muted == false) {
        audio.muted = true;
        beforemute = audio.volume;
        audio.volume = 0;
        document.getElementById("volumeSlider").value = 0;
        document.getElementById("volumeSlider").dispatchEvent(new Event('input'));
        document.getElementById("ion-icon").setAttribute("name", "volume-mute");
    } else {
        audio.muted = false;
        audio.volume = beforemute;
        document.getElementById("volumeSlider").value = beforemute * 100;
        document.getElementById("volumeSlider").dispatchEvent(new Event('input'));
    }
}

function setVolume() {
    if (document.getElementById("volumeSlider").value < 10) {
        getVol = "0.0" + document.getElementById("volumeSlider").value;
    } else {
        getVol = "0." + document.getElementById("volumeSlider").value;
    }
    audio.volume = getVol;   
    if (getVol == 0.00) {document.getElementById("ion-icon").setAttribute("name", "volume-off-outline");}
    else if (getVol < 0.30) {document.getElementById("ion-icon").setAttribute("name", "volume-low-outline");}
    else if (getVol < 0.70) {document.getElementById("ion-icon").setAttribute("name", "volume-medium-outline");}
    else {document.getElementById("ion-icon").setAttribute("name", "volume-high-outline");}
}

function progressBar() { 
    var minutes1 = Math.floor(audio.currentTime / 60);
    var seconds1 = Math.floor(audio.currentTime - minutes1 * 60);
    var minutes = Math.floor(audio.duration / 60);
    var seconds = Math.floor(audio.duration - minutes * 60);
    var progress = document.getElementById("audioProgress");
    var value = 0;
    if (audio.currentTime > 0) {
        value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    progress.value = value;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    document.getElementById("duration").innerHTML = minutes + ":" + seconds;
    
    if (seconds1 < 10) {
        seconds1 = "0" + seconds1;
    } 
    document.getElementById("progress").innerHTML = minutes1 + ":" + seconds1;
    
}


function loveThisSong() {
    document.getElementById("heart").setAttribute("name", "heart");
    document.getElementById("heart2").setAttribute("name", "heart");
    document.getElementById("heart").setAttribute("onclick", "");
    document.getElementById("heart2").setAttribute("onclick", "");
    $.getJSON('http://ip-api.com/json/?fields=query,hosting', function(data) {
        console.log(data.hosting);
})
.done(function () {toast('Feedback has been sent! <3');})
.fail(function () {toast('Failed to send Feedback: try disabling adblockers', '#BA0000');})
}


function toast(text, color) {
    $('#toast-text').text(text);
    $('#toast').css('background-color', color);
    $('#toast').fadeIn(400).delay(4000).fadeOut(400);
}



// function toast(text) {
//     document.getElementById("toast-text").innerHTML = text;
//     var div = document.getElementById("toast");
//     div.style.opacity = "1";
//     setTimeout(function(){
//         div.style.opacity = "0";
//     }, 5000);
// }


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SONGS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
function shotsSong() {
    stopAudio();
    audio = new Audio('assets/audio/shots.mp3');
    document.getElementById("songName").innerHTML = "Shots";
    document.getElementById("artistName").innerHTML = "Lynr";
    document.getElementById("songCover").setAttribute("src", "assets/images/shots.jpg");
    playAudio();
}

  