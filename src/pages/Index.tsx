
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/data/products";
import { CartItem, addToCart, removeFromCart, updateQuantity, calculateTotal } from "@/lib/cart";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import ProductGrid from "@/components/ProductGrid";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: CartItem) => {
    setCartItems(currentItems => addToCart(currentItems, product));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(currentItems => updateQuantity(currentItems, id, quantity));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(currentItems => removeFromCart(currentItems, id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItems={cartItems} />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        </div>
      </main>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        total={calculateTotal(cartItems)}
      />
    </div>
  );
};

export default Index;
