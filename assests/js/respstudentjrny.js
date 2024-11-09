document.addEventListener('DOMContentLoaded', () => {
    const dataOne = [
        { name: "Tanisha Sharma", package: "20 LPA • Digital Marketing", image: "https://www.inventateq.com/images/reviews/14f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", id: 1 },
        { name: "Nikita Jain", package: "15 LPA • Sales", image: "https://www.inventateq.com/images/reviews/19m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", id: 2 },
        { name: "Kirandeep", package: "15 LPA • Application Testing", image: "https://www.inventateq.com/images/reviews/14f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", id: 3 },
        { name: "Sahana", package: "9.2 LPA • Data Science", image: "https://www.inventateq.com/images/reviews/18m.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", id: 4 }
    ];

    const dataTwo = [
        { name: "Laxmi Roy", package: "16 LPA • Backend Developer", image: "https://www.inventateq.com/images/reviews/40f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", id: 5 },
        { name: "Sahil Kumar", package: "20 LPA • Marketing", image: "https://www.inventateq.com/images/reviews/5f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", id: 6 },
        { name: "Sahana", package: "9.2 LPA • Data Science", image: "https://www.inventateq.com/images/reviews/43f.webp", logo: "https://www.inventateq.com/images/logos/paytm.webp", id: 7 }
    ];

    // Function to create product card
    function createCard(item) {
        const card = document.createElement('div');
        card.className = 'product';
        card.setAttribute('product-id', item.id);
        card.setAttribute('product-color', item.package.includes('')); // Example color based on package
        card.innerHTML = `
            <div class="thumbnail">
                <img src="${item.image}" alt="${item.name}" class="w-100" />
            </div>
            <h1 class="title">${item.name}</h1>
            <p class="description">${item.package}</p>
        `;
        return card;
    }

    // Append cards to products container
    const productsContainer = document.querySelector('.products');
    [...dataOne, ...dataTwo].forEach(item => productsContainer.appendChild(createCard(item)));

    // Initialize active item
    let productItems = document.querySelectorAll('.product');
    let productCurrentItem = productItems[0];
    productCurrentItem.classList.add('active');

    // Set initial product height after making the first card visible
    setProductHeight();

    // Function to calculate and set product height
    function setProductHeight() {
        const activeProductHeight = productCurrentItem.offsetHeight;
        document.querySelector('.products').style.height = `${activeProductHeight}px`;
    }

    // Function to animate content color
    function animateContentColor() {
        const productColor = productCurrentItem.getAttribute('product-color');
        document.body.style.background = productColor;
        document.querySelectorAll('.title, .btn').forEach(el => el.style.color = productColor);
    }

    // Autoplay functionality
    let autoplayInterval = setInterval(() => {
        nextProduct();
    }, 5000); // Change card every 5 seconds

    function nextProduct() {
        productCurrentItem.classList.remove('active');
        const nextItem = productCurrentItem.nextElementSibling || productItems[0]; // Loop back to first if at end
        productCurrentItem = nextItem;
        productCurrentItem.classList.add('active');
        setProductHeight();
        animateContentColor();
    }

    function prevProduct() {
        productCurrentItem.classList.remove('active');
        const prevItem = productCurrentItem.previousElementSibling || productItems[productItems.length - 1]; // Loop back to last if at start
        productCurrentItem = prevItem;
        productCurrentItem.classList.add('active');
        setProductHeight();
        animateContentColor();
    }

    // Next button functionality
    document.getElementById('next').addEventListener('click', function (e) {
        e.preventDefault();
        nextProduct();
        resetAutoplay();
    });

    // Prev button functionality
    document.getElementById('prev').addEventListener('click', function (e) {
        e.preventDefault();
        prevProduct();
        resetAutoplay();
    });

    // Reset autoplay function
    function resetAutoplay() {
        clearInterval(autoplayInterval); // Clear existing interval
        autoplayInterval = setInterval(() => {
            nextProduct();
        }, 5000); // Restart autoplay
    }

    // Stop autoplay on user interaction
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(autoplayInterval); // Stop autoplay on button click
        });
    });

    // Ripple effect
    document.querySelectorAll('[ripple]').forEach(element => {
        element.addEventListener('click', function (e) {
            const rippleDiv = document.createElement('div');
            rippleDiv.className = 'ripple';
            const rippleSize = 60;
            const rippleOffset = this.getBoundingClientRect();
            const rippleY = e.clientY - rippleOffset.top;
            const rippleX = e.clientX - rippleOffset.left;

            rippleDiv.style.top = `${rippleY - (rippleSize / 2)}px`;
            rippleDiv.style.left = `${rippleX - (rippleSize / 2)}px`;
            rippleDiv.style.background = this.getAttribute("ripple-color");

            this.appendChild(rippleDiv);
            setTimeout(() => {
                rippleDiv.remove();
            }, 1900);
        });
    });
});
