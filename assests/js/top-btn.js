const myButton = document.getElementById('myButton');
const socialIcons=document.querySelector(".social");
socialIcons.style.display="none";
// myButton.style.display = 'none';
// Show the button when scrolling down past 12vh
window.addEventListener('scroll', function() {
    if (window.scrollY > window.innerHeight * 0.5) { // 12vh in pixels
        myButton.style.display = 'block'; // Show button
        socialIcons.style.display="block";
    } else {
        myButton.style.display = 'none'; // Hide button
        socialIcons.style.display="none";
    }
});

// Smooth scroll to the top on button click
myButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
});