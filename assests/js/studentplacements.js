const dataOne = [
  { name: "Tanisha Sharma", package: "20 LPA • Digital Marketing", image: "https://www.inventateq.com/images/reviews/14f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" },
  { name: "Nikita Jain", package: "15 LPA • Sales", image: "https://www.inventateq.com/images/reviews/19m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" },
  { name: "Kirandeep", package: "15 LPA • Application Testing", image: "https://www.inventateq.com/images/reviews/43f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" },
  { name: "Sahana", package: "9.2 LPA • Data Science", image: "https://www.inventateq.com/images/reviews/18m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" }
];

const dataTwo = [
  { name: "Laxmi Roy", package: "16 LPA • Backend Developer", image: "https://www.inventateq.com/images/reviews/40f.webp", logo: "https://www.inventateq.com/images/reviews/18m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" },
  { name: "Sahil Kumar", package: "20 LPA • Marketing", image: "https://www.inventateq.com/images/reviews/5f.webp", logo: "https://www.inventateq.com/images/reviews/18m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" },
  { name: "Sahana", package: "9.2 LPA • Data Science", image: "https://www.inventateq.com/images/reviews/43f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", logo: "https://www.inventateq.com/images/reviews/18m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" },
  { name: "Sahana", package: "9.2 LPA • Data Science", image: "https://www.inventateq.com/images/reviews/18m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp" }
];

// Helper function to create card elements
function createCard(item) {
  const card = document.createElement('div');
  card.className = 'placement-record';
  card.innerHTML = `
      <span class="upper-section text-center">
          <img src="${item.image}" alt="${item.name}">
          <div class="sp-10"></div>
          <p class="name" style="font-weight:600">${item.name}</p>
          <p class="package">${item.package}</p>
          <div class="sp-10"></div>
          <img src="${item.logo}" class="brand" alt="Company Logo">
      </span>
  `;
  return card;
}
function initCarousel() {
  const sliderContentOne = document.getElementById('slider-content-one');
  const sliderContentTwo = document.getElementById('slider-content-two');

  // Append cards to the first slider from dataOne
  dataOne.forEach(item => {
    const card = createCard(item);
    sliderContentOne.appendChild(card);
  });

  // Append cards to the first slider from dataTwo (duplicates)
  dataTwo.forEach(item => {
    const card = createCard(item);
    sliderContentOne.appendChild(card); // Append duplicate to slider 1
  });

  // Append cards to the second slider from dataTwo (original cards)
  dataTwo.forEach(item => {
    const card = createCard(item);
    sliderContentTwo.appendChild(card); // Only original cards in slider 2
  });
  dataOne.forEach(item => {
    const card = createCard(item);
    sliderContentTwo.appendChild(card); // Only original cards in slider 2
  });



  // Show the first slider by default
  sliderContentOne.classList.add('active');
  let currentSlide = 0;
  const sliders = [sliderContentOne, sliderContentTwo];
  let isPaused = false; // Flag to track if the carousel is paused
  let pauseTimeout; // Variable to hold the timeout ID

  // Function to show the current slider
  function showSlide(index) {
    sliders.forEach((slider, i) => {
      slider.classList.toggle('active', i === index);
    });
  }

  // Next button functionality
  document.getElementById('next').addEventListener('click', () => {
    if (!isPaused) {
      currentSlide = (currentSlide + 1) % sliders.length;
      showSlide(currentSlide);
    }
  });

  // Previous button functionality
  document.getElementById('prev').addEventListener('click', () => {
    if (!isPaused) {
      currentSlide = (currentSlide - 1 + sliders.length) % sliders.length;
      showSlide(currentSlide);
    }
  });

  // Pause carousel on hover with a delay
  function pauseCarousel() {
    console.log("Preparing to pause carousel...");
    pauseTimeout = setTimeout(() => {
      console.log("Carousel paused");
      isPaused = true;
    }, 500); // Delay for 500ms before pausing
  }

  function resumeCarousel() {
    console.log("Carousel resumed");
    clearTimeout(pauseTimeout); // Clear the timeout if the mouse leaves early
    isPaused = false;
  }

  // Add hover event listeners to cards in both sliders
  const cardsOne = sliderContentOne.querySelectorAll('.card'); // Assuming card class
  const cardsTwo = sliderContentTwo.querySelectorAll('.card'); // Assuming card class

  [...cardsOne, ...cardsTwo].forEach(card => {
    card.addEventListener('mouseenter', pauseCarousel);
    card.addEventListener('mouseleave', resumeCarousel);
  });
}
initCarousel();
// Wait for the DOM to load before initializing the carousel
document.addEventListener('DOMContentLoaded', initCarousel);





