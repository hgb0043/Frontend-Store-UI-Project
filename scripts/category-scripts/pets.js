// Header Section

const firstName = localStorage.getItem('first-name');
const loginStatus = localStorage.getItem('login-status') || '';
const accountMessage = document.querySelector('.account-message');
const downArrow = document.querySelector('.js-down-arrow');
const upArrow = document.querySelector('.js-up-arrow');
const dropHeader = document.querySelector('.js-drop-header');
const header = document.querySelector('header');

// Control whether header displays welcome message or log in/sign up buttons.
if (loginStatus === 'logged-in') {
  accountMessage.innerHTML = `<p class="welcome-message">Welcome back, ${firstName}</p>`;
} else {
  accountMessage.innerHTML = '<a href="login.html" class="permanent-header-link">Log in</a> <a href="signup.html" class="permanent-header-link">Sign up</a>'; 
}

// Make drop-header funtional
downArrow.addEventListener('click', () => {
  header.style.height = '90px';
  dropHeader.style.height = '40px';
  dropHeader.classList.remove('hidden');
  downArrow.classList.add('hidden');
  upArrow.classList.remove('hidden');
})

upArrow.addEventListener('click', () => {
  header.style.height = '50px';
  dropHeader.style.height = '0';
  dropHeader.classList.add('hidden');
  downArrow.classList.remove('hidden');
  upArrow.classList.add('hidden');
})

// Manages drop-header and up/down arrow visibility based on resolution size
function updateHeaderState() {
  const isWideScreen = window.innerWidth > 1200;

  header.style.height = '50px';
  dropHeader.classList.add('hidden'); 

  if (isWideScreen) {
    downArrow.classList.add('hidden');
    upArrow.classList.add('hidden');
  } else {
    downArrow.classList.remove('hidden');
  }
}
updateHeaderState();
window.addEventListener('resize', updateHeaderState);


// Main Section 


// Products from products.json
const productsArray = [
   {
    "id": 67,
    "page": "Pets",
    "name": "Lay Lo Durable Cotton Rope Dog Toy",
    "price": 11.99,
    "path": "/images/product-images/product67.jpg",
    "rating": 4.5,
    "brand": "Lay Lo",
    "num-ratings": 23,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Toys",
    "amnt-available": 45,
    "material": "Cotton Rope",
    "color": "Natural",
    "description": "The Lay Lo Cotton Rope Dog Toy is made from durable natural cotton, ideal for interactive play and gentle on your dog's teeth."
  },

  {
    "id": 68,
    "page": "Pets",
    "name": "Pet Passion Durable Bunny Dog Toy with Cotton Outside and Coconut Fiber Interior",
    "price": 9.99,
    "path": "/images/product-images/product68.jpg",
    "rating": 4.4,
    "brand": "Pet Passion",
    "num-ratings": 18,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Toys",
    "amnt-available": 33,
    "material": "Cotton and Coconut Fiber",
    "color": "Gray and White",
    "description": "This bunny-shaped dog toy has a soft cotton exterior and a coconut fiber interior for sustainable chewing fun."
  },

  {
    "id": 69,
    "page": "Pets",
    "name": "LophiPets Breathable Cotton Dog Tee Blue and White Stripes",
    "price": 18.49,
    "path": "/images/product-images/product69.jpg",
    "rating": 4.7,
    "brand": "LophiPets",
    "num-ratings": 22,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Pet Clothing",
    "amnt-available": 40,
    "material": "Breathable Cotton",
    "color": "Blue and White Stripes",
    "description": "A lightweight, breathable cotton tee for dogs featuring classic blue and white stripes, perfect for comfortable wear during warmer months."
  },

  {
    "id": 70,
    "page": "Pets",
    "name": "Manoai Large Wood Bird Perch 5pcs",
    "price": 17.99,
    "path": "/images/product-images/product70.jpg",
    "rating": 4.7,
    "brand": "Manoai",
    "num-ratings": 36,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Bird Accessories",
    "amnt-available": 22,
    "material": "Natural Wood",
    "color": "Wood",
    "description": "The Manoai 5-pack of bird perches is made from untreated wood and provides a safe, fun environment for pet birds to perch and play."
  },

  {
    "id": 71,
    "page": "Pets",
    "name": "Vesper Wooden Cat Tree, High Base",
    "price": 99.99,
    "path": "/images/product-images/product71.jpg",
    "rating": 4.8,
    "brand": "Vesper",
    "num-ratings": 57,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Cat Furniture",
    "amnt-available": 18,
    "material": "MDF and Wood Veneer",
    "color": "Walnut",
    "description": "A modern cat tree with multiple levels, cozy nooks, and a durable wood finish that blends into any home décor."
  },

  {
    "id": 72,
    "page": "Pets",
    "name": "ScienGarden Wood Outdoor Dog House for Smaller to Medium Sized Dogs",
    "price": 129.99,
    "path": "/images/product-images/product72.jpg",
    "rating": 4.5,
    "brand": "ScienGarden",
    "num-ratings": 41,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Dog Houses",
    "amnt-available": 12,
    "material": "Wood",
    "color": "Natural Wood",
    "description": "A sturdy and stylish wooden dog house designed to keep your pet comfortable outdoors all year round."
  },

  {
    "id": 73,
    "page": "Pets",
    "name": "Durango Beef Liver Dog Treats Plastic-Free Tin Container Made in USA",
    "price": 15.00,
    "path": "/images/product-images/product73.jpg",
    "rating": 4.9,
    "brand": "Durango",
    "num-ratings": 51,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Treats",
    "amnt-available": 38,
    "material": "Beef Liver",
    "color": "N/A",
    "description": "All-natural beef liver dog treats packed in a reusable, plastic-free tin container. Made in the USA for quality and freshness."
  },

  {
    "id": 74,
    "page": "Pets",
    "name": "Setvson Hidden Indoor Cat Wood Litter Box",
    "price": 89.99,
    "path": "/images/product-images/product74.jpg",
    "rating": 4.6,
    "brand": "Setvson",
    "num-ratings": 33,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Litter Boxes",
    "amnt-available": 15,
    "material": "Wood",
    "color": "Oak",
    "description": "Stylish wooden litter box enclosure that doubles as furniture, giving your cat privacy and your home a cleaner look."
  },

  {
    "id": 75,
    "page": "Pets",
    "name": "Oxbox Essentials Rabbit Food Made with Timothy Hay and Pet Pellets",
    "price": 18.25,
    "path": "/images/product-images/product75.jpg",
    "rating": 4.7,
    "brand": "Oxbox",
    "num-ratings": 24,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Small Pet Food",
    "amnt-available": 30,
    "material": "Timothy Hay, Pellets",
    "color": "Green/Brown",
    "description": "Nutritious rabbit food formulated with high-fiber Timothy hay and quality pellets to support your rabbit's digestive health."
  },

  {
    "id": 76,
    "page": "Pets",
    "name": "Umocuoy Cat Stainless Steel Indoor Water Fountain",
    "price": 42.00,
    "path": "/images/product-images/product76.jpg",
    "rating": 4.3,
    "brand": "Umocuoy",
    "num-ratings": 20,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Feeders & Fountains",
    "amnt-available": 26,
    "material": "Stainless Steel",
    "color": "Silver",
    "description": "Quiet and efficient cat water fountain made from stainless steel, encouraging healthy hydration with easy cleaning."
  },

  {
    "id": 77,
    "page": "Pets",
    "name": "DoogCat Wood Ball Tower Game Toy for Cats and Kittens",
    "price": 25.99,
    "path": "/images/product-images/product77.jpg",
    "rating": 4.5,
    "brand": "DoogCat",
    "num-ratings": 29,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Toys",
    "amnt-available": 21,
    "material": "Wood",
    "color": "Natural Wood",
    "description": "A fun, engaging ball tower toy made from sustainable wood, designed to keep cats entertained for hours."
  },

  {
    "id": 78,
    "page": "Pets",
    "name": "Sofier Rabbit/Guinea Pig 8pc Grass Chew Balls",
    "price": 14.99,
    "path": "/images/product-images/product78.jpg",
    "rating": 4.4,
    "brand": "Sofier",
    "num-ratings": 15,
    "num-reviews": 0,
    "category": "Pets",
    "sub-category": "Small Pet Toys",
    "amnt-available": 32,
    "material": "Natural Grass",
    "color": "Light Brown",
    "description": "An 8-piece set of natural grass chew balls designed for rabbits and guinea pigs to promote dental health and provide hours of fun."
  }
];

const main = document.querySelector('main');

// Gather first value after decimal point of rating 
function determineFirstDecimalDigit(num) {
  return Math.floor((num * 10) % 10);
}

function displayTurtleRating(product) {

  // Get the star rating for each product
  const ratingFirstDigit = determineFirstDecimalDigit(product.rating);
  let roundedProductRating;

  // Round product.rating to the nearest 0.5
  if (ratingFirstDigit < 3) {
    roundedProductRating = Math.floor(product.rating);
  } else if (ratingFirstDigit > 2 && ratingFirstDigit < 8) {
  roundedProductRating = Math.floor(product.rating) + 0.5;
  } else if (ratingFirstDigit > 7) {
  roundedProductRating = Math.ceil(product.rating);
  }
  console.log(`product: ${product.id} rounded rating: ${roundedProductRating}`);

  // Store the turtle icons generated in a variable
  let turtles = '';
  for(let i = 1; i <= Math.floor(roundedProductRating); i++) {
    turtles += `<img class="turtle-icon" src="/images/base-images/turtle-icon.png" alt="Turtle rating icon" />`;
  }
  if((roundedProductRating % 1) === 0.5) {
    turtles += `<img class="turtle-icon" id="halved-turtle-icon" src="/images/base-images/halved-turtle-icon.png" alt="Halved turtle rating icon" />`;
  }

  // Store unique visual turtle rating for each product in localStorage
  localStorage.setItem(`turtle-rating${product.id}`, turtles);
  return turtles;
}

// Reusable function to generate HTML for each product.
function generateHTML(product) {
  return ` 
    <div class="item-container"> 
      <img class="product-img" src="${product.path}" alt="${product.name}" /> 
      <a href="/code/product-code/pets-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${displayTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}

// Generate code
let html = productsArray.map(generateHTML).join('');
main.innerHTML = html;


// Shopping Section


const cartProductData = createCartProductData()const cartQuantity = cartProductData.length || 0;
const badge = document.querySelector('.js-badge');
const badgeQuantity = document.querySelector('.js-badge-quantity');

// Display badge if cartSize > 0 upon load
if (cartQuantity > 0) {
  badge.classList.remove('hidden');
  badgeQuantity.classList.remove('hidden');
  badgeQuantity.innerHTML = cartQuantity;
}