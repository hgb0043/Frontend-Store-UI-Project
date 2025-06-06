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
    "id": 43,
    "page": "Office & School",
    "name": "Pre-Sharpened 200 Count Wood-Cased #2 HB Pencils",
    "price": 15.99,
    "path": "/images/product-images/product43.jpg",
    "rating": 4.7,
    "brand": "ClassicWrite",
    "num-ratings": 58,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Writing Instruments",
    "amnt-available": 75,
    "material": "Wood",
    "color": "Yellow",
    "description": "Get ready for school, work, or creative projects with this bulk pack of 200 pre-sharpened #2 HB pencils. Crafted with high-quality wood casing for durability and smooth writing, these classic yellow pencils are perfect for everyday use, standardized testing, and drawing."
  },

  {
    "id": 44,
    "page": "Office & School",
    "name": "Parker Stainless Steel Ballpoint Pen Blue Ink",
    "price": 12.99,
    "path": "/images/product-images/product44.jpg",
    "rating": 4.7,
    "brand": "Parker",
    "num-ratings": 34,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Writing Instruments",
    "amnt-available": 65,
    "material": "Stainless Steel",
    "color": "Silver",
    "description": "Write smoothly and stylishly with the Parker Stainless Steel Ballpoint Pen featuring blue ink. Known for its durability and classic design, it delivers a comfortable grip for everyday use."
  },

  {
    "id": 45,
    "page": "Office & School",
    "name": "Sandord Artgum Gum 2-Pack Erasers",
    "price": 4.99,
    "path": "/images/product-images/product45.jpg",
    "rating": 4.5,
    "brand": "Sandord",
    "num-ratings": 18,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Erasers",
    "amnt-available": 45,
    "material": "Rubber",
    "color": "Beige",
    "description": "Remove pencil marks cleanly with the Sandord Artgum Gum 2-Pack Erasers. Designed for precise corrections, these erasers leave minimal residue and are gentle on paper."
  },

  {
    "id": 46,
    "page": "Office & School",
    "name": "Swingline Metal Silver-Colored 30 Sheet Office Stapler",
    "price": 19.99,
    "path": "/images/product-images/product46.jpg",
    "rating": 4.6,
    "brand": "Swingline",
    "num-ratings": 27,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Staplers",
    "amnt-available": 39,
    "material": "Metal",
    "color": "Silver",
    "description": "Staple up to 30 sheets effortlessly with the Swingline Metal Silver-Colored Office Stapler. Durable and reliable, it’s perfect for both home and office use."
  },

  {
    "id": 47,
    "page": "Office & School",
    "name": "Officemate Letter Size Clipboard from Recycled Wood Fibers",
    "price": 9.99,
    "path": "/images/product-images/product47.jpg",
    "rating": 4.4,
    "brand": "Officemate",
    "num-ratings": 22,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Clipboards",
    "amnt-available": 50,
    "material": "Recycled Wood Fibers",
    "color": "Brown",
    "description": "Eco-friendly and sturdy, the Officemate Letter Size Clipboard made from recycled wood fibers provides a reliable writing surface wherever you go."
  },

  {
    "id": 48,
    "page": "Office & School",
    "name": "Giantex 100% Bamboo Compact Modern Work Desk",
    "price": 149.99,
    "path": "/images/product-images/product48.jpg",
    "rating": 4.3,
    "brand": "Giantex",
    "num-ratings": 16,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Desks",
    "amnt-available": 12,
    "material": "Bamboo",
    "color": "Natural Bamboo",
    "description": "Bring natural style to your workspace with the Giantex 100% Bamboo Compact Modern Work Desk. Sustainable and sleek, it fits perfectly in small spaces while providing ample workspace."
  },

  {
    "id": 49,
    "page": "Office & School",
    "name": "Liry Products Wood Office Desk Organizer",
    "price": 29.99,
    "path": "/images/product-images/product49.jpg",
    "rating": 4.7,
    "brand": "Liry Products",
    "num-ratings": 25,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Organizers",
    "amnt-available": 28,
    "material": "Wood",
    "color": "Natural Wood",
    "description": "Keep your desk neat and stylish with the Liry Products Wood Office Desk Organizer, offering multiple compartments for all your stationery and office essentials."
  },

  {
    "id": 50,
    "page": "Office & School",
    "name": "Prettidecor Metal Thinker Statues with Step Platform",
    "price": 34.99,
    "path": "/images/product-images/product50.jpg",
    "rating": 4.2,
    "brand": "Prettidecor",
    "num-ratings": 8,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Statues",
    "amnt-available": 15,
    "material": "Metal",
    "color": "Black",
    "description": "Add a touch of thoughtful elegance with the Prettidecor Metal Thinker Statues featuring a stepped platform for modern office or home decor."
  },

  {
    "id": 51,
    "page": "Office & School",
    "name": "SunBlogs Horse Statue Decoration Metal Figurine",
    "price": 27.99,
    "path": "/images/product-images/product51.jpg",
    "rating": 4.4,
    "brand": "SunBlogs",
    "num-ratings": 14,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Figurines",
    "amnt-available": 17,
    "material": "Metal",
    "color": "Bronze",
    "description": "Decorate your workspace with the SunBlogs Horse Statue Metal Figurine, blending artistic design with durable construction for a statement piece."
  },

  {
    "id": 52,
    "page": "Storage & Organization",
    "name": "ABenkle Cotton Woven White Basket for Office & Home",
    "price": 24.99,
    "path": "/images/product-images/product52.jpg",
    "rating": 4.5,
    "brand": "ABenkle",
    "num-ratings": 19,
    "num-reviews": 0,
    "category": "Storage & Organization",
    "sub-category": "Baskets",
    "amnt-available": 33,
    "material": "Cotton",
    "color": "White",
    "description": "Store essentials stylishly with the ABenkle Cotton Woven White Basket, perfect for both office and home organization with its natural cotton weave."
  },

  {
    "id": 53,
    "page": "Office & School",
    "name": "Anji Bamboo Office Chairmat Walnut Color",
    "price": 59.99,
    "path": "/images/product-images/product53.jpg",
    "rating": 4.3,
    "brand": "Anji",
    "num-ratings": 11,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Chair Mats",
    "amnt-available": 14,
    "material": "Bamboo",
    "color": "Walnut",
    "description": "Protect your floors and add style with the Anji Bamboo Office Chairmat in a warm walnut color, combining eco-friendly materials with durability."
  },

  {
    "id": 54,
    "page": "Office & School",
    "name": "Haus and Hue Modern Picture Frame Beige Oak Wood",
    "price": 39.99,
    "path": "/images/product-images/product54.jpg",
    "rating": 4.4,
    "brand": "Haus and Hue",
    "num-ratings": 17,
    "num-reviews": 0,
    "category": "Office & School",
    "sub-category": "Picture Frames",
    "amnt-available": 26,
    "material": "Oak Wood",
    "color": "Beige",
    "description": "Showcase your favorite memories in style with the Haus and Hue Modern Picture Frame crafted from beige oak wood for a natural, contemporary look."
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
      <a href="/code/product-code/office-school-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${displayTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}

// Generate code
let html = productsArray.map(generateHTML).join('');
main.innerHTML = html;