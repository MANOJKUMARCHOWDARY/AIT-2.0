const blogData = [
    {
      id: 1,
      title: 'Guide to Predictive Analytics: Definition, Tools and Use Cases',
      image: './assests/images/aiimage.jpg',
      updatedOn: 'Sep 3, 2024',
      views: 103,
    },
    {
      id: 2,
      title: 'Understanding Machine Learning: A Beginner’s Guide',
      image: './assests/images/blogs3.png', // Replace with the correct image path
      updatedOn: 'Sep 10, 2024',
      views: 85,
    },
    {
      id: 3,
      title: 'The Future of Artificial Intelligence: Trends to Watch',
      image: './assests/images/blogs4.jpg', // Replace with the correct image path
      updatedOn: 'Sep 15, 2024',
      views: 120,
    },
    // Add more blog objects as needed
  ];

  const blogContainer = document.getElementById('blog-container');

  blogData.forEach(blog => {
    const blogCard = document.createElement('div');
    blogCard.className = 'col-sm-6 col-lg-3 mb-3 mb-sm-0';

    blogCard.innerHTML = `
    <a href="#" 
      <div class="card">
        <div class="card-body w-100 p-0 pb-4 snipimage">
          <img src="${blog.image}" class="card-img-top" alt="Blog">
          <p class="card-text px-4 pt-3 text-align-left text-dark fw-semibold">${blog.title}</p>
          <div class="d-flex justify-content-between align-items-center mx-3">
            <p class="mb-0">Updated on ${blog.updatedOn}</p>
            <div class="d-flex align-items-center">
              <i class="fa-regular fa-eye fs-5" style="color: black;"></i>
              <span class="ms-1">${blog.views}</span>
            </div>
          </div>
        </div>
    </a>
      </div>
    `;

    blogContainer.appendChild(blogCard);
  });