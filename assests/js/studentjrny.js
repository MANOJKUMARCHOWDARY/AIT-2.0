  // Function to update the journey line position based on the active card
  function updateJourneyLine() {
    const journeyLine = document.querySelector('.journey-line');
    const cards = document.querySelectorAll('.jrny-cards .card');

    // Get the bounding rectangle of the first card to position the line
    const firstCard = cards[0].getBoundingClientRect();
    const lastCard = cards[cards.length - 1].getBoundingClientRect();

    // Calculate the width and position for the journey line
    const lineHeight = lastCard.bottom - firstCard.top;
    const lineTop = firstCard.top + window.scrollY; // Scroll position adjustment

    // Set the height and top position of the journey line
    journeyLine.style.height = lineHeight + 'px';
    journeyLine.style.top = lineTop + 'px';
  }

  // Call the function to set the initial position
  window.onload = updateJourneyLine;

  // Optionally, call it on resize for responsive adjustments
  window.onresize = updateJourneyLine;

