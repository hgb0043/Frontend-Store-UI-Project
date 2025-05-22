const firstName = localStorage.getItem('first-name')

const menuIcon = document.querySelector('.js-bars');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

const loginStatus = localStorage.getItem('login-status') || '';
const accountMessage = document.querySelector('.account-message');

/* Control whether header displays welcome message or log in/sign up buttons. */
if (loginStatus === 'logged-in') {
  document.querySelector('.account-message').innerHTML = `<p class="welcome-message">Welcome back, ${firstName}</p>`
} else {
  document.querySelector('.account-message').innerHTML = '<a href="login.html" class="permanent-header-link">Log in</a> <a href="signup.html" class="permanent-header-link">Sign up</p></a>' 
};

// Make sidebar funtional
menuIcon.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
  console.log('testing');
  
    sidebarLinks.forEach(element => {
      if(element.classList.contains('hidden')) {
        setTimeout( () => {
          element.classList.remove('hidden');
        }, 225);
      } else {
        setTimeout( () => {
          element.classList.add('hidden');
        }, 50);
      };
    });
});

const products = [ 
  {
    "id": 1,
    "name": "Biodegradable Dental Flossers 100 Count 2 Packs",
    "price": 9.99,
    "path": "../images/product-1.jpg"
  },

  {
    "id": 2,
    "name": "Mens Casual Shorts 7inch Inseam",
    "price": 23.99,
    "path": "../images/product-2.jpg"
  },

  {
    "id": 3,
    "name": "240z Stainless Steel Water Bottle",
    "price": 14.99,
    "path": "../images/product-3.jpg"
  }
];

const productGrid = document.querySelector('.product-grid');
const productContainer = document.querySelector('.js-top-picks-container');
const productImg = document.createElement('img');

// Generates items in "top picks of day" section.
products.forEach(product => {
  productGrid.innerHTML += `
    <div class="top-picks-container"> 
      <img class="product-img" src="../images/product-${product.id}.jpg"> 
      <p class="product-name">${product.name}</p> 
      <p class="product-price">$${product.price}</p>
      </div>
    ` 
});