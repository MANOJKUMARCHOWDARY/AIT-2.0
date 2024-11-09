
// Testimonial data (array of objects)
const testimonials = [
    {
        name: "Milton Austin",
        position: "Sales Manager, Stack",
        image: "./assests/images/review-pic-2.png",
        reviewTitle: "It was a great experience",
        stars: 3,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        category: "google" // Added category
    },
    {
        name: "John Reeves",
        position: "Head of Sales, Asana",
        image: "./assests/images/review-pic-3.avif",
        reviewTitle: "Thanks for this great service",
        stars: 5,
        review: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                 nisi ut aliquip ex ea commodo consequat.`,
        category: "linkedin" // Added category
    },
    {
        name: "Luke Harper",
        position: "Sales Team Lead, Sketch",
        image: "./assests/images/pic-1.png",
        reviewTitle: "You all are awesome, thanks a lot!",
        stars: 4,
        review: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                 eu fugiat nulla pariatur.`,
        category: "all" // Added category
    },
];

// Function to create star rating HTML
function generateStars(count) {
    let starsHtml = '';
    for (let i = 0; i < count; i++) {
        starsHtml += '<i class="fa fa-star text-warning"></i>'; // Added text-warning class for yellow stars
    }
    return starsHtml;
}

// Function to generate testimonial cards dynamically
function generateTestimonials(filter = "all") {
    const testimonialList = document.getElementById('testimonialList');
    const reviewContainer = document.getElementById('reviewContainer');

    testimonialList.innerHTML = ''; // Clear existing testimonials
    reviewContainer.innerHTML = ''; // Clear existing reviews

    testimonials.forEach((testimonial, index) => {
        if (filter === "all" || testimonial.category === filter) {
            // Create a card for each testimonial that matches the filter
            const card = document.createElement('li');
            card.innerHTML = `
                <div class="card p-3 bx-shadow border-0" data-toggle="collapse" data-target="#collapse${index}" 
                     aria-expanded="${index === 0}" aria-controls="collapse${index}">
                    <div class="d-flex flex-row align-items-center gap-3">
                        <img src="${testimonial.image}" width="70" height="70" class="rounded-circle p-0">
                        <div class="d-flex flex-column ml-2">
                            <span class="font-weight-normal">${testimonial.name}</span>
                            <span>${testimonial.position}</span>
                        </div>
                    </div>
                </div>
            `;
            testimonialList.appendChild(card);

            // Create a corresponding review section
            const review = document.createElement('div');
            review.id = `collapse${index}`;
            review.className = `collapse ${index === 0 && filter === "all" ? 'show' : ''}`;
            review.innerHTML = `
                <div class="card-body">
                    <h4>${testimonial.reviewTitle}</h4>
                    <div class="ratings">
                        ${generateStars(testimonial.stars)}
                    </div>
                    <p>${testimonial.review}</p>
                </div>
            `;
            reviewContainer.appendChild(review);
        }
    });
}

// Autoplay functionality
document.addEventListener("DOMContentLoaded", function() {
    // Start with the first testimonial visible
    let currentIndex = 0;
    let currentFilter = "all"; // Track the current filter
    let testimonialsElements;

    // Function to show the current testimonial
    function showTestimonial(index) {
        // Collapse all testimonials and remove active class
        testimonialsElements.forEach((testimonial, idx) => {
            const targetId = testimonial.getAttribute('data-target').substring(1);
            const collapseElement = document.getElementById(targetId);
            collapseElement.classList.remove('show'); // Collapse all testimonials
            testimonial.classList.remove('active'); // Remove active class
        });
        
        // Show the current testimonial
        const currentTestimonial = testimonialsElements[index];
        const currentTargetId = currentTestimonial.getAttribute('data-target').substring(1);
        const currentCollapseElement = document.getElementById(currentTargetId);
        currentCollapseElement.classList.add('show'); // Expand current testimonial
        
        // Add active class to current testimonial
        currentTestimonial.classList.add('active');
    }

    // Show the first testimonial as active by default
    generateTestimonials(currentFilter);
    testimonialsElements = document.querySelectorAll('.testimonial-list .card');
    showTestimonial(currentIndex);

    // Cycle through testimonials every 5 seconds
    let interval = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonialsElements.length; // Move to the next index
        showTestimonial(currentIndex);
    }, 5000); // Change testimonial every 5 seconds

    // Add click functionality to testimonials
    testimonialsElements.forEach((testimonial, idx) => {
        testimonial.addEventListener('click', function() {
            currentIndex = idx; // Set the current index to the clicked testimonial
            showTestimonial(currentIndex); // Show the clicked testimonial
            clearInterval(interval); // Stop the automatic cycling
            // Restart the interval after a delay, if desired
            interval = setInterval(function() {
                currentIndex = (currentIndex + 1) % testimonialsElements.length; // Move to the next index
                showTestimonial(currentIndex);
            }, 5000); // Change testimonial every 5 seconds
        });
    });

    // Event listeners for filter buttons
    document.getElementById('allReviews').addEventListener('click', function() {
        updateFilter("all", this);
    });
    document.getElementById('googleReviews').addEventListener('click', function() {
        updateFilter("google", this);
    });
    document.getElementById('linkedinReviews').addEventListener('click', function() {
        updateFilter("linkedin", this);
    });

    // Function to update filter and button styles
    function updateFilter(filter, activeButton) {
        currentFilter = filter;
        generateTestimonials(currentFilter);
        testimonialsElements = document.querySelectorAll('.testimonial-list .card'); // Update testimonialsElements
        currentIndex = 0; // Reset to first testimonial
        showTestimonial(currentIndex);
        updateButtonStyles(activeButton); // Update styles for active button
    }

    // Function to update button styles
    function updateButtonStyles(activeButton) {
        const buttons = document.querySelectorAll('.btn-review, .btn-google, .btn-linkedin');
        buttons.forEach((button) => {
            button.classList.remove('btn-active'); // Remove active class from all buttons
        });
        activeButton.classList.add('btn-active'); // Add active class to the clicked button
    }
});