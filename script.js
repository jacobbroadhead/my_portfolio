document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('reel-player');
  const playPauseButton = document.getElementById('play-pause-button');
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');
  const progressBar = document.getElementById('progress');
  const timeDisplay = document.getElementById('time-display');
  const cards = document.querySelectorAll('.card');
  const accordionButtons = document.querySelectorAll('.accordion-button');
  let currentTrackIndex = 0;

  // Function to format time in minutes:seconds
  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsPart = Math.floor(seconds % 60);
      return `${minutes}:${secondsPart.toString().padStart(2, '0')}`;
  }

  // Function to update the progress bar and time display
  function updateProgressBar() {
      if (audioPlayer.duration) {
          const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
          progressBar.style.width = percentage + '%';
          timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
      }
  }

  // Function to toggle play/pause icon
  function togglePlayPauseIcon() {
      playPauseButton.innerHTML = audioPlayer.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
  }

  // Function to play a track and update selection
  function playTrack(index) {
      cards.forEach(card => card.classList.remove('selected-animate', 'selected-vg', 'selected-tv', 'selected-books'));
      const newCard = cards[index];
      newCard.classList.add('selected-' + newCard.className.split(' ')[1]);
      audioPlayer.src = newCard.getAttribute('data-reel');
      document.getElementById('reel-info').innerHTML = `<h3>${newCard.querySelector('h5').textContent}</h3><p>Character Type: ${newCard.querySelector('.type').textContent}</p>`;
      audioPlayer.play();
      currentTrackIndex = index;
      togglePlayPauseIcon();
  }

  // Event listeners for the audio player buttons
  playPauseButton.addEventListener('click', () => audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause());
  nextButton.addEventListener('click', () => playTrack((currentTrackIndex + 1) % cards.length));
  backButton.addEventListener('click', () => playTrack((currentTrackIndex - 1 + cards.length) % cards.length));
  cards.forEach((card, index) => card.addEventListener('click', () => playTrack(index)));
  audioPlayer.addEventListener('play', togglePlayPauseIcon);
  audioPlayer.addEventListener('pause', togglePlayPauseIcon);
  audioPlayer.addEventListener('timeupdate', updateProgressBar);
  audioPlayer.addEventListener('loadedmetadata', () => timeDisplay.textContent = `0:00 / ${formatTime(audioPlayer.duration)}`);

  // Accordion logic to keep one section open at all times
  accordionButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          if (!this.classList.contains('collapsed')) {
              const openCount = Array.from(accordionButtons).filter(btn => !btn.classList.contains('collapsed')).length;
              if (openCount <= 1) {
                  event.preventDefault();
                  event.stopPropagation();
              }
          }
      });
  });

  // ... any other event listeners or functions ...
});
 
