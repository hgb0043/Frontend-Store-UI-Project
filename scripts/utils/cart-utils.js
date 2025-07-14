import { generateIndividualProduct } from '/scripts/utils/product-utils.js';

// Combine generated product HTML content
export function generateCartProductHTML(data, page) {
  return data.reduce((total, product) => {
    const current = generateIndividualProduct(product, page);
    return total + current;
  }, '');
}

// Calculate cart quantity variable
export function calculateCartQuantity(data) {
  const cartTotal = data.reduce((total, product) => {
    const qty = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
    return total + qty;
  }, 0);    
  localStorage.setItem('cart-quantity', cartTotal);
  return cartTotal;
}

// Calculate subtotal variable
export function calculateCartSubtotal(data) {
  return data.reduce((total, product) => {
    const productCount = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
    const price = Math.round(product.price * 100 * productCount) / 100;
    return total + price; 
  }, 0);
}


export function createCartProductData() {
  let data;
  // DELETE LATER
  try {
    data = JSON.parse(localStorage.getItem('cart-product-data')) || [];
  } catch(e) {
    data = [];
  }
  console.log(data);
  return data;
}

// Display message if cart is empty
export function displayEmptyCartMessage() {
  const emptyCartMessage = document.querySelector('.js-empty-cart-message-container');
  if (!emptyCartMessage) return;
  emptyCartMessage.innerHTML =  '<h1 class="title js-title">Shopping cart is empty.</h1> <a class="browse-products-link" href="index.html">Browse products</a>'
}

// Update cartProductData and UI when an item is removed
function removeCartProduct(data, productId) {
  const itemContainer = document.querySelector(`.item-container[data-product-id="${productId}"]`);
  if (itemContainer) itemContainer.remove();

  const newData = data.filter(p => p.id !== productId);
  localStorage.setItem('cart-product-data', JSON.stringify(newData));
  if (newData.length === 0) displayEmptyCartMessage();
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
}

// display updated product quantity
export function updateProductQuantityUI(productId, qty) {
  const qtyElement = document.querySelector(`.js-product-quantity${productId}`);
  if (qtyElement) {
    qtyElement.textContent = qty;
  }
}


// Calculate subtotal variable
export function calculateSubtotal(data) {
  const totalPrice = data.reduce((total, product) => {
    const productCount = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
    const productPrice = (product.price * productCount)
    return total + Number(productPrice);
  }, 0);

  const roundedTotal = Number(totalPrice.toFixed(2));
  localStorage.setItem('subtotal', roundedTotal);
  return roundedTotal;
}

// display update cart quantity and subtotal
function updateCartSubtotalUI(data) {
  const newSubtotal = calculateCartSubtotal(data);
  const subtotalText = document.querySelector('.js-subtotal-text');
  if (subtotalText) {
    subtotalText.textContent = `Subtotal: $${newSubtotal.toFixed(2)}` || '';
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

// Apply logic to 'plusSign' and 'minusSign' event listeners
function applyCartListenerChanges(data, productId, qty, direction, footer) {
  updateProductQuantity(productId, qty, data, direction);
  const newData = createCartProductData();
  switchDecreaseIcon(productId);
  footer.innerHTML = generateCartStickyFooter(
    calculateCartSubtotal(newData), 
    calculateCartQuantity(newData), 
    footer
  );
  if (newData.length !== 0) {
    updateCartSubtotalUI(newData);
  }
}

export function initializeCartInteractivity(data, footer) {
  data.forEach((product) => {
    const plusSign = document.querySelector(`.js-increase-product-icon${product.id}`);
    const minusSign = document.querySelector(`.js-decrease-product-icon${product.id}`);
    
    plusSign.addEventListener('click', () => {
      const productQuantity = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
      applyCartListenerChanges(
        data, 
        product.id, 
        productQuantity,
        '+',
        footer
      );
    });

    minusSign.addEventListener('click', () => {
      const productQuantity = Number(localStorage.getItem(`product-quantity${product.id}`)) || 1;
      applyCartListenerChanges(
        data,
        product.id,
        productQuantity,
        '-',
        footer
      );
    });
  });
}

// Switch between trash can and minus-sign icon depending on productQuantity
export function switchDecreaseIcon(productId, el) {
  if (!el) return;

  const raw = localStorage.getItem(`product-quantity${productId}`);
  const quantity = Number(raw || '1');
  if (quantity > 1) {
    el.classList.add('fa-minus');
    el.classList.remove('fa-trash');
  } else {
    el.classList.add('fa-trash');
    el.classList.remove('fa-minus'); 
  }
}