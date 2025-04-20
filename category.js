// Images Array to store all images with their title, url and category
const images = [
    { title: 'Foggy Mountain Summit', url: './images/foggy_mountain_summit.jpg', category: 'nature' },
    { title: 'Train on Bridge through Forest', url: './images/train_on_bridge_through_forest.jpg', category: 'nature' },
    { title: 'Beach Sunset', url: './images/beach_sunset.jpg', category: 'nature' },
    { title: 'Desert Sand Dunes', url: './images/desert_sand_dunes.jpg', category: 'nature'},
    { title: 'Brown Fox', url: './images/brown_fox.jpg', category: 'animals' },
    { title: 'Butterfly', url: './images/butterfly.jpg', category: 'animals' },
    { title: 'Polar Bear', url: './images/polar_bear.jpg', category: 'animals' },
    { title: 'Squirrel', url: './images/squirrel1.jpg', category: 'animals' },
    { title: 'Turtle', url: './images/turtle.jpg', category: 'animals' },
    { title: 'Milky Way', url: './images/space1.jpg', category: 'space' },
    { title: 'Milky Way Night Sky', url: './images/space2.jpg', category: 'space' },
    { title: 'International Space Station', url: './images/space3.jpg', category: 'space' },
    { title: 'Jupiter', url: './images/jupiter.jpg', category: 'space' },
    { title: 'Pluto', url: './images/pluto.png', category: 'space' },
    { title: 'Sunset', url: './images/sunset.png', category: 'space' },
    { title: 'Dubai Night', url: './images/dubai_night.jpg', category: 'nightscape' },
    { title: 'Business City Night', url: './images/business_city_night.jpg', category: 'nightscape' },
    { title: 'Night Lake', url: './images/night_lake.jpg', category: 'nightscape' },
    { title: 'Chengdu Overpass', url: './images/chengdu_overpass.jpg', category: 'nightscape' },
    { title: 'Rainbow Bridge (Tokyo)', url: './images/rainbow_bridge.jpg', category: 'nightscape' }
  ];
  
  //Grabbing required elements by ID
  const categorySelect = document.getElementById('category');
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeButton = document.getElementById('close-lightbox');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  let currentImageIndex = 0;
  //Setting default category to nature
  let currentCategory = 'nature';
  
  function loadImages(category) {
    gallery.innerHTML = '';
    const selectedImages = images.filter(image => image.category === category);
  
    selectedImages.forEach((image, index) => {
      const imageElement = document.createElement('div');
      imageElement.classList.add('art-piece', 'cursor-pointer', 'transition-transform');
      imageElement.setAttribute('data-index', index);
      imageElement.innerHTML = `
        <figure class="relative">
          <img src="${image.url}" alt="${image.title}" class="w-full h-64 object-cover rounded-lg shadow-lg hover:opacity-80 transition">
          <figcaption class="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-60 transition-opacity p-4 text-center rounded-lg">
            <span class="text-white text-xl font-semibold">${image.title}</span>
          </figcaption>
        </figure>
      `;
  
      imageElement.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox();
      });
  
      gallery.appendChild(imageElement);
    });
  }
  
  //Function to toggle display property of lightbox
  function showLightbox() {
    const selectedImage = images.filter(image => image.category === currentCategory)[currentImageIndex];
    lightboxImage.src = selectedImage.url;
    lightboxTitle.textContent = selectedImage.title;
    lightbox.classList.remove('hidden');
  }
  
  //Function to set next image details (cyclic)
  function nextImage() {
    const selectedImages = images.filter(image => image.category === currentCategory);
    currentImageIndex = (currentImageIndex + 1) % selectedImages.length;
    showLightbox();
  }
  
  //Function to set previous image details (cyclic)
  function prevImage() {
    const selectedImages = images.filter(image => image.category === currentCategory);
    currentImageIndex = (currentImageIndex - 1 + selectedImages.length) % selectedImages.length;
    showLightbox();
  }
  
  // Function to toggle Dark Mode
  function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const headerElement = document.querySelector('header');
    const selectElement = document.getElementById('category');
    const navLinks = document.querySelectorAll('nav a');
    const lightboxContainer = document.querySelector('#lightbox div');
    const lightboxTitleContainer = document.querySelector('#lightbox-1');
    const lightboxTitleElement = document.getElementById('lightbox-title');
  
    // Toggle dark mode class
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');

    //Saving darkmode setting in local storage of browser
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  
    // Toggle body styles
    bodyElement.classList.toggle('bg-gray-900', isDark);
    bodyElement.classList.toggle('text-white', isDark);
  
    // Toggle header styles
    headerElement.classList.toggle('bg-gray-800', isDark);
    headerElement.classList.toggle('text-white', isDark);
  
    // Nav link styles
    navLinks.forEach(link => {
      if (isDark) {
        link.classList.remove('text-gray-900', 'hover:text-gray-700');
        link.classList.add('text-white', 'hover:text-gray-300');
      } else {
        link.classList.remove('text-white', 'hover:text-gray-300');
        link.classList.add('text-gray-900', 'hover:text-gray-700');
      }
    });
  
    // Toggle button styles
    if (isDark) {
      darkModeToggle.innerText = '☀️ Light Mode';
      darkModeToggle.classList.add('bg-yellow-500', 'text-gray-900');
      darkModeToggle.classList.remove('bg-gray-800', 'text-white');
  
      // Toggle select dropdown styles
      selectElement.classList.add('dark-mode');
  
      // Lightbox background and title styling for dark mode
      lightboxContainer.classList.add('bg-gray-900');
      lightboxTitleContainer.classList.add('bg-gray-800/50');
      lightboxTitleElement.classList.add('text-white');
    } else {
      darkModeToggle.innerText = '🌙 Dark Mode';
      darkModeToggle.classList.add('bg-gray-800', 'text-white');
      darkModeToggle.classList.remove('bg-yellow-500', 'text-gray-900');
  
      selectElement.classList.remove('dark-mode');
      // Revert lightbox to light mode
      lightboxContainer.classList.remove('bg-gray-900');
      lightboxTitleContainer.classList.remove('bg-gray-800/50');
      lightboxTitleElement.classList.remove('text-white');
    }  
  }
  
  // Fetching stored dark mode setting
  document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
      toggleDarkMode();
    }
  });
  
  // Event Listeners
  categorySelect.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    loadImages(currentCategory);
  });
  
  closeButton.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
  
  prevButton.addEventListener('click', prevImage);
  nextButton.addEventListener('click', nextImage);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.add('hidden');
  });
  
  darkModeToggle.addEventListener('click', toggleDarkMode);
  
  // Initial load
  loadImages(currentCategory);