const navbarDropdown = document.getElementById('navbarDropdownMenuLink');
const overlayContainer = document.getElementById('overlayContainer');
const arrowIcon = document.getElementById('arrowIcon');
const dropdownContainer = document.getElementById('dropdown-container');
const navItems = document.querySelectorAll('.navbar-nav .nav-item');

let isOverlayOpen = false; // Track overlay state

// Function to show the dropdown and overlay
function showOverlay() {
    dropdownContainer.classList.remove('d-none'); // Show dropdown
    overlayContainer.classList.add('active'); // Show overlay
  
    arrowIcon.classList.add('rotate'); // Rotate arrow
    isOverlayOpen = true;
}
// Function to hide the dropdown and overlay
function hideOverlay() {
    dropdownContainer.classList.add('d-none'); // Hide dropdown
    overlayContainer.classList.remove('active'); // Hide overlay
    arrowIcon.classList.remove('rotate'); // Reset arrow rotation
    isOverlayOpen = false;
}

// Toggle dropdown on click
navbarDropdown.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent link default behavior
    isOverlayOpen ? hideOverlay() : showOverlay();
});

// Open dropdown on hover over "All Courses"
navbarDropdown.addEventListener('mouseenter', showOverlay);

// Prevent overlay from closing when interacting with the overlay itself
overlayContainer.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
});

// Close dropdown on hover over other <li> items
navItems.forEach((item) => {
    item.addEventListener('mouseenter', (event) => {
        if (event.target !== navbarDropdown) {
            hideOverlay(); // Close overlay on hover over other nav items
        }
    });
});
overlayContainer.addEventListener('mouseleave', hideOverlay);
overlayContainer.style.backgroundColor="black";
// Close overlay on clicking outside of it
document.addEventListener('click', (event) => {
    if (
        !dropdownContainer.contains(event.target) &&
        !navbarDropdown.contains(event.target)
    ) {
        hideOverlay();
    }
});

// Optional: Close overlay on ESC key press for accessibility
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideOverlay();
    }
});
// Optional: Close overlay on ESC key press for accessibility
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideOverlay();
    }
});


// -------------------------generate cards dynamically for navbar ------------------------//
const courses = {
    "Generative AI": [
    {
        title: "Applied Generative AI Specialization",
        duration: "16 weeks",
        image: "./assests/images/aibg.jpg",
        link: "/applied-ai-course",
        label: "Trending Now"
    },
    {
        title: "Generative AI for Business Transformation",
        duration: "16 weeks",
        image: "./assests/images/Generative-AI-for-business.jpg",
        link: "/generative-ai-for-business-transformation-course",
        label: "Most Popular"
    },
    {
        title: "Python for AI and Machine Learning",
        duration: "11 months",
        image: "./assests/images/pyainandml.jpeg",
        link: "/iitg-generative-ai-machine-learning-program",
        label: "Most Popular"
    },
    {
        title: "Professional Certificate Course in Generative AI and Machine Learning",
        duration: "11 months",
        image: "./assests/images/devops.jpg",
        link: "/iitk-professional-certificate-course-ai-machine-learning",
        label: ""
    },
    {
        title: "Post Graduate Program in AI and Machine Learning",
        duration: "11 months",
        image: "./assests/images/software.avif",
        link: "/pgp-ai-machine-learning-certification-training-course",
        label: ""
    },
    {
        title: "Advanced Executive Program In Applied Generative AI",
        duration: "4 months",
        image: "./assests/images/digitalmarket.jpeg",
        link: "/applied-generative-ai-course",
        label:"Most Popular"
    }
],
"AI & Machine Learning": [
    {
        title: "AI and Machine Learning for Beginners",
        duration: "8 weeks",
        image: "./assests/images/machinelearning.jpeg",
        link: "/machine-learning-for-beginners",
        label: "Trending Now"
    },
    {
        title: "Deep Learning Specialization",
        duration: "16 weeks",
        image: "./assests/images/deeplearning.jpg",
        link: "/deep-learning-specialization",
        label: ""
    },
    {
        title: "AI and Machine Learning for Business",
        duration: "10 weeks",
        image: "https://www.simplilearn.com/ice9/accreditation_icons/perdue.svgz?w=240&dpr=1.5",
        link: "/ai-machine-learning-business",
        label: "Most Popular"
    },
    {
        title: "Advanced AI and Machine Learning Techniques",
        duration: "12 months",
        image: "https://www.simplilearn.com/ice9/accreditation_icons/perdue.svgz?w=240&dpr=1.5",
        link: "/advanced-ai-machine-learning",
        label: ""
    },
    {
        title: "Professional Certificate in AI and Machine Learning",
        duration: "11 months",
        image: "https://www.simplilearn.com/ice9/accreditation_icons/perdue.svgz?w=240&dpr=1.5",
        link: "/professional-certificate-ai-ml",
        label: ""
    },
    {
        title: "Post Graduate Program in AI and Machine Learning",
        duration: "11 months",
        image: "https://www.simplilearn.com/ice9/accreditation_icons/perdue.svgz?w=240&dpr=1.5",
        link: "/pgp-ai-machine-learning",
        label: ""
    }
],


"Data Science & Business Analytics": [
    {
        title: "Data Science for Beginners",
        duration: "8 weeks",
        image: "https://www.simplilearn.com/ice9/accreditation_icons/perdue.svgz?w=240&dpr=1.5",
        link: "/data-science-for-beginners",
        label: "Trending Now"
    },
    {
        title: "Business Analytics Certification Training",
        duration: "16 weeks",
        image: "https://www.simplilearn.com/ice9/accreditation_icons/perdue.svgz?w=240&dpr=1.5",
        link: "/business-analytics-certification-training",
        label: ""
    },
    {
        title: "Advanced Data Science with Python",
        duration: "12 months",
        image: "./assests/images/microsoft-logo.png",
        link: "/advanced-data-science-python",
        label: "Most Popular"
    },
    {
        title: "Data Science and Machine Learning Bootcamp",
        duration: "11 months",
        image: "./assests/images/ieee-logo.png",
        link: "/data-science-ml-bootcamp",
        label: ""
    },
    {
        title: "Post Graduate Program in Data Science",
        duration: "11 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/pgp-data-science",
        label: ""
    },
    {
        title: "Data Analytics for Business Decisions",
        duration: "10 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/data-analytics-business-decisions",
        label: ""
    }
],

"Project Management": [
    {
        title: "Certified Associate in Project Management (CAPM®)",
        duration: "6 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/capm-certification",
        label: "Best Seller"
    },
    {
        title: "Project Management Professional (PMP®)",
        duration: "12 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/pmp-certification",
        label: "Most Popular"
    },
    {
        title: "Agile and Scrum Master Certification",
        duration: "8 weeks",
        image: "./assests/images/ieee-logo.png",
        link: "/agile-scrum-certification",
        label: "Trending Now"
    },
    {
        title: "Post Graduate Program in Project Management",
        duration: "12 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/pgp-project-management",
        label: ""
    },
    {
        title: "Lean Six Sigma Green Belt Certification",
        duration: "10 weeks",
        image: "./assests/images/microsoft-logo.png",
        link: "/lean-six-sigma-certification",
        label: ""
    }
],

"Cyber Security": [
    {
        title: "Certified Ethical Hacker (CEH)",
        duration: "10 weeks",
        image: "./assests/images/microsoft-logo.png",
        link: "/ceh-certification",
        label: "Most Popular"
    },
    {
        title: "CompTIA Security+ Certification",
        duration: "12 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/comptia-security-certification",
        label: ""
    },
    {
        title: "Post Graduate Program in Cybersecurity",
        duration: "12 months",
        image: "./assests/images/ieee-logo.png",
        link: "/pgp-cybersecurity",
        label: ""
    },
    {
        title: "Advanced Cybersecurity Training Program",
        duration: "9 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/advanced-cybersecurity-training",
        label: "Trending Now"
    },
    {
        title: "Cybersecurity Bootcamp for Beginners",
        duration: "8 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/cybersecurity-bootcamp",
        label: "Best Seller"
    }
],
"Cloud Computing & DevOps": [
    {
        title: "AWS Certified Solutions Architect",
        duration: "10 weeks",
        image: "./assests/images/microsoft-logo.png",
        link: "/aws-solutions-architect",
        label: "Most Popular"
    },
    {
        title: "Azure Cloud Architect Certification",
        duration: "12 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/azure-cloud-certification",
        label: ""
    },
    {
        title: "Post Graduate Program in Cloud Computing",
        duration: "12 months",
        image: "./assests/images/ieee-logo.png",
        link: "/pgp-cloud-computing",
        label: ""
    },
    {
        title: "DevOps Practitioner Master Program",
        duration: "9 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/devops-master-program",
        label: "Trending Now"
    },
    {
        title: "Cloud & DevOps Bootcamp for Beginners",
        duration: "8 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/cloud-devops-bootcamp",
        label: "Best Seller"
    }
],
"Business and Leadership": [
    {
        title: "MBA Essentials Program",
        duration: "6 months",
        image: "./assests/images/microsoft-logo.png",
        link: "/mba-essentials",
        label: "Most Popular"
    },
    {
        title: "Executive Leadership Development Program",
        duration: "12 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/leadership-development-program",
        label: ""
    },
    {
        title: "Post Graduate Program in Business Leadership",
        duration: "11 months",
        image: "./assests/images/ieee-logo.png",
        link: "/pgp-business-leadership",
        label: ""
    },
    {
        title: "Strategic Management Certification",
        duration: "8 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/strategic-management-certification",
        label: "Trending Now"
    },
    {
        title: "Business Analytics Bootcamp",
        duration: "10 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/business-analytics-bootcamp",
        label: "Best Seller"
    }
],
"Software Development": [
    {
        title: "Full Stack Web Developer Program",
        duration: "10 weeks",
        image: "./assests/images/microsoft-logo.png",
        link: "/full-stack-web-development",
        label: "Most Popular"
    },
    {
        title: "Java Programming Certification",
        duration: "12 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/java-certification",
        label: ""
    },
    {
        title: "Post Graduate Program in Software Development",
        duration: "12 months",
        image: "./assests/images/ieee-logo.png",
        link: "/pgp-software-development",
        label: ""
    },
    {
        title: "Python for Data Science Bootcamp",
        duration: "9 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/python-data-science-bootcamp",
        label: "Trending Now"
    },
    {
        title: "Frontend Development with React",
        duration: "8 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/frontend-react",
        label: "Best Seller"
    }
],
"Product and Design": [
    {
        title: "UI/UX Design Certification",
        duration: "10 weeks",
        image: "./assests/images/microsoft-logo.png",
        link: "/ui-ux-certification",
        label: "Most Popular"
    },
    {
        title: "Product Management Masterclass",
        duration: "12 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/product-management-masterclass",
        label: ""
    },
    {
        title: "Post Graduate Program in Product Design",
        duration: "12 months",
        image: "./assests/images/ieee-logo.png",
        link: "/pgp-product-design",
        label: ""
    },
    {
        title: "Design Thinking Bootcamp",
        duration: "9 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/design-thinking-bootcamp",
        label: "Trending Now"
    },
    {
        title: "Agile Product Development Workshop",
        duration: "8 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/agile-product-development",
        label: "Best Seller"
    }
],
"IT Service and Architecture": [
    {
        title: "ITIL 4 Foundation Certification",
        duration: "6 weeks",
        image: "./assests/images/microsoft-logo.png",
        link: "/itil-foundation-certification",
        label: "Best Seller"
    },
    {
        title: "Enterprise Architecture Certification (TOGAF®)",
        duration: "12 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/enterprise-architecture-certification",
        label: ""
    },
    {
        title: "Post Graduate Program in IT Service Management",
        duration: "12 months",
        image: "./assests/images/ieee-logo.png",
        link: "/pgp-it-service-management",
        label: ""
    },
    {
        title: "Cloud and IT Infrastructure Bootcamp",
        duration: "9 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/cloud-infrastructure-bootcamp",
        label: "Trending Now"
    },
    {
        title: "ServiceNow Administrator Training",
        duration: "8 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/servicenow-administrator",
        label: "Most Popular"
    }
],
"Digital Marketing": [
    {
        title: "Google Ads Certification Program",
        duration: "6 weeks",
        image: "./assests/images/microsoft-logo.png",
        link: "/google-ads-certification",
        label: "Best Seller"
    },
    {
        title: "Social Media Marketing Masterclass",
        duration: "10 weeks",
        image: "./assests/images/iitm-logo.jpg",
        link: "/social-media-marketing",
        label: "Trending Now"
    },
    {
        title: "Post Graduate Program in Digital Marketing",
        duration: "11 months",
        image: "./assests/images/ieee-logo.png",
        link: "/pgp-digital-marketing",
        label: ""
    },
    {
        title: "SEO & Content Marketing Bootcamp",
        duration: "9 months",
        image: "./assests/images/iitm-logo.jpg",
        link: "/seo-content-marketing-bootcamp",
        label: "Most Popular"
    },
    {
        title: "Advanced Email Marketing Program",
        duration: "8 weeks",
        image: "./assests/images/iitk-logo.png",
        link: "/email-marketing-program",
        label: ""
    }
],









};


const courseListElement = document.getElementById('courseList'); // Desktop course container


const menuItems = document.querySelectorAll('.menu-list');        // Desktop menu items

// Function to clear the current course list
function clearCourseList() {
    courseListElement.innerHTML = ''; // Clear existing cards
}
function clearCourseList(container) {
    container.innerHTML = ''; // Clear existing cards
}

// Function to generate course list based on selected category
function generateCourseList(category, container) {
    clearCourseList(container); // Clear existing cards

    const selectedCourses = courses[category];
    if (!selectedCourses) return;

    const updateLayout = () => {
        const width = window.innerWidth;
        return width < 552 ? ['col-12'] : width < 1220 ? ['col-sm-6'] : ['col-lg-4'];
    };

    const renderCards = () => {
        clearCourseList(container); // Clear cards on each resize

        selectedCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add(...updateLayout(), 'mb-3'); // Responsive columns with bottom margin for spacing

            courseCard.innerHTML = `
                <a href="${course.link}" class="new-menu-tagcard h-100">
                    <div class="program-card h-100">
                        <div class="program-head p-0">
                            <img src="${course.image}" alt="${course.title}" class="gm-added gm-lazy gm-loaded gm-observing gm-observing-cb">
                        </div>
                        <h4>${course.title}</h4>
                        <div class="pg-card-bottom">
                            <h5>${course.duration}</h5>
                            <div class="popular-wrapper-main">
                                ${course.label ? `<div class="popular-wrap btn-anim trendingNowTag"><span>${course.label}</span></div>` : ''}
                            </div>
                        </div>
                    </div>
                </a>
            `;

            container.appendChild(courseCard);
        });
    };

    // Render initially and re-render on window resize
    renderCards();
    window.addEventListener('resize', renderCards);
}

// Function to activate the selected menu item and generate the course list (Desktop)
function activateItem(item) {
    menuItems.forEach(i => i.classList.remove('active')); // Remove 'active' from all
    item.classList.add('active'); // Add 'active' to the selected item

    const category = item.getAttribute('data-category'); // Get selected category
    generateCourseList(category, courseListElement); // Generate course list for desktop
}



// Add event listeners to desktop menu items
menuItems.forEach(item => {
    item.addEventListener('click', () => activateItem(item));
    item.addEventListener('mouseover', () => activateItem(item));
});

// Add event listeners to mobile menu items

// Trigger the first category on load (optional)
if (menuItems.length > 0) menuItems[0].click(); // Desktop
// ------------------------------------------mobile navbar-----------------

const allCoursesCard = document.getElementById('allCourses');
const allCoursesOverlay = document.getElementById('all_courses');
const mobileScreen = document.getElementById('mob-scrn-1');
const closeOverlayButton = document.getElementById('closeOverlay');
const courseLabel = document.getElementById('course-label');
const courseTitle = document.getElementById('course-title');
const mobCoursesContainer = document.getElementById('mob_courses_container'); 
const mobCourseList = document.getElementById('mobcourseList');
const navbarAllCourses=document.getElementById("navbarDropdownMenuLink")


// Show the overlay and hide the mobile screen when "All Courses" is clicked
allCoursesCard.addEventListener('click', () => {
    mobileScreen.classList.add('d-none'); // Hide mobile screen
    allCoursesOverlay.classList.remove('d-none'); // Show overlay
    courseTitle.textContent = "All Courses";
      // Reset title to "All Courses"
});


// Hide the overlay and show the mobile screen when the close button is clicked
// closeOverlayButton.addEventListener('click', () => {
//     allCoursesOverlay.classList.add('d-none'); // Hide overlay
//     mobileScreen.classList.remove('d-none'); // Show mobile screen
// });


const sections = [
    "Generative AI",
    "AI & Machine Learning",
    "Data Science & Business Analytics",
    "Project Management",
    "Cyber Security",
    "Cloud Computing & DevOps",
    "Business and Leadership",
    "Software Development",
    "Product and Design",
    "IT Service and Architecture",
    "Digital Marketing"
];

const container = document.getElementById('dynamic-sections');

function updateCategoryLabel(category) {
    const dynamicCategory = document.getElementById('dynamicCategory');
    dynamicCategory.textContent = category; // Set the text of the category
}

sections.forEach(section => {
    const block = document.createElement('div');
    block.className = "block w-full position-relative flex-grow-1 bg-subdued";
    block.setAttribute('data-category', section); 
    block.innerHTML = `
<div class="transition-all duration-500">
    <div class="d-flex cursor-pointer align-items-center justify-content-between px-0 py-2">
        <div class="d-flex text-sm fw-semibold align-items-center py-0 my-0">
            <div class="mr-1">
                <i class="text-xl leading-5 text-primary-main icon-building-01"></i>
            </div>
            <h3 class="text-neutral-800 fw-seminbold text-sm">${section}</h3>
        </div>
        <div class="w-5 h-5 ml-spacing8 d-flex align-items-center transition-all duration-300">
            <i class="fa-solid fa-chevron-right d-block top-0 position-relative text-xl leading-5 text-neutral-500"></i>
        </div>
    </div>
    <div class="overflow-hidden p-0 transition-all ease-in-out duration-500 d-none" style="max-height: 0;">
        <div>
            <div class="py-spacing8 rounded-xl border border-neutral-200 shadow-neutralShadow">
                <div class="py-spacing10 pl-spacing16 pr-spacing10">
                    <a href="#" class="w-100 text-sm text-neutral-800 fw-medium">${section} Solutions</a>
                </div>
                <div class="border border-bottom border-neutral-200"></div>
            </div>
        </div>
    </div>
</div>
`;
    block.addEventListener('click', () => {
        courseTitle.textContent = section;
        allCoursesOverlay.classList.add('d-none'); // Hide the all courses overlay
mobCoursesContainer.classList.remove('d-none');
const category = block.getAttribute('data-category'); // Show the mobile courses section
const courseContainer = document.getElementById('mobcourseList');
updateCategoryLabel(category);
generateCourseList(category, courseContainer);
    });
    container.appendChild(block);
});

const toggleSection = (headerElement) => {
    const content = headerElement.nextElementSibling;

    // Check if the section is already open
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // Close the section
        content.style.maxHeight = '0';
        headerElement.querySelector('i').style.transform = 'rotate(0deg)';
    } else {
        // Close other sections (optional for one-at-a-time behavior)
        document.querySelectorAll('.overflow-hidden').forEach((item) => {
            item.style.maxHeight = '0';
            const icon = item.previousElementSibling.querySelector('i');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });

        // Open the current section
        content.style.maxHeight = `${content.scrollHeight}px`;
        headerElement.querySelector('i').style.transform = 'rotate(90deg)';
    }
};
// Function to handle back button click
// Get references to the elements

// const backButton = document.getElementById('backButton');

// const mobScreen1 = document.getElementById('mob-scrn-1');



// // Add click event listener to the back button
// courseBackButton.addEventListener('click', (event) => {
//     event.stopPropagation(); // Prevent event bubbling

//     // Call the function to show the All Courses section
//     showAllCourses();
// });


// Add event listeners to all section headers
document.querySelectorAll('.cursor-pointer').forEach((header) => {
    header.addEventListener('click', () => toggleSection(header));
});
// Get DOM elements
document.addEventListener('DOMContentLoaded', function () {
    const categoryLabel = document.getElementById('categoryLabel');  // Category label
    const courseBack = document.getElementById('course_back');  // Back button
    const allCoursesSection = document.getElementById('all_courses');  // All Courses screen
    const mobCoursesContainer = document.getElementById('mob_courses_container');  // Courses container
    const courseTitle = document.getElementById('course-title');  // Title element
    const mobAllCourses = document.getElementById('allCourses');  // Main All Courses trigger
    const coursesScreen = document.getElementById('mob-scrn-1');  // Mobile screen 1 content
    const backButton = document.getElementById('backButton');
   const courseLabel= document.getElementById('course-label') ; // Back button inside courses
   const navbarAllCourses=document.getElementById('navbarDropdownMenuLink');
    // Function to show the All Courses section and hide other containers
    function showAllCourses() {
        allCoursesSection.classList.remove('d-none'); // Show All Courses screen
        mobCoursesContainer.classList.add('d-none');  // Hide Courses container
        courseTitle.textContent = 'All Courses'; 
         resetChevron();  // Update the title text
    }

    // Function to navigate to the Courses content screen
    function showCoursesScreen() {
        allCoursesSection.classList.add('d-none');  // Hide All Courses screen
        coursesScreen.classList.remove('d-none');  // Show Courses content
    }
    function resetChevron() {
        backButton.style.transform = 'rotate(0deg)';  // Ensure no rotation
        backButton.style.transition = 'transform 0.3s ease-in-out';  // Smooth reset animation
    }

    // Add event listeners for navigation
    if (categoryLabel) categoryLabel.addEventListener('click', showAllCourses);
    if (courseBack) courseBack.addEventListener('click', showAllCourses);
    if (mobAllCourses) mobAllCourses.addEventListener('click', showAllCourses);
    if (backButton) backButton.addEventListener('click', showCoursesScreen);
    if(courseLabel) courseLabel.addEventListener('click',showCoursesScreen);

if(navbarAllCourses) navbarAllCourses.addEventListener("click",showCoursesScreen);
});









// ------------------------------------------show event 



