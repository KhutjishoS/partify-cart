
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CartItem, removeFromCart, updateQuantity, calculateTotal } from "@/lib/cart";
import Header from "@/components/Header";
import Cart from "@/components/Cart";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

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
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart Demo</h1>
            <p className="text-muted-foreground">Click the cart icon in the header to manage your cart</p>
            <button 
              className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsCartOpen(true)}
            >
              Open Cart
            </button>
          </div>
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
