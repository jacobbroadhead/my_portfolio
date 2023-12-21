document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('reel-player');
  const playPauseButton = document.getElementById('play-pause-button');
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');
  const progressBar = document.getElementById('progress');
  const timeDisplay = document.getElementById('time-display');
  const cards = document.querySelectorAll('.card');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const previewWindow = document.getElementById('preview-window');
  let currentTrackIndex = 0;

  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsPart = Math.floor(seconds % 60);
      return `${minutes}:${secondsPart.toString().padStart(2, '0')}`;
  }

  function updateProgressBar() {
      if (audioPlayer.duration) {
          const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
          progressBar.style.width = percentage + '%';
          timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
      }
  }

  function togglePlayPauseIcon() {
      playPauseButton.innerHTML = audioPlayer.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
  }

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

  playPauseButton.addEventListener('click', () => audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause());
  nextButton.addEventListener('click', () => playTrack((currentTrackIndex + 1) % cards.length));
  backButton.addEventListener('click', () => playTrack((currentTrackIndex - 1 + cards.length) % cards.length));
  cards.forEach((card, index) => card.addEventListener('click', () => playTrack(index)));
  audioPlayer.addEventListener('play', togglePlayPauseIcon);
  audioPlayer.addEventListener('pause', togglePlayPauseIcon);
  audioPlayer.addEventListener('timeupdate', updateProgressBar);
  audioPlayer.addEventListener('loadedmetadata', () => timeDisplay.textContent = `0:00 / ${formatTime(audioPlayer.duration)}`);

  function scrollToAccordionItem(item) {
      const previewWindowHeight = previewWindow.offsetHeight;
      const accordionTop = item.getBoundingClientRect().top + window.pageYOffset;
      const positionToScroll = accordionTop - previewWindowHeight;

      window.scrollTo({
          top: positionToScroll,
          behavior: 'smooth'
      });
  }

  function updateAccordionButtons() {
      const openItems = Array.from(accordionItems).filter(item => !item.querySelector('.accordion-collapse').classList.contains('collapse'));
      accordionItems.forEach(item => {
          const button = item.querySelector('.accordion-button');
          if (openItems.length === 1 && openItems.includes(item)) {
              button.setAttribute('disabled', 'disabled');
          } else {
              button.removeAttribute('disabled');
          }
      });
  }

  accordionItems.forEach(item => {
      const button = item.querySelector('.accordion-button');
      button.addEventListener('click', function() {
          setTimeout(() => {
              updateAccordionButtons();
              if (!button.classList.contains('collapsed')) {
                  scrollToAccordionItem(item);
              }
          }, 0);
      });
  });

  updateAccordionButtons();

  // ... any other event listeners or functions ...
});
