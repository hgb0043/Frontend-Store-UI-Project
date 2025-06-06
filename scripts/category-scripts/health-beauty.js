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

// Manages drop=header and up/down arrow visibility based on resolution size
function updateHeaderState() {
  const isWideScreen = window.innerWidth > 1200;

  header.style.height = '50px';
  dropHeader.style.height = '0';

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
    "id": 7,
    "page": "Health & Beauty",
    "name": "Sea Turtle LLC Bamboo Soft Bristled Toothbrushes (4 Pack)",
    "price": 8.99,
    "path": "/images/product-images/product7.jpg",
    "rating": 4.5,
    "brand": "Sea Turtle LLC",
    "num-ratings": 19,
    "num-reviews": 2,
    "category": "Health & Beauty",
    "sub-category": "Oral Health",
    "amnt-available": 25,
    "material": "100% Plant Based",
    "color": "Not Applicable",
    "description": "Keep your smile fresh and your impact low with this 100% plant-based toothbrush from Sea Turtle LLC. Made from biodegradable materials, it delivers a gentle, effective clean while helping reduce plastic waste. Perfect for eco-friendly daily care."
  },

  {
    "id": 8,
    "page": "Health & Beauty",
    "name": "EcoFox 100% Biodegradable Bamboo Cotton Buds Premium Quality Organic Cotton",
    "price": 7.99,
    "path": "/images/product-images/product8.jpg",
    "rating": 3.6,
    "brand": "Sea Turtle LLC",
    "num-ratings": 9,
    "num-reviews": 1,
    "category": "Health & Beauty",
    "sub-category": "Cotton Swabs",
    "amnt-available": 65,
    "material": "Bamboo Cotton",
    "color": "White",
    "description": "Keep your routine plastic-free with EcoFox bamboo cotton buds from Sea Turtle LLC. Made with 100% biodegradable bamboo and soft organic cotton, they offer a gentle, eco-friendly alternative for everyday use."
  },

  {
    "id": 9,
    "page": "Health & Beauty",
    "name": "Airnex Plant-based Non-scratch with Long-lasting, Odor-free, Natural Fibers",
    "price": 11.99,
    "path": "/images/product-images/product9.jpg",
    "rating": 4.4,
    "brand": "Airnex",
    "num-ratings": 14,
    "num-reviews": 2,
    "category": "Health & Beauty",
    "sub-category": "Sponges",
    "amnt-available": 12,
    "material": "Plant-based, non-specified",
    "color": "Not Applicable",
    "description": "Clean tough messes effortlessly with the Airnex plant-based sponge. Made from natural, non-scratch fibers, it’s long-lasting, odor-free, and ideal for eco-friendly cleaning."
  },

  {
    "id": 10,
    "page": "Health & Beauty",
    "name": "Ethique Floral Solid Deodorant Stick Lavender & Vanilla Scented",
    "price": 12.99,
    "path": "/images/product-images/product10.jpg",
    "rating": 4.8,
    "brand": "Ethique",
    "num-ratings": 29,
    "num-reviews": 2,
    "category": "Health & Beauty",
    "sub-category": "Deodorant",
    "amnt-available": 28,
    "material": "See brand website for ingredients",
    "color": "Purple",
    "description": "Stay fresh the natural way with the Ethique Floral Solid Deodorant Stick in lavender and vanilla. Made with plant-based ingredients like magnesium and bamboo, it neutralizes odor without aluminum or baking soda. Gentle, effective, and zero-waste."
  },

  {
    "id": 11,
    "page": "Health & Beauty",
    "name": "Ethique Deep Clean Solid Face Cleanser for Oily to Balanced Skin Deep Green",
    "price": 19.99,
    "path": "/images/product-images/product11.jpg",
    "rating": 4.8,
    "brand": "Ethique",
    "num-ratings": 41,
    "num-reviews": 4,
    "category": "Health & Beauty",
    "sub-category": "Face Wash/Cleanser",
    "amnt-available": 5,
    "material": "See brand website for ingredients",
    "color": "Green",
    "description": "Refresh your skin with the Ethique Deep Clean Solid Face Cleanser. Ideal for oily to balanced skin, this deep green bar gently lifts away excess oil and impurities using natural ingredients — all without plastic packaging."
  },

  {
    "id": 12,
    "page": "Health & Beauty",
    "name": "Hibar Solid Moisturizing Shampoo",
    "price": 14.99,
    "path": "/images/product-images/product12.jpg",
    "rating": 4.4,
    "brand": "Hibar",
    "num-ratings": 23,
    "num-reviews": 2,
    "category": "Health & Beauty",
    "sub-category": "Hair Care",
    "amnt-available": 12,
    "material": "See brand website for ingredients",
    "color": "Blue",
    "description": "Cleanse and hydrate your hair naturally with the hibar Solid Moisturizing Shampoo. This eco-friendly shampoo bar nourishes your scalp while reducing plastic waste, making it perfect for everyday hair care."
  },

  {
    "id": 13,
    "page": "Health & Beauty",
    "name": "NOBS (No Bad Stuff) Fluoride-free Toothpase",
    "price": 19.99,
    "path": "/images/product-images/product13.jpg",
    "rating": 4.8,
    "brand": "NOBS",
    "num-ratings": 14,
    "num-reviews": 0,
    "category": "Health & Beauty",
    "sub-category": "Toothpaste",
    "amnt-available": 19,
    "material": "See brand website for ingredients",
    "color": "Not Applicable",
    "description": "Freshen your smile with NOBS Fluoride-Free Toothpaste Tablets. These eco-friendly tablets clean effectively without harsh chemicals, offering a natural alternative to traditional toothpaste while helping reduce plastic waste."
  },

  {
    "id": 14,
    "page": "Health & Beauty",
    "name": "ATTITUDE Lightweight Vegan Blush Stick, Happy Berry, 0.3 oz – Plastic-, Titanium-, and Cruelty-Free",
    "price": 24.99,
    "path": "/images/product-images/product14.jpg",
    "rating": 4.2,
    "brand": "ATTITUDE",
    "num-ratings": 4,
    "num-reviews": 0,
    "category": "Health & Beauty",
    "sub-category": "Makeup",
    "amnt-available": 59,
    "material": "See brand website for ingredients",
    "color": "Happy Berry Red",
    "description": "Add a natural flush with the ATTITUDE Lightweight Blush Stick in Happy Berry. This vegan, plastic- and cruelty-free formula glides on smoothly for buildable color, offering a clean, eco-conscious touch to your beauty routine."
  },

  {
    "id": 15,
    "page": "Health & Beauty",
    "name": "Cora 100% Organic Cotton Tampons SoftTouch Compact Applicator Leak Protection Size 18 Super & 18 Super Plus Absorbency",
    "price": 15.99,
    "path": "/images/product-images/product15.jpg",
    "rating": 4.3,
    "brand": "Cora",
    "num-ratings": 11,
    "num-reviews": 0,
    "category": "Health & Beauty",
    "sub-category": "Tampons",
    "amnt-available": 22,
    "material": "100% Cotton",
    "color": "Not Applicable",
    "description": "Stay confident and protected with Cora 100% Organic Cotton Tampons. Featuring a SoftTouch compact applicator and dual absorbency options, these tampons offer reliable leak protection with no synthetic ingredients—just clean, comfortable care."
  },

  {
    "id": 16,
    "page": "Health & Beauty",
    "name": "Bambaw 5 Blade Double Edge Reusable Safety Razor for Women and Men",
    "price": 15.99,
    "path": "/images/product-images/product16.jpg",
    "rating": 4.3,
    "brand": "Bambaw",
    "num-ratings": 9,
    "num-reviews": 0,
    "category": "Health & Beauty",
    "sub-category": "Razors",
    "amnt-available": 39,
    "material": "Metal",
    "color": "Pink",
    "description": "Shave sustainably with the Bambaw 5 Blade Double Edge Reusable Safety Razor. Designed for both women and men, this eco-friendly razor delivers a close, smooth shave without the waste of disposable alternatives."
  },

  {
    "id": 17,
    "page": "Health & Beauty",
    "name": "The Art of Shaving Sandalwood Sensitive Skin Hydrating and Nourishing Shaving Cream for Men",
    "price": 29.99,
    "path": "/images/product-images/product17.jpg",
    "rating": 4.9,
    "brand": "The Art of Shaving",
    "num-ratings": 11,
    "num-reviews": 0,
    "category": "Health & Beauty",
    "sub-category": "Shaving Cream",
    "amnt-available": 2,
    "material": "See brand website for ingredients",
    "color": "Not Applicable",
    "description": "Soothe and protect your skin with The Art of Shaving Sandalwood Shaving Cream. Formulated for sensitive skin, this rich, hydrating cream softens facial hair and nourishes the skin for a smooth, irritation-free shave."
  },

  {
    "id": 18,
    "page": "Health & Beauty",
    "name": "Pumice Valley Wooden Pumice Stone Foot File for Dead Skin Removal",
    "price": 9.99,
    "path": "/images/product-images/product18.jpg",
    "rating": 3.9,
    "brand": "Pumice Valley",
    "num-ratings": 6,
    "num-reviews": 0,
    "category": "Health & Beauty",
    "sub-category": "Pumice Stone",
    "amnt-available": 2,
    "material": "Wood",
    "color": "Not Applicable",
    "description": "Gently exfoliate and smooth your feet with the Pumice Valley Wooden Pumice Stone Foot File. Designed to remove dead skin and calluses, this natural tool leaves your feet soft, refreshed, and sandal-ready."
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
      <a href="/code/product-code/health-beauty-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${displayTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}

// Generate code
let html = productsArray.map(generateHTML).join('');
main.innerHTML = html;