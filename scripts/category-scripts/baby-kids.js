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

// Make drop-header retract if window is big enough to display header links in main header 
window.addEventListener('resize', () => {
  if (window.innerWidth > 1200) {
    header.style.height = '50px';
    dropHeader.style.height = '0';
    downArrow.classList.add('hidden');
    upArrow.classList.add('hidden');
  } else if (window.innerWidth <= 1200) {
    header.style.height = '50px';
    dropHeader.style.height = '0';
    downArrow.classList.remove('hidden');
  }
})


// Main Section 


// Products from products.json
const productsArray = [
  {
    "id": 55,
    "page": "Baby & Kids",
    "name": "Hevea Two-Pack Newborn Pacifier Natural Rubber",
    "price": 14.99,
    "path": "/images/product-images/product55.jpg",
    "rating": 4.6,
    "brand": "Hevea",
    "num-ratings": 18,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Pacifiers & Teethers",
    "amnt-available": 22,
    "material": "Natural Rubber",
    "color": "Brown",
    "description": "Soothe your newborn naturally with the Hevea Natural Rubber Pacifier set. Made from 100% natural rubber, these pacifiers are soft, safe, and gentle on sensitive skin—an eco-friendly essential for peaceful comfort."
  },

  {
    "id": 56,
    "page": "Baby & Kids",
    "name": "Sea Turtle 4-Pack Natural Fiber Kids ToothBrush",
    "price": 7.49,
    "path": "/images/product-images/product56.jpg",
    "rating": 4.7,
    "brand": "Sea Turtle",
    "num-ratings": 9,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Bath & Hygiene",
    "amnt-available": 35,
    "material": "Bamboo",
    "color": "Multi",
    "description": "Make brushing fun and sustainable with the Sea Turtle Natural Fiber Toothbrush Set for kids. Crafted from eco-friendly bamboo and designed for small hands, this 4-pack supports healthy habits while protecting the planet."
  },

  {
    "id": 57,
    "page": "Baby & Kids",
    "name": "PlanetBox Old School Stainless Steel Lunch Box",
    "price": 39.95,
    "path": "/images/product-images/product57.jpg",
    "rating": 4.8,
    "brand": "PlanetBox",
    "num-ratings": 27,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Feeding & Storage",
    "amnt-available": 15,
    "material": "Stainless Steel",
    "color": "Silver",
    "description": "Upgrade school lunches with the PlanetBox Old School Lunch Box. Made of durable stainless steel and free of plastic, it keeps food fresh and compartments organized—classic design for modern mealtime."
  },

  {
    "id": 58,
    "page": "Baby & Kids",
    "name": "Cherie Kids Soft Baby Jumpsuit Onesie Unisex 0-24 Months",
    "price": 22.99,
    "path": "/images/product-images/product58.jpg",
    "rating": 4.6,
    "brand": "Cherie",
    "num-ratings": 11,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Clothing",
    "amnt-available": 28,
    "material": "Cotton Blend",
    "color": "Cream",
    "description": "Wrap your baby in comfort with the Cherie Soft Jumpsuit Onesie. Designed for all-day coziness, this unisex outfit features breathable cotton and an easy snap design—perfect for playtime or naptime."
  },

  {
    "id": 59,
    "page": "Baby & Kids",
    "name": "Shumee Spinning Top Toy for 2-5 Year Olds",
    "price": 12.49,
    "path": "/images/product-images/product59.jpg",
    "rating": 4.7,
    "brand": "Shumee",
    "num-ratings": 16,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Toys",
    "amnt-available": 40,
    "material": "Wood",
    "color": "Multi",
    "description": "Delight little ones with the Shumee Spinning Top Toy, crafted from natural wood and painted with safe colors. Designed to encourage fine motor skills and curiosity, it’s a joyful and safe classic."
  },

  {
    "id": 60,
    "page": "Baby & Kids",
    "name": "Evenflo Stair Extra Tall Wooden Gate for Children and Pets",
    "price": 39.99,
    "path": "/images/product-images/product60.jpg",
    "rating": 4.5,
    "brand": "Evenflo",
    "num-ratings": 30,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Home Safety",
    "amnt-available": 19,
    "material": "Wood & Metal",
    "color": "Walnut",
    "description": "Keep your child safe with the Evenflo Extra Tall Stair Gate, built from strong wood and metal. Its height and durable design make it ideal for stairways and doorways—secure protection with timeless style."
  },

  {
    "id": 61,
    "page": "Baby & Kids",
    "name": "Honeysticks Natural Material 8-Color Watercolor Paint Set for Kids and Toddlers",
    "price": 16.99,
    "path": "/images/product-images/product61.jpg",
    "rating": 4.6,
    "brand": "Honeysticks",
    "num-ratings": 14,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Arts & Crafts",
    "amnt-available": 22,
    "material": "Natural Pigment",
    "color": "Multi",
    "description": "Let creativity flow with the Honeysticks Watercolor Paint Set, made from natural, non-toxic materials. Designed for little hands, these safe and vibrant paints are perfect for artistic toddlers and eco-conscious parents."
  },

  {
    "id": 62,
    "page": "Baby & Kids",
    "name": "HonestBaby 100% Organic Cotton 5-Pack Short Sleeve Onesie",
    "price": 28.99,
    "path": "/images/product-images/product62.jpg",
    "rating": 4.9,
    "brand": "HonestBaby",
    "num-ratings": 19,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Clothing",
    "amnt-available": 33,
    "material": "100% Organic Cotton",
    "color": "White",
    "description": "Dress your little one in softness and sustainability with the HonestBaby Organic Cotton Onesies. This 5-pack offers breathable comfort, simple snaps, and timeless white for everyday wear."
  },

  {
    "id": 63,
    "page": "Baby & Kids",
    "name": "HonestBaby 100% Organic Cotton 5-Pack Short Sleeve Onesie",
    "price": 28.99,
    "path": "/images/product-images/product63.jpg",
    "rating": 4.9,
    "brand": "HonestBaby",
    "num-ratings": 19,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Clothing",
    "amnt-available": 33,
    "material": "100% Organic Cotton",
    "color": "White",
    "description": "Dress your little one in softness and sustainability with the HonestBaby Organic Cotton Onesies. This 5-pack offers breathable comfort, simple snaps, and timeless white for everyday wear."
  },

  {
    "id": 64,
    "page": "Baby & Kids",
    "name": "WeeSprout Bamboo Kids Cups 4pc Colored",
    "price": 17.99,
    "path": "/images/product-images/product64.jpg",
    "rating": 4.7,
    "brand": "WeeSprout",
    "num-ratings": 11,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Feeding & Storage",
    "amnt-available": 26,
    "material": "Bamboo Fiber",
    "color": "Assorted",
    "description": "Make mealtimes fun and sustainable with the WeeSprout Bamboo Kids Cups. This colorful 4-piece set is lightweight, eco-friendly, and perfectly sized for little hands—durability meets delightful design."
  },

  {
    "id": 65,
    "page": "Baby & Kids",
    "name": "Grow Forward Bamboo Eco Friendly Dinnerware Set Plates & Bowls",
    "price": 24.99,
    "path": "/images/product-images/product65.jpg",
    "rating": 4.8,
    "brand": "Grow Forward",
    "num-ratings": 17,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Feeding & Storage",
    "amnt-available": 30,
    "material": "Bamboo Fiber",
    "color": "Assorted",
    "description": "Encourage healthy eating with the Grow Forward Eco-Friendly Dinnerware Set. Made with sustainable bamboo, this set of plates and bowls is sturdy, kid-safe, and gentle on the planet—perfect for conscious families."
  },

  {
    "id": 66,
    "page": "Baby & Kids",
    "name": "Magnetic Wood Fishing Game Toy for Toddlers",
    "price": 13.49,
    "path": "/images/product-images/product66.jpg",
    "rating": 4.7,
    "brand": "Little Learners",
    "num-ratings": 12,
    "num-reviews": 0,
    "category": "Baby & Kids",
    "sub-category": "Toys",
    "amnt-available": 21,
    "material": "Wood",
    "color": "Multi",
    "description": "Reel in fun with the Magnetic Wood Fishing Game, designed for curious toddlers. Featuring colorful fish, magnetic rods, and safe wooden pieces, it promotes hand-eye coordination and imaginative play."
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
      <a href="/code/product-code/baby-kids-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${displayTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}

// Generate code
let html = productsArray.map(generateHTML).join('');
main.innerHTML = html;