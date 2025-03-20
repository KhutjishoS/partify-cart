
// Product data - wedding items available in the shop
const products = [
  {
    id: "1",
    name: "Wedding Dress",
    description: "Elegant white wedding gown with lace details",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1594469270444-e5683a789ace?q=80&w=1000"
  },
  {
    id: "2",
    name: "Wedding Suit",
    description: "Classic black tuxedo for the groom",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000"
  },
  {
    id: "3",
    name: "Flower Bouquet",
    description: "Fresh roses and lilies arrangement",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000"
  },
  {
    id: "4",
    name: "Wedding Cake",
    description: "Three-tier cake with custom decoration",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000"
  },
  {
    id: "5",
    name: "Wedding Rings",
    description: "Set of two gold bands with engraving option",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1515360959941-3b5f5c87c9ec?q=80&w=1000"
  },
  {
    id: "6",
    name: "Venue Decoration",
    description: "Complete setup with floral arrangements and lighting",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1000"
  }
];

// Cart state
let cartItems = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartButton = document.getElementById('cart-button');
const viewCartButton = document.getElementById('view-cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartButton = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmptyMessage = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize the page
function initPage() {
  renderProducts();
  setupEventListeners();
  updateCartDisplay();
}

// Render all products to the product grid
function renderProducts() {
  productGrid.innerHTML = '';
  
  products.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <div class="product-image-container">
      <img src="${product.image}" alt="${product.name}" class="product-image">
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
    </div>
    <div class="product-footer">
      <button class="add-to-cart-button" data-product-id="${product.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="plus-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Add to Cart
      </button>
    </div>
  `;
  
  return card;
}

// Set up all event listeners
function setupEventListeners() {
  // Open cart when cart button is clicked
  cartButton.addEventListener('click', openCart);
  viewCartButton.addEventListener('click', openCart);
  
  // Close cart when close button or overlay is clicked
  closeCartButton.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  
  // Add to cart buttons in product grid
  productGrid.addEventListener('click', event => {
    const addButton = event.target.closest('.add-to-cart-button');
    if (addButton) {
      const productId = addButton.dataset.productId;
      addToCart(productId);
    }
  });
  
  // Cart item quantity buttons and remove buttons
  cartItemsContainer.addEventListener('click', event => {
    // Check if clicked element is a quantity button
    const decreaseButton = event.target.closest('.decrease-quantity');
    const increaseButton = event.target.closest('.increase-quantity');
    const removeButton = event.target.closest('.remove-button');
    
    if (decreaseButton) {
      const productId = decreaseButton.dataset.productId;
      updateQuantity(productId, -1);
    } else if (increaseButton) {
      const productId = increaseButton.dataset.productId;
      updateQuantity(productId, 1);
    } else if (removeButton) {
      const productId = removeButton.dataset.productId;
      removeFromCart(productId);
    }
  });
}

// Open the cart sidebar
function openCart() {
  cartSidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close the cart sidebar
function closeCart() {
  cartSidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Add a product to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (product) {
    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      // Increase quantity if product already in cart
      existingItem.quantity += 1;
    } else {
      // Add new item to cart
      cartItems.push({
        ...product,
        quantity: 1
      });
    }
    
    updateCartDisplay();
    showToast(`${product.name} has been added to your cart.`);
  }
}

// Update the quantity of an item in the cart
function updateQuantity(productId, change) {
  const itemIndex = cartItems.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    const newQuantity = cartItems[itemIndex].quantity + change;
    
    if (newQuantity < 1) {
      // Remove item if quantity would be less than 1
      removeFromCart(productId);
    } else {
      // Update quantity
      cartItems[itemIndex].quantity = newQuantity;
      updateCartDisplay();
    }
  }
}

// Remove an item from the cart
function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  updateCartDisplay();
}

// Calculate the total price of all items in the cart
function calculateTotal() {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update the cart display (items, count, total)
function updateCartDisplay() {
  // Update cart items
  renderCartItems();
  
  // Update cart count badge
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  if (itemCount > 0) {
    cartCountBadge.textContent = itemCount;
    cartCountBadge.classList.remove('hidden');
  } else {
    cartCountBadge.classList.add('hidden');
  }
  
  // Show/hide empty cart message and footer
  if (cartItems.length === 0) {
    cartEmptyMessage.style.display = 'flex';
    cartFooter.classList.add('hidden');
  } else {
    cartEmptyMessage.style.display = 'none';
    cartFooter.classList.remove('hidden');
    
    // Update total
    const total = calculateTotal();
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
  }
}

// Render all cart items
function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  
  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <div class="cart-item-quantity">
          <button class="quantity-button decrease-quantity" data-product-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-button increase-quantity" data-product-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
      <button class="remove-button" data-product-id="${item.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
}

// Show a toast message
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
