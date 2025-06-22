import { createCartProductData, initializeHeader, generateProductTurtleRating} from './utils.js'


// Run header logic when page first loads or is refreshed
initializeHeader();


// Generate content and establish logic when page loads
function initializeCartPage() {
  const cartProductData = createCartProductData();
  
  // End the function if cart is empty
  if(cartProductData.length === 0) {
    displayEmptyCartMessage();
    return;
  }

  // Display products
  const productsContainer = document.querySelector('.js-products-container');
  productsContainer.innerHTML = generateCartProductHTML(cartProductData);
  displayCartProductUI(cartProductData);

  // Display sticky-footer button
  const stickyFooter = document.querySelector('.js-sticky-footer-container');
  stickyFooter.innerHTML = generateCartStickyFooter(
    calculateCartSubtotal(cartProductData), calculateCartQuantity(cartProductData), 
    stickyFooter
  );

  // Establish event listeners to allow user interactivity
  runProductCode(cartProductData);
}
// Run when page first loads or is refreshed
initializeCartPage();

// Generate HTML for each individual product
function generateIndividualProduct(product) {
  return `
    <div class="item-container" data-product-id="${product.id}"> 
      <img class="product-img" src="${product.path}" alt="${product.name}" /> 
      <a href="/code/product-code/home-product-code/product${product.id}.html" class="product-name">${product.name}</a> 
      <div class="turtle-container">${generateProductTurtleRating(product)}</div>
      <p class="product-price">$${product.price}</p>
      <div class="edit-item-container">
        <i class="fa-solid fa-trash decrease-product-icon js-decrease-product-icon${product.id}"></i>
        <span class="product-quantity js-product-quantity${product.id}"></span>
        <i class="fa-solid fa-plus increase-product-icon js-increase-product-icon${product.id}"></i>
      </div>
    </div>
    `;
}

// Combine generated product HTML content
function generateCartProductHTML(data) {
  return data.reduce((total, product) => {
    const current = generateIndividualProduct(product);
    return total + current;
  }, '');
}

// Display generated product HTML content
function displayCartProductUI(data) {
  data.forEach((product) => {
    updateProductQuantityUI(product.id, getProductQuantity(product.id));
    switchDecreaseIcon(product.id);
  })
}

// Display message if cart is empty
function displayEmptyCartMessage() {
  const emptyCartMessage = document.querySelector('.js-empty-cart-message-container');
  emptyCartMessage.innerHTML =  '<h1 class="title js-title">Shopping cart is empty.</h1> <a class="browse-products-link" href="index.html">Browse products</a>'
}

// Calculate cart quantity variable
function calculateCartQuantity(data) {
  const cartTotal = data.reduce((total, product) => {
    const qty = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
    return total + qty;
  }, 0);    
  return cartTotal;
}

// Calculate subtotal variable
function calculateCartSubtotal(data) {
  const totalPrice = data.reduce((total, product) => {
    const productCount = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
    const productPrice = (product.price * productCount)
    return total + Number(productPrice);
  }, 0);

  const roundedTotal = Number(totalPrice.toFixed(2));
  localStorage.setItem('subtotal', roundedTotal);
  return roundedTotal;
}

// Generate sticky footer HTML (bottom of page)
function generateCartStickyFooter(subtotal, qty, footer) {
  if (qty === 0) {
    footer.classList.add('hidden');
    return '';
  } else {
    footer.classList.remove('hidden');
    return ` 
    <span class="subtotal-text js-subtotal-text">
    Subtotal: $${subtotal}
    </span>
    <a href="checkout.html">
    <button class="sticky-footer-button">
    <span class="button-text"> 
    Proceed to Checkout (${qty} ${(qty === 1) ? 'item' : 'items'})
    </span>
    </button>
    </a>
    `
  }
}

// Update cartProductData and UI when an item is removed
function removeCartProduct(data, productId) {
  const itemContainer = document.querySelector(`.item-container[data-product-id="${productId}"]`);
  if (itemContainer) itemContainer.remove();

  const newData = data.filter(p => p.id !== productId);
  localStorage.setItem('cart-product-data', JSON.stringify(newData));
  if (newData.length === 0) displayEmptyCartMessage();
}

function getProductQuantity(productId) {
  return Number(localStorage.getItem(`product-quantity${productId}`)) || 1;
}

// Update product quantity when the plus or minus icon is selected
function updateProductQuantity(productId, qty, data, direction) {
  let newQty = qty;
  if (direction === '+') newQty = qty + 1;
  else if (direction === '-') newQty = qty - 1;

  if (newQty < 1) {
    localStorage.removeItem(`product-quantity${productId}`);
    removeCartProduct(data, productId);
    return newQty;
  } else {
    localStorage.setItem(`product-quantity${productId}`, JSON.stringify(newQty));
  }
  updateProductQuantityUI(productId, newQty);

  return newQty;
}

// display updated product quantity
function updateProductQuantityUI(productId, qty) {
  const qtyElement = document.querySelector(`.js-product-quantity${productId}`);
  if(qtyElement) {
    qtyElement.textContent = qty;
  }
}

// Switch between trash can and minus-sign icon depending on item quantity
function switchDecreaseIcon(productId) {
  const decreaseProductElement = document.querySelector(`.js-decrease-product-icon${productId}`); 
  if(!decreaseProductElement) return;

  const raw = localStorage.getItem(`product-quantity${productId}`);
  const quantity = Number(raw || '1');
  if (quantity > 1) {
    decreaseProductElement.classList.add('fa-minus');
    decreaseProductElement.classList.remove('fa-trash');
  } else {
    decreaseProductElement.classList.add('fa-trash');
    decreaseProductElement.classList.remove('fa-minus'); 
  }
}

// display update cart quantity and subtotal
function updateCartSubtotalUI(data) {
  const newSubtotal = calculateCartSubtotal(data);
  const subtotalText = document.querySelector('.js-subtotal-text');
  if (subtotalText) {
    subtotalText.textContent = `Subtotal: $${newSubtotal.toFixed(2)}` || '';
  }
}

// Apply logic to 'plusSign' and 'minusSign' event listeners
function applyCartListenerChanges(data, productId, qty, direction) {
  const newQty = updateProductQuantity(productId, qty, data, direction);
  const newData = createCartProductData();
  switchDecreaseIcon(productId);
  const footer = document.querySelector('.js-sticky-footer-container');
  footer.innerHTML = generateCartStickyFooter(
    calculateCartSubtotal(newData), 
    calculateCartQuantity(newData), 
    footer
  );
  if (newData.length !== 0) {
    updateCartSubtotalUI(newData);
  }

  return newQty;
}

function setUpCartListenerChanges(productId, data, direction) {
  let productQuantity = Number(localStorage.getItem(`product-quantity${productId}`)) || 1;
  productQuantity = applyCartListenerChanges(
    data, 
    productId, 
    productQuantity, 
    direction
  );
}

function setUpQuantityListeners(product, data) {
  const plusSign = document.querySelector(`.js-increase-product-icon${product.id}`);
  const minusSign = document.querySelector(`.js-decrease-product-icon${product.id}`);
  
  plusSign.addEventListener('click', () => {
    setUpCartListenerChanges(product.id, data, '+');
  });

  minusSign.addEventListener('click', () => {
    setUpCartListenerChanges(product.id, data, '-');
  });
}

function runProductCode(data) {
  data.forEach((product) => {
    setUpQuantityListeners(product, data)
  });
}