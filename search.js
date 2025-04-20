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
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeButton = document.getElementById('close-lightbox');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const loadingMessage = document.getElementById('loading');
  const noResultsMessage = document.getElementById('no-results');

  let currentImageIndex = 0;
  let currentFiltered = [];

  // Debounce function to optimize input
  function debounce(func, delay = 500) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  // Render Search Results based on input
  function renderResults(query) {
    //Convert query to lowercase to ignore case sensitivity
    const lowerQuery = query.toLowerCase();

    // Show loading message while searching
    loadingMessage.classList.add('active');
    noResultsMessage.classList.remove('active');
    searchResults.innerHTML = '';

    // Simulate a delay to show loading message
    setTimeout(() => {
      // hide messages if search input is empty
      if (query.trim() === '') {
        loadingMessage.classList.remove('active');
        return;
      }

      const filtered = images.filter(img =>
        img.title.toLowerCase().includes(lowerQuery) ||
        img.category.toLowerCase().includes(lowerQuery)
      );
      
      currentFiltered = filtered;

      loadingMessage.classList.remove('active');
      if (filtered.length === 0) {
        noResultsMessage.classList.add('active');
      } else {
        noResultsMessage.classList.remove('active');
      }

      filtered.forEach((img, index) => {
        const div = document.createElement('div');
        div.classList.add('relative', 'overflow-hidden', 'rounded-lg', 'shadow-lg', 'art-piece');

        //lazy loading to prevent page from not responding
        div.innerHTML = `
          <img src="${img.url}" alt="${img.title}" class="w-full h-64 object-cover hover:opacity-80 transition" loading="lazy" />
          <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
            <h2 class="text-white text-xl font-semibold mb-2">${img.title}</h2>
            <button class="bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition view-btn" data-index="${index}">View</button>
          </div>
        `;
        searchResults.appendChild(div);
      });

      // Event listener for 'View' button
      document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          currentImageIndex = parseInt(e.currentTarget.dataset.index);
          showLightbox();
        });
      });
    }, 200);
  }

  // Show Image in Lightbox
  function showLightbox() {
    const selected = currentFiltered[currentImageIndex];
    lightboxImage.src = selected.url;
    lightboxTitle.textContent = selected.title;
    lightbox.classList.remove('hidden');
  }

  // Toggle Dark Mode
  function toggleDarkMode() {
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      const headerElement = document.querySelector('header');
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

      // Button styles
      if (isDark) {
          darkModeToggle.innerText = '☀️ Light Mode';
          darkModeToggle.classList.add('bg-yellow-500', 'text-gray-900');
          darkModeToggle.classList.remove('bg-gray-800', 'text-white');

          // Lightbox background and title styling for dark mode
          lightboxContainer.classList.add('bg-gray-900');
          lightboxTitleContainer.classList.add('bg-gray-800/50');
          lightboxTitleElement.classList.add('text-white');
      } else {
          darkModeToggle.innerText = '🌙 Dark Mode';
          darkModeToggle.classList.add('bg-gray-800', 'text-white');
          darkModeToggle.classList.remove('bg-yellow-500', 'text-gray-900');

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
  searchInput.addEventListener('input', debounce(() => {
    renderResults(searchInput.value);
  }, 200));

  closeButton.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  darkModeToggle.addEventListener('click', toggleDarkMode);

// Initial Rendering
renderResults('');