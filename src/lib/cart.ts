import { Product } from "@/data/products";

// CartItem extends Product to include quantity
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Adds a product to the cart
 * @param cart Current array of cart items
 * @param product Product to add to the cart
 * @returns Updated array of cart items
 */
export const addToCart = (cart: CartItem[], product: Product): CartItem[] => {
  // Check if the product already exists in the cart
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    // If product exists, increase its quantity by 1
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  
  // If product doesn't exist in cart, add it with quantity 1
  return [...cart, { ...product, quantity: 1 }];
};

/**
 * Removes a product from the cart
 * @param cart Current array of cart items
 * @param productId ID of product to remove
 * @returns Updated array of cart items with the specified product removed
 */
export const removeFromCart = (cart: CartItem[], productId: string): CartItem[] => {
  // Filter out the item with the matching ID
  return cart.filter(item => item.id !== productId);
};

/**
 * Updates the quantity of a product in the cart
 * @param cart Current array of cart items
 * @param productId ID of product to update
 * @param quantity New quantity (if less than 1, removes the item)
 * @returns Updated array of cart items
 */
export const updateQuantity = (cart: CartItem[], productId: string, quantity: number): CartItem[] => {
  // If quantity is less than 1, remove the item from cart
  if (quantity < 1) {
    return removeFromCart(cart, productId);
  }
  
  // Otherwise, update the quantity of the specified item
  return cart.map(item =>
    item.id === productId
      ? { ...item, quantity }
      : item
  );
};

/**
 * Calculates the total price of all items in the cart
 * @param cart Array of cart items
 * @returns Total price of all items (price × quantity)
 */
export const calculateTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
