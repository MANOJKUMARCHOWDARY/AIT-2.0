const profiles = [
    {
        name: "Aparna Singh",
        quote: "As a college dropout, I rewrote my future with AcheiversIT's help, becoming a skilled developer.",
        image: "https://masai-website-images.s3.ap-south-1.amazonaws.com/Harshit_Tripathi_4defe7c5e9.png",
        role1: "Delivery Partner",
        role2: "Software Developer"
    },
    {
        name: "John Doe",
        quote: "Mastering programming languages has unlocked opportunities for me that I once thought were out of reach.",
        image: "https://masai-website-images.s3.ap-south-1.amazonaws.com/Aparna_Singh_007855ef38.png", // Placeholder image for demonstration
        role1: "Junior Developer",
        role2: "UX/UI Designer"
    },
    {
        name: "Jane Smith",
        quote: "With unwavering commitment and diligent practice, I shaped my coding passion into a fulfilling profession.",
        image: "https://masai-website-images.s3.ap-south-1.amazonaws.com/Aman_Kashyap_f13c65dc1c.png", // Placeholder image for demonstration
        role1: "Senior Developer",
        role2: "Product Manager"
    }
];


let currentProfileIndex = 0;

// Function to update the profile
function updateProfile() {
    const profileImage = document.getElementById("profile-image");
    const profileQuote = document.getElementById("profile-quote");
    const profileName = document.getElementById("profile-name");
    const role1 = document.getElementById("role1");
    const role2 = document.getElementById("role2");

    // Fade out the image and text
    profileImage.style.opacity = 0;
    profileQuote.style.opacity = 0;
    profileName.style.opacity = 0;
    role1.style.opacity = 0;
    role2.style.opacity = 0;

    setTimeout(() => {
        // Update content
        currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
        profileImage.src = profiles[currentProfileIndex].image;
        profileQuote.innerHTML = `
        <i class="fa-solid fa-quote-left fs-3" style="color: var(--bg-orangered);"></i> 
        ${profiles[currentProfileIndex].quote}
        <i class="fa-solid fa-quote-right fs-3" style="color: var(--bg-orangered);"></i>`;
    
        profileName.textContent = profiles[currentProfileIndex].name;
        role1.textContent = profiles[currentProfileIndex].role1;
        role2.textContent = profiles[currentProfileIndex].role2;

        // Fade in the image and text
        profileImage.style.opacity = 1;
        profileQuote.style.opacity = 1;
        profileName.style.opacity = 1;
        role1.style.opacity = 1;
        role2.style.opacity = 1;
    }, 500); // Match this with CSS transition duration
}

// Automatically change profile every 7 seconds (including fade duration)
setInterval(updateProfile, 3000);
// ------------------------------build of trust -----------------------------------------//

  
  
  
  
  
// // 
function animateValue(element, start, end, duration) {
  let startTime = null;

  function updateValue(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // Clamp progress between 0 and 1

    const current = start + (end - start) * progress;
    element.textContent = end % 1 !== 0 ? current.toFixed(1) : Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(updateValue); // Continue animation
    }
  }

  requestAnimationFrame(updateValue); // Start animation
}
// ------------------------------------------------------------

// function animateValue(element, start, end, duration,suffix="") {
//   let startTime = null;

//   function animationStep(currentTime) {
//     if (!startTime) startTime = currentTime; // Record the start time

//     const progress = Math.min((currentTime - startTime) / duration, 1); // Calculate progress
//     const value = Math.floor(progress * (end - start) + start); // Calculate current value
//     element.textContent = `${value}${suffix}`; // Update the element's text content

//     if (progress < 1) {
//       requestAnimationFrame(animationStep); // Continue animation until complete
//     }
//   }

//   requestAnimationFrame(animationStep); // Start animation
// }

// // Intersection Observer to trigger animations when section becomes visible
// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) { // When the section enters the viewport
//         const section = entry.target;
//         section.classList.add('visibl'); // Apply 'visible' class to reveal

//         // Animate each counter every time it enters the viewport
//         section.querySelectorAll('.stat-value').forEach((element) => {
//           element.removeAttribute('data-animated'); // Reset animation state
//           const target = parseFloat(element.getAttribute('data-target')); 
//           let suffix = '';
//           if (element.id === 'salary-hike') {
//             suffix = '%';
//           } else if (element.id === 'careers-transformed' || element.id === 'industry-partners') {
//             suffix = '+';
//           }
//           animateValue(element, 0, target, 5000 ,suffix); // Slower animation (3000ms)
//         });
//       }
//     });
//   },
//   {
//     threshold: 0.5, // Trigger animation when 50% of the section is visible
//   }
// );

// // Start observing the stats section
// observer.observe(document.getElementById('stats-section'));




// Function to animate value from start to end within the given duration
function animateValue(element, start, end, duration, isDecimal = false, suffix = "") {
  let startTime = null;

  function animationStep(currentTime) {
    if (!startTime) startTime = currentTime; // Record the start time

    const progress = Math.min((currentTime - startTime) / duration, 1); // Calculate progress
    const value = isDecimal 
      ? (progress * (end - start) + start).toFixed(1) // For decimal values
      : Math.floor(progress * (end - start) + start); // For integers

    element.textContent = `${value}${suffix}`; // Update the element's text content

    if (progress < 1) {
      requestAnimationFrame(animationStep); // Continue animation until complete
    }
  }

  requestAnimationFrame(animationStep); // Start animation
}

// Intersection Observer to trigger animations when the section becomes visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { // When the section enters the viewport
        const section = entry.target;
        section.classList.add('visibl'); // Apply 'visible' class to reveal

        // Animate each counter every time it enters the viewport
        section.querySelectorAll('.stat-value').forEach((element) => {
          element.removeAttribute('data-animated'); // Reset animation state
          const target = parseFloat(element.getAttribute('data-target'));
          let suffix = '';
          let isDecimal = false; // Default to not decimal

          // Set suffix and decimal flag based on element ID
          if (element.id === 'salary-hike') {
            suffix = '%'; // For salary hike, use percentage
            isDecimal = true; // Enable decimal for salary hike
          } else if (element.id === 'careers-transformed' || element.id === 'industry-partners'|| element.id=='') {
            suffix = '+'; // For other cards, use plus sign
          }

          animateValue(element, 0, target, 3000, isDecimal, suffix); // Slower animation (5000ms)
        });
      }
    });
  },
  {
    threshold: 0.5, // Trigger animation when 50% of the section is visible
  }
);

// Start observing the stats section
observer.observe(document.getElementById('stats-section'));
observer.observe(document.getElementById('drive-growth'));



