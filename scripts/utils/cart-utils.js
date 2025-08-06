import { manageBadgeUI } from '/scripts/utils/header-utils.js';

import { generateIndividualProduct } from '/scripts/utils/product-utils.js';

export function initializeCartInteractivity(data, footer) {
  data.forEach((product) => {
    const plusSign = document.querySelector(`.js-increase-product-icon${product.id}`);
    const minusSign = document.querySelector(`.js-decrease-product-icon${product.id}`);
    
    if (!plusSign || !minusSign) {
      console.warn('plusSign and/or minusSign not found');
      return;
    }

    plusSign.addEventListener('click', () => {
      const newData = createCartProductData();
      applyCartListenerChanges(
        newData, 
        product.id, 
        '+',
        footer,
        minusSign
      );
    });

    minusSign.addEventListener('click', () => {
      const newData = createCartProductData();
      applyCartListenerChanges(
        newData,
        product.id,
        '-',
        footer,
        minusSign
      )
    });
  });
}

// Apply logic to 'plusSign' and 'minusSign' event listeners
function applyCartListenerChanges(data, productId, direction, footer, minusSign) {
  const newQty = updateProductQuantity(data, productId, direction);
  // Also updates data (cartProductData) sufficiently
  switchDecreaseIcon(newQty, minusSign);
  updateProductQuantityUI(productId, newQty);
  if (newQty === 0) {
    data = data.filter(p => p.id !== productId);
    removeCartProduct(productId);
  }

  const cartQuantity = calculateCartQuantity(data);
  manageBadgeUI(cartQuantity);
  if (data.length === 0) displayEmptyCartMessage();
  footer.innerHTML = generateCartStickyFooter(
    calculateCartSubtotal(data), 
    cartQuantity,
    footer
  );
  if (data.length !== 0) {
    updateCartSubtotalUI(data);
  }

  localStorage.setItem('cart-product-data', JSON.stringify(data));
}

// Combine generated product HTML content
export function generateCartProductHTML(data, page) {
  return data.reduce((total, product) => {
    const current = generateIndividualProduct(product, page);
    return total + current;
  }, '');
}

export function calculateCartQuantity(data) {
  if (Array.isArray(data)) {
    const cartQuantity = data.reduce((total, product) => {
      const qty = Number(product.quantity) || 0;
      return total + qty;
    }, 0);
    return cartQuantity;
  } else {
    return 0;
  }
}

// Calculate subtotal variable
export function calculateCartSubtotal(data) {
  const result = data.reduce((total, product) => {
    const price = Math.round(product.price * 100 * product.quantity) / 100;
    return (total + price); 
  }, 0);
  return result.toFixed(2);
}

export function createCartProductData() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem('cart-product-data')) || [];
  } catch(e) {
    data = [];
    console.error('Invalid cart-product-data:', e);
  }
  return data;
}

// Display message if cart is empty
export function displayEmptyCartMessage() {
  const emptyCartMessage = document.querySelector('.js-empty-cart-message-container');
  if (!emptyCartMessage) return;
  emptyCartMessage.innerHTML =  '<h1 class="title js-title">Shopping cart is empty.</h1> <a class="browse-products-link" href="/index.html">Browse products</a>'
}

// Update cartProductData and UI when an item is removed
function removeCartProduct(productId) {
  const itemContainer = document.querySelector(`.item-container[data-product-id="${productId}"]`);
  if (itemContainer) itemContainer.remove();
}

function updateProductQuantity(data, productId, direction) {
  const prdct = data.find(p => p.id === productId);
  // Defensive measure
  if (prdct.quantity > 0) {
    if (direction === '+') prdct.quantity++;
    else if (direction === '-') prdct.quantity--;
  } else {
    prdct.quantity = 0;
  }
  return prdct.quantity;
}

// display updated product quantity
export function updateProductQuantityUI(productId, qty) {
  const qtyElement = document.querySelector(`.js-product-quantity${productId}`);
  if (qtyElement) {
    qtyElement.textContent = qty;
  }
}

// display update cart quantity and subtotal
function updateCartSubtotalUI(data) {
  const newSubtotal = calculateCartSubtotal(data);
  const subtotalText = document.querySelector('.js-subtotal-text');
  if (subtotalText) {
    subtotalText.textContent = `Subtotal: $${newSubtotal}` || '';
  }
}

// Generate sticky footer HTML (bottom of page)
export function generateCartStickyFooter(subtotal, qty, footer) {
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

// Switch between trash can and minus-sign icon depending on productQuantity
export function switchDecreaseIcon(qty, el) {
  if (!el) return;

  if (!isNaN(qty)) {
    if (qty > 1) {
      el.classList.add('fa-minus');
      el.classList.remove('fa-trash');    
    } else {
      el.classList.add('fa-trash');
      el.classList.remove('fa-minus'); 
    }
  }
} 