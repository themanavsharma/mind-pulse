const audioPlayer = document.getElementById('myAudio');
const playButton = document.getElementById('play-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const volumeDownButton = document.getElementById('volume-down');
const volumeUpButton = document.getElementById('volume-up');


const songs = [
   'Songs/60-minutes-of-ultra-soft-noise-v2-25123.mp3',
   'Songs/gentle-ocean-waves-birdsong-and-gull-7109.mp3',
   'Songs/heavy-rain-white-noise-159772.mp3',
   // Add the rest of your songs here
];
let currentSongIndex = 0;


function loadSong(songIndex) {
   audioPlayer.src = songs[songIndex];
   audioPlayer.play();
}


playButton.addEventListener('click', () => {
   if (audioPlayer.paused) {
       audioPlayer.play();
       playButton.textContent = '⏸'; // Change to pause symbol
   } else {
       audioPlayer.pause();
       playButton.textContent = '▶'; // Change to play symbol
   }
});


prevButton.addEventListener('click', () => {
   currentSongIndex--;
   if (currentSongIndex < 0) {
       currentSongIndex = songs.length - 1;
   }
   loadSong(currentSongIndex);
});


nextButton.addEventListener('click', () => {
   currentSongIndex++;
   if (currentSongIndex > songs.length - 1) {
       currentSongIndex = 0;
   }
   loadSong(currentSongIndex);
});


volumeSlider.addEventListener('input', (e) => {
   audioPlayer.volume = e.target.value;
});


volumeDownButton.addEventListener('click', () => {
   audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
   volumeSlider.value = audioPlayer.volume;
});


volumeUpButton.addEventListener('click', () => {
   audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
   volumeSlider.value = audioPlayer.volume;
});


// Load the first song on page load
loadSong(currentSongIndex);


