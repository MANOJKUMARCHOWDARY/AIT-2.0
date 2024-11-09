const trendOptions = [
    { type: 'AI', label: 'AI', bkg: '' },
    { type: 'ML', label: 'ML', bkg: '' },
    { type: 'DevOps', label: 'DevOps', bkg: '' },
    { type: 'Testing', label: 'Testing', bkg: '' },
    { type: 'SoftwareDevelopment', label: 'SoftwareDevelopment', bkg: '' },
    { type: 'Management', label: 'Management', bkg: '' },
];

let visibleStartIndex = 0; // Index of the first visible option
let visibleOptionsCount = 5; // Number of options visible at a time
let currentActiveIndex = 0; // Track the currently active option
let visibleOptionsCountAdjusted = visibleOptionsCount; 

// Function to generate trend items dynamically
function generateOptions() {
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = ''; // Clear existing items

    // Adjust the visible options count based on screen size
    const isSmallScreen = window.innerWidth < 990;
    
    // Adjust the visibleOptionsCount for small screens (add one more option)
    if (isSmallScreen) {
        visibleOptionsCountAdjusted = visibleOptionsCount + 1; // Show one extra option for small screens
    } else {
        visibleOptionsCountAdjusted = visibleOptionsCount; // Default for larger screens
    }

    // Get the current slice of options to be displayed
    const visibleOptions = trendOptions.slice(visibleStartIndex, visibleStartIndex + visibleOptionsCountAdjusted);

    visibleOptions.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option-trenditem');
        optionDiv.setAttribute('data-type', option.type);
        optionDiv.textContent = option.label;

        // Add active class to the currently active item
        if (visibleStartIndex + index === currentActiveIndex) {
            optionDiv.classList.add('active');
        }

        // Event listener for updating the card content when an option is clicked
        optionDiv.addEventListener('click', () => {
            setActiveOption(visibleStartIndex + index);
            
            const activeOption = document.querySelector('.option-trenditem.active');
            if (activeOption) {
                activeOption.scrollIntoView({
                    behavior: 'smooth', // Smooth scrolling
                    block: 'nearest', // Scroll to the nearest position
                });
            }

            setTimeout(() => {
                updateCardContent(option.type);
            }, 300); 
        });

        optionsList.appendChild(optionDiv);
    });

    // Update the card content based on the active option
    updateCardContent(trendOptions[currentActiveIndex].type);
}

// Function to set the active option and handle smooth scrolling
function setActiveOption(index,isManualInteraction = false) {
    currentActiveIndex = index; // Update the global active index
    const options = document.querySelectorAll('.option-trenditem');

    // Remove the active class from all options
    options.forEach(option => option.classList.remove('active'));

    const activeOption = options[currentActiveIndex - visibleStartIndex];
    if (activeOption) {
        activeOption.classList.add('active'); // Add active class to the new active option
        if (isManualInteraction) {
            activeOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

    }
}

// Function to update the card content
function updateCardContent(type) {
    const cardTitle = document.querySelector('.card-title');
    const cardDescription = document.querySelector('.card-description');
    const cardItem = document.querySelector('.card-item');

    const selectedOption = trendOptions.find(option => option.type === type);

    switch (type) {
        case 'AI':
            cardTitle.textContent = "Artificial Intelligence";
            cardDescription.textContent = "AI courses are in high demand today, offering incredible career opportunities and benefits. Become part of the future by unlocking roles in innovative sectors.";
            break;
        case 'ML':
            cardTitle.textContent = "Machine Learning";
            cardDescription.textContent = "Machine Learning courses are opening up more than ever. Gain skills that offer automation benefits and open doors to exciting, high-impact careers.";
            break;
        case 'DevOps':
            cardTitle.textContent = "DevOps";
            cardDescription.textContent = "DevOps courses are trending, with immense opportunities to optimize workflows. Master DevOps and enjoy the benefits of efficient collaboration and faster project delivery.";
            break;
        case 'Testing':
            cardTitle.textContent = "Software Testing";
            cardDescription.textContent = "Software Testing courses are booming, providing the skills to ensure reliability and quality. Join now and reap the benefits of being in a vital, high-demand role.";
            break;
        case 'SoftwareDevelopment':
            cardTitle.textContent = "Software Development";
            cardDescription.textContent = "Software Development courses are opening up avenues for creative and impactful work. Benefit from learning in a field full of limitless opportunities and growth.";
            break;
        case 'Management':
            cardTitle.textContent = "Management";
            cardDescription.textContent = "Management courses are essential for developing leadership skills and understanding business operations. Equip yourself for a successful management career.";
            break;
        default:
            cardTitle.textContent = "Explore Technology Courses";
            cardDescription.textContent = "Now is the time to enroll in trending tech courses, packed with benefits and endless opportunities for a thriving career.";
            break;
    }

    if (selectedOption && selectedOption.bkg) {
        cardItem.style.backgroundImage = `url('${selectedOption.bkg}')`;
    }
}

// Scroll up function
function scrollUp() {
    if (currentActiveIndex > 0) {
        currentActiveIndex--;
        if (currentActiveIndex < visibleStartIndex) {
            visibleStartIndex--;
        }
        generateOptions();
        setActiveOption(currentActiveIndex);
    }
}

// Scroll down function
function scrollDown() {
    if (currentActiveIndex < trendOptions.length - 1) {
        currentActiveIndex++;
        if (currentActiveIndex >= visibleStartIndex + visibleOptionsCount) {
            visibleStartIndex++;
        }
        generateOptions();
        setActiveOption(currentActiveIndex);
    }
}

// Event listeners for scroll buttons
document.getElementById('arrow-top').addEventListener('click', scrollUp);
document.getElementById('arrow-bottom').addEventListener('click', scrollDown);

// Event listener for resizing window
window.addEventListener('resize', function () {
    generateOptions(); // Call generateOptions again on resize to adjust for screen width
});

// Function to start autoplay
function startAutoplay() {
    if (window.innerWidth < 990) {
        autoplayInterval = setInterval(() => {
            currentActiveIndex = (currentActiveIndex + 1) % trendOptions.length;
            generateOptions();
            setActiveOption(currentActiveIndex, false); // Pass false to prevent scrolling
            updateIndicators();
        }, 3000); // Change card every 3 seconds
    }
}

// Function to stop autoplay
function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Function to update indicators
// Function to update indicators
// Function to update indicators
// Function to update indicators
// Function to update indicators
// Function to update indicators
function updateIndicators() {
    const indicators = document.querySelectorAll('.gradient-cards .indicator');
    const totalIndicators = indicators.length;

    // Ensure there are indicators available
    if (totalIndicators > 0) {
        // Reset the active class for all indicators
        indicators.forEach((indicator) => {
            indicator.classList.remove('active');
        });

        // Calculate the correct indicator index using modulo
        const indicatorIndex = currentActiveIndex % totalIndicators;

        // Add the active class to the calculated indicator
        indicators[indicatorIndex].classList.add('active');
    }
}


// Event listener for resizing window
window.addEventListener('resize', function () {
    if (window.innerWidth < 990) {
        startAutoplay(); // Start autoplay when window width is below 990px
    } else {
        stopAutoplay(); // Stop autoplay when window width is above 990px
    }
});

// Initialize options on page load
document.addEventListener("DOMContentLoaded", function () {
    generateOptions();
    setActiveOption(currentActiveIndex);

    // Start autoplay if screen width is below 990px
    if (window.innerWidth < 990) {
        startAutoplay();
    }

    updateIndicators(); // Ensure the indicator starts with the correct active state
});
