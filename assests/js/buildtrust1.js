function typeWriterEffect(textElement, delay = 100, pause = 1000) {
    const letters = textElement.dataset.text.split(''); // Split text into individual letters
    let index = 0;

    function showNextLetter() {
        if (index < letters.length) {
            textElement.textContent += letters[index]; // Add next letter
            index++;
            setTimeout(showNextLetter, delay); // Move to the next letter
        } else {
            // Pause before starting to clear the text
            setTimeout(() => clearText(textElement), pause);
        }
    }

    function clearText(textElement) {
        const currentText = textElement.textContent;
        let clearIndex = currentText.length - 1; // Start from the end

        function hideNextLetter() {
            if (clearIndex >= 0) {
                textElement.textContent = currentText.slice(0, clearIndex); // Remove last letter
                clearIndex--;
                setTimeout(hideNextLetter, delay); // Move to the previous letter
            } else {
                // Move to the next dynamic text after clearing
                moveToNextText(textElement);
            }
        }

        hideNextLetter();
    }

    function moveToNextText(currentElement) {
        const nextElement = currentElement.nextElementSibling; // Get the next dynamic text
        if (nextElement) {
            nextElement.classList.add('active'); // Mark it as active
            setTimeout(() => {
                typeWriterEffect(nextElement, delay, pause); // Start typing the next text
            }, 500); // Delay before typing the next text
        } else {
            // If there are no more texts, restart from the beginning
            const firstElement = currentElement.parentNode.firstElementChild;
            firstElement.classList.add('active'); // Activate the first text
            setTimeout(() => {
                typeWriterEffect(firstElement, delay, pause); // Start typing the first text
            }, 500); // Delay before restarting
        }
    }

    showNextLetter(); // Start typing effect
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const dynamicTexts = document.querySelectorAll('.elementor-headline-dynamic-text');
    if (dynamicTexts.length > 0) {
        dynamicTexts[0].classList.add('active'); // Start with the first text visible
        typeWriterEffect(dynamicTexts[0]);
    }
});

// Add click functionality to review labels
const reviewLabels = document.querySelectorAll('.review-label');

reviewLabels.forEach(label => {
    label.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Remove active class from all labels
        reviewLabels.forEach(lbl => lbl.classList.remove('active'));
        // Add active class to the clicked label
        this.classList.add('active');

        // Filter testimonials based on the selected filter
        testimonials.forEach(testimonial => {
            const platform = testimonial.getAttribute('data-platform');
            if (filter === 'all' || platform === filter) {
                testimonial.style.display = 'block'; // Show the testimonial
            } else {
                testimonial.style.display = 'none'; // Hide the testimonial
            }
        });

        // Reset current index and show the first visible testimonial
        currentIndex = 0;
        showTestimonial(currentIndex);
    });
});
