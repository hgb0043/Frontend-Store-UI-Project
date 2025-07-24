import { initializeHeader } from '/scripts/utils/header-utils.js';

import { createCartProductData, calculateCartQuantity } from '/scripts/utils/cart-utils.js';

import { generateCategoryProductHTML } from '/scripts/utils/product-utils.js';


// Run header logic when page first loads or is refreshed
initializeHeader();

// Display badge if cartSize > 0 upon load
function displayBadge(cartQty, badge, badgeQty) {
  if (cartQty > 0) {
    badge.classList.remove('hidden');
    badgeQty.classList.remove('hidden');
    badgeQty.innerHTML = cartQty;
  }
}


async function runScriptLogic() {
  // Fetch and parse product data
  try {
    const data = await fetch('/data/products.json');
    const jsonData = await data.json();
    // Sort products into arrays for future code generation
    const healthProductsArray = jsonData.filter(product => product.page === 'home' && product.category === 'Health & Beauty');
    const clothingProductsArray = jsonData.filter(product => product.page === 'home' && product.category === 'Clothing & Bedding');

    const healthProductsContainer = document.getElementById('js-health-products-container');
    const clothingProductsContainer = document.getElementById('js-clothing-products-container');

    generateSectionCode(healthProductsArray, healthProductsContainer);
    generateSectionCode(clothingProductsArray, clothingProductsContainer);
    

    const cartProductData = createCartProductData();
    const cartQuantity = calculateCartQuantity(cartProductData);
    const badge = document.querySelector('.js-badge');
    const badgeQuantity = document.querySelector('.js-badge-quantity');

    displayBadge(cartQuantity, badge, badgeQuantity);

    generateCategorySection()
  } catch {
    console.error('failure to load', error);
  }
}
// Run when page first loads or is refreshed
runScriptLogic();

// Generate code for "Our Top Health Picks Section"
function generateSectionCode(array, container) {
  const html = array.map(generateCategoryProductHTML).join('');
  container.innerHTML = html;
}

// Combine generated HTML code for the category section
async function generateCategorySection() {
  const categoryData = await fetch('/data/categories.json');
  const jsonCategoryData = await categoryData.json();

  const browseSection = document.querySelector('.js-browse-section');
  browseSection.innerHTML = jsonCategoryData.map(generateIndividualCategoryIcon).join('');
}

// HTML code for each category icon
function generateIndividualCategoryIcon(category) {
  console.log(category.page);
  return `
  <a class="category-link" href="/code/category.html?category=${category.page}">
  <div class="category-container"> 
    <div class="circle-container" id="circle-container-${category.id}">
      <i class="fa-solid fa-${category.icon} fa-browse"></i>
    </div>
    <p class="category-title">${category.name}</p>
  </div>
  </a>
  `;
}