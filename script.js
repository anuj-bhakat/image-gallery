// Images Array to store title and their respective urls 
const images = [
  { title: 'Foggy Mountain Summit', url: './images/foggy_mountain_summit.jpg' },
  { title: 'Desert Sand Dunes', url: './images/desert_sand_dunes.jpg'},
  { title: 'Train on Bridge through Forest', url: './images/train_on_bridge_through_forest.jpg' },
  { title: 'Beach Sunset', url: './images/beach_sunset.jpg' },
  { title: 'Brown Fox', url: './images/brown_fox.jpg' },
  { title: 'Butterfly', url: './images/butterfly.jpg' },
  { title: 'Polar Bear', url: './images/polar_bear.jpg' },
  { title: 'Milky Way', url: './images/space1.jpg' },
  { title: 'Jupiter', url: './images/jupiter.jpg' },
  { title: 'Sunset', url: './images/sunset.png' },
  { title: 'Dubai Night', url: './images/dubai_night.jpg' },
  { title: 'Rainbow Bridge (Tokyo)', url: './images/rainbow_bridge.jpg' }
];


let currentIndex = 0;

// Grabbing Element based on ID
const carouselImage = document.getElementById('carousel-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

//Function to set image based on index
function showImage(index) {
  const selectedImage = images[index];
  carouselImage.src = selectedImage.url;
}

//Function to increment index (cyclic)
function nextImageAuto() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

//Function to decrement index (cyclic)
function prevImageAuto() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

// Function to set 2s timer to change image 
setInterval(nextImageAuto, 2000);

// Event Listeners for buttons
prevButton.addEventListener('click', prevImageAuto);
nextButton.addEventListener('click', nextImageAuto);

// Initializing image 
showImage(currentIndex);

// Function to toggle Dark Mode
function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const headerElement = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sections = document.querySelectorAll('section');

    // Toggle dark mode class
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');

    //Storing dark mode setting in local storage of browser
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


    // Toggle background of each section
    sections.forEach(section => {
        section.classList.toggle('bg-gray-800', isDark);
        section.classList.toggle('bg-gray-200', !isDark);
    });

    // Toggle button styles
    if (isDark) {
    darkModeToggle.innerText = '☀️ Light Mode';
    darkModeToggle.classList.add('bg-yellow-500', 'text-gray-900');
    darkModeToggle.classList.remove('bg-gray-800', 'text-white');
    } else {
    darkModeToggle.innerText = '🌙 Dark Mode';
    darkModeToggle.classList.add('bg-gray-800', 'text-white');
    darkModeToggle.classList.remove('bg-yellow-500', 'text-gray-900');
    }
}

// Fetching stored dark mode setting
document.addEventListener('DOMContentLoaded', () => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'enabled') {
    toggleDarkMode();
  }
});

// Event Listener for Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);