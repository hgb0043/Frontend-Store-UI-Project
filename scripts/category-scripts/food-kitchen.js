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
    "id": 31,
    "page": "Food & Kitchen",
    "name": "Royal Craft Wood Bamboo Wood Cutting Board with Groove Side Handles",
    "price": 44.99,
    "path": "/images/product-images/product31.jpg",
    "rating": 4.6,
    "brand": "Royal Craft Wood",
    "num-ratings": 20,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Cutting Boards",
    "amnt-available": 14,
    "material": "Bamboo",
    "color": "Wood",
    "description": "Prep meals in style with the Royal Craft Wood Bamboo Cutting Board, crafted from sustainable bamboo for lasting durability. Featuring deep juice grooves and built-in side handles, it’s perfect for slicing, serving, and carrying with ease—natural function meets timeless kitchen design."
  },
  
  {
    "id": 32,
    "page": "Food & Kitchen",
    "name": "Luxgrace Stainless Steel Whistling Old Fashioned Teapot",
    "price": 18.99,
    "path": "/images/product-images/product32.jpg",
    "rating": 4.3,
    "brand": "Luxgrace",
    "num-ratings": 32,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Teapots and Kettles",
    "amnt-available": 2,
    "material": "Stainless Steel",
    "color": "Black",
    "description": "Bring charm to your stovetop with the Luxgrace Stainless Steel Whistling Teapot, blending old-fashioned elegance with modern function. Its durable stainless steel body and classic whistle ensure a perfect brew every time—timeless style for your daily tea ritual."
  },

  {
    "id": 33,
    "page": "Food & Kitchen",
    "name": "MuellerLiving Stainless Steel French Press Coffee Machine",
    "price": 49.99,
    "path": "/images/product-images/product33.jpg",
    "rating": 4.8,
    "brand": "MuellerLiving",
    "num-ratings": 32,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Coffee Makers",
    "amnt-available": 44,
    "material": "Stainless Steel",
    "color": "Stainless Steel",
    "description": "Brew bold, rich coffee with the MuellerLiving Stainless Steel French Press—crafted for flavor and built to last. With double-wall insulation and sleek design, it delivers café-quality results in minutes—perfect for morning rituals and effortless elegance."
  },

  {
    "id": 34,
    "page": "Food & Kitchen",
    "name": "MemoGem 2-Piece Wooden Spatula Set",
    "price": 9.99,
    "path": "/images/product-images/product34.jpg",
    "rating": 4.8,
    "brand": "MemoGem",
    "num-ratings": 39,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Cookware",
    "amnt-available": 32,
    "material": "Wood",
    "color": "Wood",
    "description": "Cook and serve with natural charm using the MemoGem 2-Piece Wooden Spatula Set. Handcrafted for durability and a smooth finish, these kitchen essentials are gentle on cookware and perfect for everyday use—rustic elegance meets practical design."
  },

  {
    "id": 35,
    "page": "Food & Kitchen",
    "name": "Reddecker 2-Set Natural Boar's Hair Kitchen Cleaner",
    "price": 19.99,
    "path": "/images/product-images/product35.jpg",
    "rating": 4.5,
    "brand": "Redecker",
    "num-ratings": 12,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Cleaning Utensils",
    "amnt-available": 23,
    "material": "Boars Hair",
    "color": "Wood",
    "description": "Tackle tough messes with the Redecker 2-Set Natural Boar’s Hair Kitchen Cleaner. Crafted with dense, gentle bristles and sturdy wooden handles, these brushes offer effective, scratch-free cleaning—classic craftsmanship built for everyday shine."
  },

  {
    "id": 36,
    "page": "Food & Kitchen",
    "name": "Akeeko Beeswax Food Wraps 9 Packs Reusable",
    "price": 12.99,
    "path": "/images/product-images/product36.jpg",
    "rating": 4.3,
    "brand": "Akeeko",
    "num-ratings": 4,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Food Preparation & Storage",
    "amnt-available": 99,
    "material": "Beeswax",
    "color": "Not Applicable",
    "description": "Wrap, seal, and store naturally with Akeeko Beeswax Food Wraps—this 9-pack of reusable wraps offers a sustainable alternative to plastic. Made with organic cotton and beeswax, they mold easily around food and containers for fresh, eco-friendly storage."
  },

  {
    "id": 37,
    "page": "Food & Kitchen",
    "name": "Annie's Organic Mac and Cheese with Real Aged Cheddar",
    "price": 12.99,
    "path": "/images/product-images/product37.jpg",
    "rating": 4.9,
    "brand": "Annie's",
    "num-ratings": 43,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Food",
    "amnt-available": 99,
    "material": "See brand website for ingredients",
    "color": "Not Applicable",
    "description": "Enjoy wholesome comfort with Annie’s Organic Mac and Cheese, crafted with real aged cheddar and organic pasta. A family favorite made with simple ingredients, it’s a creamy, delicious classic you can feel good about—quick to make, satisfying to share."
  },

  {
    "id": 38,
    "page": "Food & Kitchen",
    "name": "Berglander Stainless Steel 13 Pieces Kitchen Utensils Set",
    "price": 34.99,
    "path": "/images/product-images/product38.jpg",
    "rating": 4.8,
    "brand": "Berglander",
    "num-ratings": 21,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Cookware",
    "amnt-available": 16,
    "material": "Stainless Steel",
    "color": "Stainless Steel",
    "description": "Upgrade your kitchen with the Berglander 13-Piece Stainless Steel Utensil Set—sleek, durable, and designed for everyday cooking. With essential tools for every recipe, this set blends modern style with lasting performance for a polished, practical kitchen experience."
  },

  {
    "id": 39,
    "page": "Food & Kitchen",
    "name": "Fox Run Stainless Steel Butter Dish Set",
    "price": 19.99,
    "path": "/images/product-images/product39.jpg",
    "rating": 4.8,
    "brand": "Berglander",
    "num-ratings": 18,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Cookware",
    "amnt-available": 20,
    "material": "Stainless Steel",
    "color": "Stainless Steel",
    "description": "Keep butter fresh and stylishly stored with the Fox Run Stainless Steel Butter Dish Set. Crafted for durability with a sleek, modern design, it includes a fitted lid for clean storage and a polished finish that complements any kitchen or table setting."
  },

  {
    "id": 40,
    "page": "Food & Kitchen",
    "name": "Huachancn 100% Titanium Charcuterie Cutting Board",
    "price": 23.99,
    "path": "/images/product-images/product40.jpg",
    "rating": 4.2,
    "brand": "Huachancn",
    "num-ratings": 20,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Cutting Boards",
    "amnt-available": 20,
    "material": "Titanium",
    "color": "Stainless Steel",
    "description": "Elevate your serving game with the Huachancn 100% Titanium Charcuterie Cutting Board. Combining lightweight strength and sleek design, this board offers a durable, rust-resistant surface perfect for slicing, serving, and presenting your favorite meats and cheeses with style and ease."
  },

  {
    "id": 41,
    "page": "Food & Kitchen",
    "name": "Muyos 5 Pairs Metal Non-Slip Chopsticks",
    "price": 7.99,
    "path": "/images/product-images/product41.jpg",
    "rating": 4.7,
    "brand": "Muyos",
    "num-ratings": 10,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Dining and Tableware",
    "amnt-available": 20,
    "material": "Metal",
    "color": "Stainless Steel",
    "description": "Enjoy effortless dining with the Muyos 5 Pairs Metal Non-Slip Chopsticks. Crafted for a secure grip and sleek durability, these chopsticks combine modern metal design with practical non-slip features, making every meal comfortable and stylish."
  },

  {
    "id": 42,
    "page": "Food & Kitchen",
    "name": "FindMag 8 Pack Stainless Steel Chip Clips",
    "price": 8.99,
    "path": "/images/product-images/product42.jpg",
    "rating": 4.6,
    "brand": "FindMag",
    "num-ratings": 12,
    "num-reviews": 0,
    "category": "Food & Kitchen",
    "sub-category": "Food Preparation & Storage",
    "amnt-available": 90,
    "material": "Stainless Steel",
    "color": "Stainless Steel",
    "description": "Keep snacks fresh and your kitchen organized with the Findmag 8 Pack Stainless Steel Chip Clips. Durable, rust-resistant, and designed with a strong grip, these sleek clips seal bags tightly while adding a touch of style to pantry storage."
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
      <a href="/code/product-code/food-kitchen-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${displayTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}

// Generate code
let html = productsArray.map(generateHTML).join('');
main.innerHTML = html;