let audio = document.createElement('audio');
let playBtn = document.getElementById('playBtn');
let isPlaying = false;
let durationEl = document.getElementById('duration');
let currentTimeEl = document.getElementById('currentTime');
let musicSlider = document.getElementById('musicSlider');
let btnVolume = document.getElementById('btnVolume');
let volumeSliderWrapper = document.getElementById('volumeSliderWrapper');
let volumeSlider = document.getElementById('volumeSlider');
let musicInfo = document.getElementById('musicInfo');
let buttonNext = document.getElementById('buttonNext');
let buttonPrev = document.getElementById('buttonPrev');
let musicImg = document.getElementById('musicImg');
let musicName = document.getElementById('musicName');
let musicArtist = document.getElementById('musicArtist');
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');
let musicBars = document.getElementById('musicBars');
let modal = document.getElementById('modal');
let duration = 0;
let modalClose = document.getElementById('modalClose');
let modalImg = document.getElementById('modalImg');
let modalName = document.getElementById('modalName');
let modalArtist = document.getElementById('modalArtist');
let modalContent = document.getElementById('modalContent');
let view = document.getElementById('view');

let currentSongIndex = 0;

let musicList = [
    {
        image: 'https://data.opus3a.com/product_photo/70/70620d07faa76241ecf27bf7fd526312/max/638635dc5a54f121e61ce9a11d44ecda.jpg',
        name: 'Eski köprünün altında',
        artist: 'duman',
        music: 'sounds/piano.wav'

    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/en/4/43/Alice_In_Chains-Facelift.jpg',
        name: 'There is Hope',
        artist: 'There is hope',
        music: 'sounds/there-is-hope.wav'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/en/2/2d/PearlJam-Ten2.jpg',
        name: 'Unnamed',
        artist: 'Unnamed',
        music: 'sounds/sound1.mp3'
    }
];

print();

//Audio nesnesine yeni bir ses yüklendiğinde bu callback fonksiyonu çalışır.
audio.onloadedmetadata = function () {
    duration = audio.duration;
    musicSlider.setAttribute('max', parseInt(duration));

    currentTimeEl.innerHTML = '00:00';
    durationEl.innerHTML = convertTime(duration);
    musicSlider.value = '0';

    showNotification();
};

function convertTime(time) {
    let min = 0;
    let sec = 0;

    if (time > 60) {
        min = parseInt(time / 60);
        sec = parseInt(time - (min * 60));
    } else {
        sec = parseInt(time);
    }

    if (min < 10)
        min = '0' + min;

    if (sec < 10)
        sec = '0' + sec;

    return min + ':' + sec;
}

setInterval(function () {
    if (isPlaying) {
        currentTimeEl.innerHTML = convertTime(audio.currentTime);
        musicSlider.value = audio.currentTime;

        if (audio.currentTime == duration) {
            nextButton();
        }
    }

}, 200);

function pause() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play play-icon"></i>';
}

function play() {
    currentTimeEl.innerHTML = convertTime(audio.currentTime);
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause play-icon"></i>';

}

playBtn.addEventListener('click', function (e) {
    if (isPlaying) {
        pause();
    } else {
        play();
    }

    // isPlaying = !isPlaying; // boolean değişkenleri tersine çevirir...
});

document.body.appendChild(audio);

musicSlider.addEventListener('change', function () {
    audio.currentTime = musicSlider.value;
});

btnVolume.addEventListener('click', function () {
    if (volumeSliderWrapper.style.display == 'block') {
        volumeSliderWrapper.style.display = 'none';
    } else {
        volumeSliderWrapper.style.display = 'block';
    }
});

document.addEventListener('click', function (e) {
    if (e.target.id != 'volumeSlider' && e.target.id != 'btnVolume') {
        volumeSliderWrapper.style.display = 'none';
    }
});

volumeSlider.addEventListener('change', function () {
    audio.volume = volumeSlider.value;
});

function nextButton() {
    if (currentSongIndex >= musicList.length - 1) {
        currentSongIndex = 0;
    } else {
        currentSongIndex++;
    }

    print();
    pause();
}

buttonNext.addEventListener('click', function () {
    nextButton();
});
function prev(){
    if (currentSongIndex <= 0) {
        currentSongIndex = musicList.length - 1;
    } else {
        currentSongIndex--;

    }
    print();
    pause();
}
buttonPrev.addEventListener('click', function () {
    prev();

});

function print() {
    musicImg.src = musicList[currentSongIndex].image;
    musicName.innerHTML = musicList[currentSongIndex].name;
    musicArtist.innerHTML = musicList[currentSongIndex].artist;
    audio.src = musicList[currentSongIndex].music;
}

forward.addEventListener('click', function () {
    audio.currentTime += 10;
    if (!isPlaying) {
        play();
    }
});

backward.addEventListener('click', function () {
    audio.currentTime -= 10;
    if (!isPlaying) {
        play();
    }
    if(audio.currentTime<=0){
        prev();
    }
});

musicBars.addEventListener('click', function () {

    modal.style.display = 'block';

});
modalClose.addEventListener('click', function () {
    modal.style.display = 'none';
});


musicList.forEach(function (item, i) {
    let songItem = document.createElement('div');
    let songText = document.createElement('div');

    let songImg = document.createElement('img');
    let songName = document.createElement('div');
    let songArtist = document.createElement('div');

    songImg.src = item.image;
    songName.innerHTML = item.name;
    songArtist.innerHTML = item.artist;

    songImg.classList.add('songImg');


    songText.appendChild(songName);
    songText.appendChild(songArtist);

    songItem.appendChild(songImg);
    songItem.appendChild(songText);

    songItem.classList.add('songItem');
    songText.classList.add('songText');

    modalContent.appendChild(songItem);

    songItem.dataset.target = i;

    songItem.addEventListener('click',function (){
        currentSongIndex = this.dataset.target;
        print();
        play();
        modal.style.display = 'none';
    });

});

function showNotification(){
    let song = musicList[currentSongIndex];

    //Eğer daha önce oluşmuş bir notification elementi var ise, yeni bir tane oluşturmadan önce onu ekrandan kaldıralım.
    let notifications = document.querySelectorAll('.notification');
    if(notifications.length > 0){
        notifications.forEach(function (notificationItem, i){
           notificationItem.remove();
        });
    }

    let notification = document.createElement('div');
    let notificationImg = document.createElement('img');
    let notificationInfo = document.createElement('div');
    let notificationName = document.createElement('div');
    let notificationArtist = document.createElement('div');

    notificationImg.src = song.image;
    notificationName.innerHTML = song.name;
    notificationArtist.innerHTML = song.artist;

    notification.classList.add('notification');

    notificationInfo.appendChild(notificationName);
    notificationInfo.appendChild(notificationArtist);

    notification.appendChild(notificationImg);
    notification.appendChild(notificationInfo);

    view.appendChild(notification);

    setTimeout(function (){
        notification.remove();
    }, 3000);
}