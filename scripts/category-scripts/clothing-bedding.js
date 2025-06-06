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
    "id": 19,
    "page": "Clothing & Bedding",
    "name": "Amy Coulee 100% Cotton Men's Athletic Shorts Elastic Waist Navy Color",
    "price": 24.99,
    "path": "/images/product-images/product19.jpg",
    "rating": 4.5,
    "brand": "Amy Coulee",
    "num-ratings": 12,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Men's Shorts",
    "amnt-available": 21,
    "material": "100% Cotton",
    "color": "Navy Blue",
    "description": "Stay cool and move freely with the Amy Coulee 100% Cotton Men's Athletic Shorts. Crafted for comfort and breathability, these soft navy shorts are perfect for workouts, lounging, or everyday wear. With a secure elastic waistband and mid-thigh fit, they deliver both ease and style—wherever your day takes you."
  },

  {
    "id": 20,
    "page": "Clothing & Bedding",
    "name": "Arjen Kroos Men's 100% Cotton Athletic Shorts 5 Inch Inseam",
    "price": 22.99,
    "path": "/images/product-images/product20.jpg",
    "rating": 4.6,
    "brand": "Arjen Kroos",
    "num-ratings": 7,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Men's Shorts",
    "amnt-available": 26,
    "material": "100% Cotton",
    "color": "Pale Pink",
    "description": "Move with ease and stay comfortable in the Arjen Kroos Men's 100% Cotton Athletic Shorts. Designed with a breathable fabric and a modern 5-inch inseam, these shorts offer soft, all-day wear for workouts, lounging, or casual outings. The elastic waistband ensures a secure fit—keeping you cool, confident, and ready for anything."
  },

  {
    "id": 21,
    "page": "Clothing & Bedding",
    "name": "Coofandy Men's 100% Cotton Button Down Shirt Beach Style Caramel Color",
    "price": 22.99,
    "path": "/images/product-images/product21.jpg",
    "rating": 4.7,
    "brand": "Coofandy",
    "num-ratings": 5,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Men's Shirts",
    "amnt-available": 32,
    "material": "100% Cotton",
    "color": "Caramel",
    "description": "Keep it breezy and effortless with the Coofandy Men's 100% Cotton Button Down Shirt. Lightweight and breathable in a warm caramel hue, this beach-inspired shirt brings laid-back comfort and style to sunny days, casual outings, or weekend getaways."
  },

  {
    "id": 22,
    "page": "Clothing & Bedding",
    "name": "Wrangler Authentics 100% Cotton Men's Classic Regular Fit Jeans",
    "price": 34.99,
    "path": "/images/product-images/product22.jpg",
    "rating": 4.8,
    "brand": "Wrangler",
    "num-ratings": 25,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Men's Jeans",
    "amnt-available": 34,
    "material": "100% Cotton",
    "color": "Blue",
    "description": "Step into everyday comfort with Wrangler Authentics 100% Cotton Men's Classic Regular Fit Jeans. Made from durable cotton denim, these timeless jeans offer a relaxed fit through the seat and thigh—perfect for casual wear, outdoor work, or laid-back weekends."
  },

  {
    "id": 23,
    "page": "Clothing & Bedding",
    "name": "Hanes Men's Moisture-Wicking and Breathable Boxer Briefs 5-Pack",
    "price": 19.99,
    "path": "/images/product-images/product23.jpg",
    "rating": 4.6,
    "brand": "Hanes",
    "num-ratings": 16,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Men's Boxers",
    "amnt-available": 24,
    "material": "100% Cotton",
    "color": ["Black", "Gray"],
    "description": "Stay dry and comfortable all day with Hanes Men's Moisture-Wicking and Breathable Boxer Briefs. This convenient 5-pack delivers soft, supportive fit and advanced moisture control—perfect for workouts, busy days, or everyday wear."
  },

  {
    "id": 24,
    "page": "Clothing & Bedding",
    "name": "Grange Craft 100% Irish Wool socks for Women and Men",
    "price": 18.99,
    "path": "/images/product-images/product24.jpg",
    "rating": 4.6,
    "brand": "Grange Craft",
    "num-ratings": 19,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Socks",
    "amnt-available": 24,
    "material": "100% Irish Wool",
    "color": "Black, Gray",
    "description": "Wrap your feet in cozy comfort with Grange Craft 100% Irish Wool Socks for Women and Men. Crafted in Ireland from pure wool, these socks provide natural warmth, breathability, and timeless style—perfect for chilly mornings, relaxed evenings, or thoughtful gifting."
  },

  {
    "id": 25,
    "page": "Clothing & Bedding",
    "name": "California Design 100% Cotton Sheets Queen Size Bed Set 400 Thread Count White",
    "price": 49.99,
    "path": "/images/product-images/product25.jpg",
    "rating": 4.6,
    "brand": "California Design",
    "num-ratings": 15,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Bedding",
    "amnt-available": 12,
    "material": "100% Cotton",
    "color": "White",
    "description": "Wrap yourself in luxurious softness with the California Design 100% Cotton Sheets Queen Size Bed Set. Made from premium 400 thread count cotton, these crisp white sheets offer exceptional comfort, breathability, and durability—perfect for restful nights, stylish bedrooms, and thoughtful gifting."
  },

  {
    "id": 26,
    "page": "Clothing & Bedding",
    "name": "Palassio 100% Cotton Queen Size with 2 Pillow Shams",
    "price": 49.99,
    "path": "/images/product-images/product26.jpg",
    "rating": 4.7,
    "brand": "Palassio",
    "num-ratings": 15,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Bedding",
    "amnt-available": 12,
    "material": "100% Cotton",
    "color": "White",
    "description": "Elevate your bedding with the Palassio 100% Cotton Queen Size Set, complete with 2 matching pillow shams. Crafted from pure, breathable cotton, this set offers soft comfort, lasting quality, and classic style—ideal for cozy nights, everyday elegance, or thoughtful gifting."
  },

  {
    "id": 27,
    "page": "Clothing & Bedding",
    "name": "Dore & Rose Mulberry Silk Light Blocking Adjustable Eye Mask ",
    "price": 53.99,
    "path": "/images/product-images/product27.jpg",
    "rating": 4.8,
    "brand": "Dore & Rose",
    "num-ratings": 29,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Sleep Masks",
    "amnt-available": 50,
    "material": "100% Mulberry Silk",
    "color": "Olive",
    "description": "Indulge in restful sleep with the Dore & Rose Mulberry Silk Light Blocking Adjustable Eye Mask. Made from luxurious mulberry silk, it features a soft, skin-friendly feel, full light blocking, and an adjustable strap—perfect for travel, meditation, or nightly relaxation."
  },

  {
    "id": 28,
    "page": "Clothing & Bedding",
    "name": "Duyang Womens Palazzo Pants Elastic Waist with Pockets",
    "price": 32.99,
    "path": "/images/product-images/product28.jpg",
    "rating": 4.8,
    "brand": "Duyang",
    "num-ratings": 49,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Women's Pants",
    "amnt-available": 6,
    "material": "70% Cotton, 30% Linen",
    "color": "Khaki",
    "description": "Stay stylish and comfortable with the Duyang Women’s Palazzo Pants, featuring a relaxed fit, elastic waistband, and handy side pockets. Perfect for everyday wear or travel, these lightweight pants offer breezy movement and easy elegance in any setting."
  },

  {
    "id": 29,
    "page": "Clothing & Bedding",
    "name": "R. Vivimos Women's Black Dress Long Sleeve Floral Embroidered",
    "price": 47.99,
    "path": "/images/product-images/product29.jpg",
    "rating": 4.3,
    "brand": "R. Vivimos",
    "num-ratings": 49,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Women's Dresses",
    "amnt-available": 6,
    "material": "70% Cotton, 30% Linen",
    "color": "Black",
    "description": "Embrace timeless elegance with the R. Vivimos Women's Black Dress, featuring long sleeves and delicate floral embroidery. Crafted for both comfort and charm, this flowy silhouette is perfect for special occasions, evening outings, or a touch of romance in everyday wear."
  },

  {
    "id": 30,
    "page": "Clothing & Bedding",
    "name": "Comfort Colors Lightweight Hoodie",
    "price": 29.99,
    "path": "/images/product-images/product30.jpg",
    "rating": 4.4,
    "brand": "Comfort Colors",
    "num-ratings": 12,
    "num-reviews": 0,
    "category": "Clothing & Bedding",
    "sub-category": "Hoodies",
    "amnt-available": 22,
    "material": "100% Cotton",
    "color": "White",
    "description": "Stay cozy in the Comfort Colors Lightweight Hoodie, designed with ultra-soft cotton for relaxed everyday wear. With a lived-in feel, adjustable hood, and classic fit, it’s perfect for layering through every season—easygoing comfort with timeless style."
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
      <a href="/code/product-code/clothing-bedding-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${displayTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}

// Generate code
let html = productsArray.map(generateHTML).join('');
main.innerHTML = html;