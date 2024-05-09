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

    function resetProgressBar() {
        progressBar.style.width = '0%';  // Explicitly set to 0% on load
    }

    function updateProgressBar() {
        if (audioPlayer.duration) {
            const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = percentage + '%';
        } else {
            resetProgressBar();  // Reset if there's no duration
        }
        timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
    }

    function togglePlayPauseIcon() {
        playPauseButton.innerHTML = audioPlayer.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    }

    function playTrack(index) {
        resetProgressBar();  // Reset progress bar whenever a new track is loaded
        cards.forEach(card => card.classList.remove('selected-animate', 'selected-vg', 'selected-tv', 'selected-books'));
        const newCard = cards[index];
        newCard.classList.add('selected-' + newCard.className.split(' ')[1]);
        audioPlayer.src = newCard.getAttribute('data-reel');
        
        // Set the title in the preview window
        const trackTitle = newCard.getAttribute('data-title');  // Assuming the title is stored in data-title attribute
        document.getElementById('track-title').textContent = trackTitle || 'Select a reel to listen here.';  // Set the title or default text

        audioPlayer.play();
        currentTrackIndex = index;
        togglePlayPauseIcon();
    }

    playPauseButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    nextButton.addEventListener('click', () => playTrack((currentTrackIndex + 1) % cards.length));
    backButton.addEventListener('click', () => playTrack((currentTrackIndex - 1 + cards.length) % cards.length));
    cards.forEach((card, index) => card.addEventListener('click', () => playTrack(index)));
    audioPlayer.addEventListener('play', togglePlayPauseIcon);
    audioPlayer.addEventListener('pause', togglePlayPauseIcon);
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    audioPlayer.addEventListener('loadedmetadata', () => {
        resetProgressBar();  // Ensure it's reset when new metadata is loaded
        timeDisplay.textContent = `0:00 / ${formatTime(audioPlayer.duration)}`;
    });

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

    resetProgressBar();  // Initial reset on page load
});


