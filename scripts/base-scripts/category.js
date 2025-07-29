import { initializeHeader } from '/scripts/utils/header-utils.js';

import { generateCategoryProductHTML } from '/scripts/utils/product-utils.js';

// Run header logic when page first loads or is refreshed
initializeHeader();

async function initializeCategoryPage(page) {
  const data = await fetch('/data/products.json');
  const jsonData = await data.json();

  const productsArray = jsonData.filter(product => product.page === page);
  const main = document.querySelector('main');
  console.log(main);

  // Generate code
  let html = productsArray.map(generateCategoryProductHTML).join('');
  main.innerHTML = html;
}
// Run when page first loads or is refreshed

function runInitializeCategoryPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryPage = urlParams.get('category');
  console.log(categoryPage);
  initializeCategoryPage(categoryPage);
}
runInitializeCategoryPage();