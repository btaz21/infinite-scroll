const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let initialCount = 5;
const apiKey = 'vJNHHicLw3P_MDpV66CycoZ-Xv9fyLyUegCugp_r-48';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateApiUrlCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributesHelper(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributesHelper(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributesHelper(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
    updateApiUrlCount(30);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const totalScrollinPixels = window.scrollY;
  const bodyHeight = document.body.offsetHeight;
  if (windowHeight + totalScrollinPixels >= bodyHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
