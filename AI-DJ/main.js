music=""
leftwristy=0
leftwristx=0
rightwristx=0
rightwristy=0
scoreLeftwrist=0;
scorerightwrist=0;
function setup(){
    canvas=createCanvas(600,500)
    canvas.center()

   video=createCapture(VIDEO)
      video.hide()

      poseNet=ml5.poseNet(video,modelloaded)
      poseNet.on('pose',Gotposes)
}
function draw(){
image( video,0,0,600,500)


fill("#000000")

stroke("#800080")

if(scorerightwrist>0.2){


circle(rightwristx,rightwristy,20)
if(rightwristy>0 && rightwristy <=100){
    music.rate(0.5)
    document.getElementById("speed").innerHTML="speed = 0.5x"
}
if(rightwristy>100 && rightwristy <=200){
    music.rate(1)
    document.getElementById("speed").innerHTML="speed =1x"
}
if(rightwristy>200 && rightwristy <=300){
    music.rate(1.5)
    document.getElementById("speed").innerHTML="speed = 1.5x"
}
if(rightwristy>300 && rightwristy <=400){
    music.rate(2)
    document.getElementById("speed").innerHTML="speed = 2x"

}
if(rightwristy>400 && rightwristy <=500){
    music.rate(2.5)
    document.getElementById("speed").innerHTML="speed = 2.5x"
}
}



if(scoreLeftwrist>0.2){
circle(leftwristx,leftwristy,20)
InNumberleftwristy=Number(leftwristy);
remove_decimals =floor(InNumberleftwristy);
volume=remove_decimals/500
document.getElementById("volume").innerHTML="Volume ="+volume;
music.setVolume(volume);
}
}
function preload(){   
          music=loadSound("music.mp3")                                                              
}
function play_songs(){
    music.play()
    music.setVolume(0.4)   
    music.rate(0.9)
}
function modelloaded(){
    console.log("poseNet is initialized")
}
function Gotposes(results){
if(results.length>0){
    console.log(results)
    scoreLeftwrist= results[0].pose.keypoints[9].score;
    console.log("scoreLeftwrist="+ scoreLeftwrist);
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("scorerightwrist="+scorerightwrist)
    leftwristx=results[0].pose.leftWrist.x
    leftwristy=results[0].pose.leftWrist.y
    rightwristx=results[0].pose.rightWrist.x
    rightwristy=results[0].pose.rightWrist.y
    console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy)
    console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy)
}
}
