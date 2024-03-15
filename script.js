console.log("welcome to spotify");



//initialize the variable:

let songIndex=0;
let AudioElement = new Audio('tools/Aasman mei.mp3');
// let AudioElement = new Audio('tools/tuz.mp3');
let masterPlay = document.getElementById('masterPlay');
let MyProgressBar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let song=[
    {songName:"Jag Ghoomeya", filePath:'tools/1.mp3', coverPath:'tools/img1.jpg'},
    {songName:"Sukoon Mila", filePath:"tools/2.mp3", coverPath:'tools/img2.jpg'},
    {songName:"Tuz Mei Rab Dikhta Hai", filePath:"tools/3.mp3", coverPath:'tools/img3.jpg'},
    {songName:"Ek hazaro mei meri bahana hai", filePath:"tools/4.mp3", coverPath:'tools/img4.jpg'},
    {songName:"Mere liye tum ", filePath:"tools/5.mp3",coverPath:'tools/img1.jpg'},
    {songName:"Baki thodi si", filePath:"tools/6.mp3",coverPath:'tools/img2.jpg'},
    {songName:"Tum prem ho", filePath:"tools/7.mp3",coverPath:'tools/img3.jpg'},
    {songName:"Aisa lagta hai", filePath:"tools/8.mp3", coverPath:'images/img4.jpg'},
    {songName:"Teri meri yari ko", filePath:"tools/9.mp3", coverPath:'images/img1.jpg'},

]

songItem.forEach((element,i)=>{
    // console.log(element,i);
element.getElementsByTagName('img')[0].src = song[i].coverPath;
element.getElementsByClassName('songName')[0].innerText = song[i].songName;
})


// AudioElement.play();


//handle play pause events
    masterPlay.addEventListener('click', ()=>{
    if(AudioElement.paused || AudioElement.CurrentTime<=0){
//because of above PAUSED ,the event of else was not working. I was using pause
        AudioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }

    //event of else is not working properly.playing music does not get stop

else{
        AudioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    
    }
})

//listen to events
AudioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate'); //it updates the time

    //update seekbar
    progress = parseInt((AudioElement.currentTime/AudioElement.duration)*100);
    // console.log(progress) ;//shows how much progress is done
    MyProgressBar.value = progress ;
})

MyProgressBar.addEventListener('change',()=>{
    AudioElement.currentTime = (MyProgressBar.value *  AudioElement.duration)/100 ;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
 console.log(e.target);
 makeAllPlays();
 masterSongName.innerText = song[songIndex].songName;
songIndex = parseInt(e.target.id);
 e.target.classList.remove('fa-play-circle');
 e.target.classList.add('fa-pause-circle');
 AudioElement.src = `tools/${songIndex+1}.mp3`;//here is the only problem for playing the song
 masterSongName.innerText = song[songIndex].songName;
 AudioElement.currentTime=0;
 AudioElement.play();
 gif.style.opacity=1;
 masterPlay.classList.remove('fa-play-circle');
 masterPlay.classList.add('fa-pause-circle');


    })
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0 ;
    }
    else{
    songIndex -= 1;
    }

`AudioElement.src = 'tools/${songIndex+1}.mp3`;
 masterSongName.innerText = song[songIndex].songName;
 AudioElement.currentTime=0;
 AudioElement.play();
 masterPlay.classList.remove('fa-play-circle');
 masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0 ;
    }
    else{
    songIndex += 1;
    }

 AudioElement.src = `tools/${songIndex+1}.mp3`;
 masterSongName.innerText = song[songIndex].songName;
 AudioElement.currentTime=0;
 AudioElement.play();
 masterPlay.classList.remove('fa-play-circle');
 masterPlay.classList.add('fa-pause-circle');
})