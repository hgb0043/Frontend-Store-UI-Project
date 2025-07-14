import { generateProductTurtleRating } from '/scripts/utils/product-utils.js';

// Reusable function to generate HTML for each product.
export function generateCategoryProductHTML(product) {
  return ` 
    <div class="item-container"> 
      <img class="product-img" src="${product.path}" alt="${product.name}" /> 
      <a href="/code/base-code/product.html?id=${product.id}" class="product-name">${product.name}</a> 
      <div class="turtle-container">${generateProductTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
    </div>
    `;
}