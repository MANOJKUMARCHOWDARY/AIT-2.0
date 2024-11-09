document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const navbarResponsive = document.getElementById('navbar-responsive');
    const navbarDsk = document.getElementById('navbar-dsk');

    // Initially show the navbar-lg and hide the navbar-responsive
    // navbarDsk.style.display = 'block';
    navbarResponsive.style.display = 'none'; // Initially hidden

    // Open navbar-responsive and hide navbar-lg on hamburger button click
    menuToggle.addEventListener('click', () => {
        // alert("Opening mobile menu");
        navbarDsk.style.display = 'none'; // Hide navbar-lg
        navbarResponsive.style.display = 'block'; // Show navbar-responsive
    });

    // Close navbar-responsive and show navbar-lg on 'X' button click
    closeMenu.addEventListener('click', () => {
        // alert("Closing mobile menu"); // This should trigger
        navbarResponsive.style.display = 'none'; // Hide navbar-responsive
        navbarDsk.style.display = 'block'; // Show navbar-lg
        navbarResponsive.classList.remove('collapse'); // Remove collapse class if it was added
    });
});
