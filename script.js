document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    // Get the reel source, title, and type from the clicked card
    const reelSrc = this.getAttribute('data-reel');
    const reelTitle = this.querySelector('h5').textContent;
    const reelType = this.querySelector('.type').textContent;

    // Update the audio source in the reel player
    document.getElementById('reel-player').src = reelSrc;

    // Update the reel info in the preview window
    document.getElementById('reel-info').innerHTML = `<h3>${reelTitle}</h3><p>Character Type: ${reelType}</p>`;
  });
});

// Add a click event listener to accordion buttons
document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    // Close all accordions except the one that was clicked
    document.querySelectorAll('.accordion-collapse').forEach(collapse => {
      if (collapse.id !== button.getAttribute('data-bs-target').slice(1)) {
        collapse.classList.remove('show');
      }
    });
  });
});
