import { initializeHeader } from '/scripts/utils/header-utils.js';

import { createCartProductData } from '/scripts/utils/cart-utils.js';

import { generateCategoryProductHTML } from '/scripts/utils/category-utils.js';


// Run header logic when page first loads or is refreshed
initializeHeader();

async function runScriptLogic() {
  // Fetch and parse product data
  try {
    const data = await fetch('/data/products.json');
    const jsonData = await data.json();
    // Sort products into arrays for future code generation
    const healthProductsArray = jsonData.filter(product => product.page === 'Home' && product.category === 'Health & Beauty');
    const clothingProductsArray = jsonData.filter(product => product.page === 'Home' && product.category === 'Clothing & Bedding');

    const healthProductsContainer = document.getElementById('js-health-products-container');
    const clothingProductsContainer = document.getElementById('js-clothing-products-container');

    generateSectionCode(healthProductsArray, healthProductsContainer);
    generateSectionCode(clothingProductsArray, clothingProductsContainer);
    

    const cartProductData = createCartProductData()
    const cartQuantity = cartProductData.length || 0;
    const badge = document.querySelector('.js-badge');
    const badgeQuantity = document.querySelector('.js-badge-quantity');

    displayBadge(cartQuantity, badge, badgeQuantity);
  } catch {
    console.error('failure to load', error);
  }
}
// Run when page first loads or is refreshed
runScriptLogic();

// Generate code for "Our Top Health Picks Section"
function generateSectionCode(array, container) {
  let html = array.map(generateCategoryProductHTML).join('');
  container.innerHTML = html;
}

// Display badge if cartSize > 0 upon load
function displayBadge(cartQty, badge, badgeQty) {
  if (cartQty > 0) {
    badge.classList.remove('hidden');
    badgeQty.classList.remove('hidden');
    badgeQty.innerHTML = cartQty;
  }
}