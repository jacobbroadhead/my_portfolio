document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('reel-player');
  const playPauseButton = document.getElementById('play-pause-button');
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');
  const progressBar = document.getElementById('progress');
  const timeDisplay = document.getElementById('time-display');
  const cards = document.querySelectorAll('.card');
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

      // Update time display
      timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
    }
  }

  // Function to toggle play/pause icon
  function togglePlayPauseIcon() {
    if (audioPlayer.paused) {
      playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Replace with Unicode if preferred
    } else {
      playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Replace with Unicode if preferred
    }
  }

  // Function to play a track and update selection
  function playTrack(index) {
    // Remove 'selected' class from all cards
    cards.forEach(card => {
      card.classList.remove('selected-animate', 'selected-vg', 'selected-tv', 'selected-books');
    });

    // Get the new card and add 'selected' class
    const newCard = cards[index];
    newCard.classList.add('selected-' + newCard.className.split(' ')[1]); // Adjust based on your selected class naming convention

    const reelSrc = newCard.getAttribute('data-reel');
    const reelTitle = newCard.querySelector('h5').textContent;
    const reelType = newCard.querySelector('.type').textContent;

    audioPlayer.src = reelSrc;
    document.getElementById('reel-info').innerHTML = `<h3>${reelTitle}</h3><p>Character Type: ${reelType}</p>`;
    audioPlayer.play();

    currentTrackIndex = index;
    togglePlayPauseIcon();
  }

  // Play/Pause Toggle
  playPauseButton.addEventListener('click', function() {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    togglePlayPauseIcon();
  });

  // Next Button
  nextButton.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex + 1) % cards.length;
    playTrack(currentTrackIndex);
  });

  // Back Button
  backButton.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex - 1 + cards.length) % cards.length;
    playTrack(currentTrackIndex);
  });

  // Attach click event to each card
  cards.forEach((card, index) => {
    card.addEventListener('click', function() {
      playTrack(index);
    });
  });

  // Update play/pause button icon and progress bar when audio state changes
  audioPlayer.addEventListener('play', togglePlayPauseIcon);
  audioPlayer.addEventListener('pause', togglePlayPauseIcon);
  audioPlayer.addEventListener('timeupdate', updateProgressBar);

  // Initialize time display on metadata load
  audioPlayer.addEventListener('loadedmetadata', function() {
    timeDisplay.textContent = `0:00 / ${formatTime(audioPlayer.duration)}`;
  });

  // ... any other event listeners or functions ...
});
