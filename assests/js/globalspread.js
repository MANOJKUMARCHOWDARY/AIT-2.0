const countries = [
    { name: 'US', learners: '1,22,072', imgSrc: './assests/images/global-pic-1.jpg', position: { top: '0%', left: '20%' } },
    { name: 'India', learners: '2,37,213', imgSrc: './assests/images/global-pic-2.jpg', position: { top: '50%', left: '40%' } },
    { name: 'UK', learners: '6,879', imgSrc: './assests/images/global-pic-3.jpg', position: { top: '10%', left: '60%' } },
    { name: 'Australia', learners: '6,826', imgSrc: './assests/images/global-pic-6.jpg', position: { bottom: '10%', left: '70%' } },
    { name: 'Malaysia', learners: '2,050', imgSrc: './assests/images/global-pic-7.jpg', position: { bottom: '30%', left: '80%' } },
    { name: 'Canada', learners: '5,000', imgSrc: './assests/images/global-pic-3.jpg', position: { top: '15%', left: '25%' } },
    { name: 'Germany', learners: '10,000', imgSrc: './assests/images/global-pic-6.jpg', position: { top: '20%', left: '45%' } },
    { name: 'France', learners: '7,500', imgSrc: './assests/images/global-pic-2.jpg', position: { bottom: '20%', left: '50%' } }
];

const locationsContainer = document.getElementById('locations');

// Function to display locations with animation
function displayLocations() {
    countries.forEach((country, index) => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'position-absolute'; // Use a class to apply animations

        // Set initial position properties
        updatePosition(countryDiv, country.position);

        // Create the location box
        const locationBox = `
            <div class="location-box d-flex gap-2 py-2">
                <img src="${country.imgSrc}" alt="${country.name} Learners" class="rounded-full"
        
            style="
              width: 100%;   
              
       
                background-repeat: no-repeat;
            ">
                <div class="d-flex justify-content-center align-items-center gap-2" id="location-tagline">
                    <h6 class="m-0 stat-number">${country.learners}</h6>
                    <p class="m-0 text-muted">Learners</p>
                </div>
            </div>
            <div class="arrow"></div>
            <div class="mt-0 animate-blink">
                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                    <circle opacity="0.16" cx="20.028" cy="20.0508" r="20" fill="#EE2C3C"></circle>
                    <circle cx="20.028" cy="20.0507" r="10" fill="#EE2C3C"></circle>
                </svg>
            </div>
        `;

        countryDiv.innerHTML = locationBox;

        // Append the country div to the locations container
        locationsContainer.appendChild(countryDiv);

        // Set initial opacity to 0
        countryDiv.style.opacity = 0;
    });

    // Function to toggle locations
    let currentSet = 1; // Track current set (1 for first four, 2 for second four)
    
    const toggleLocations = () => {
        const firstSet = [0, 1, 2, 3]; // Indices for the first set
        const secondSet = [4, 5, 6, 7]; // Indices for the second set

        // Determine which set to show/hide
        const setToShow = currentSet === 1 ? firstSet : secondSet;
        const setToHide = currentSet === 1 ? secondSet : firstSet;

        // Fade out the current set
        setToHide.forEach(index => {
            if (locationsContainer.children[index]) {
                const currentDiv = locationsContainer.children[index];
                currentDiv.style.transition = 'opacity 0.5s ease-in-out'; // Smooth transition
                currentDiv.style.opacity = 0; // Fade out
            }
        });

        // After fade out, show the next set
        setTimeout(() => {
            // Fade in the next set
            setToShow.forEach(index => {
                if (locationsContainer.children[index]) {
                    const nextDiv = locationsContainer.children[index];
                    nextDiv.style.transition = 'opacity 0.5s ease-in-out'; // Smooth transition
                    nextDiv.style.opacity = 1; // Fade in
                }
            });

            // Update currentSet for toggling
            currentSet = currentSet === 1 ? 2 : 1; // Toggle between 1 and 2
        }, 1000); // 1 second delay before showing next set

        setTimeout(toggleLocations, 3000); 
    };

    // Start the toggle
    toggleLocations(); // Start toggling immediately
}

// Function to update positions based on window size
// Function to update positions based on window size
function updatePosition(countryDiv, position) {
    if (position.top) {
        countryDiv.style.top = position.top;
    }
    if (position.left) {
        countryDiv.style.left = position.left;
    }
    if (position.bottom) {
        countryDiv.style.bottom = position.bottom;
    }

    // Adjust positions for screens less than 600px
    if (window.innerWidth < 600) {
        // Adjust positions here as per your requirements
        countryDiv.style.top = adjustPosition(position.top, 'top');
        countryDiv.style.left = adjustPosition(position.left, 'left');
        countryDiv.style.bottom = adjustPosition(position.bottom, 'bottom');
    }
}

// Function to adjust position values
function adjustPosition(value, direction) {
    // Convert percentage string to number
    const percentageValue = parseFloat(value);

    // Adjust position based on screen size
    if (window.innerWidth < 600) {
        // Fixed positions for small screens
        const fixedPositions = {
            'US': { top: '5%', left: '20%' },
            'India': { top: '50%', left: '40%' },
            'UK': { top: '10%', left: '60%' },
            'Australia': { top: '70%', left: '70%' },
            'Malaysia': { top: '80%', left: '80%' },
            'Canada': { top: '15%', left: '25%' },
            'Germany': { top: '25%', left: '45%' },
            'France': { top: '30%', left: '50%' }
        };

        // Return fixed position values
        return fixedPositions[countries.find(country => country.position === value).name][direction];
    }

    // Adjust the position based on direction
    if (direction === 'top' || direction === 'left') {
        return `${percentageValue * 0.3}%`; // Example adjustment for larger screens
    }
    if (direction === 'bottom') {
        return `${percentageValue * 8.6}%`; // Example adjustment for larger screens
    }
    return value; // Return original if no adjustment is needed
}

// Call the function to display locations
displayLocations();

// Adjust positions on window resize
window.addEventListener('resize', () => {
    Array.from(locationsContainer.children).forEach((countryDiv, index) => {
        updatePosition(countryDiv, countries[index].position);
    });
});