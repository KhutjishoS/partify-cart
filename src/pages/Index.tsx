
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/data/products";
import { Product } from "@/data/products";
import { CartItem, addToCart, removeFromCart, updateQuantity, calculateTotal } from "@/lib/cart";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
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
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Wedding Shop</h1>
            <p className="text-muted-foreground">Add wedding items to your cart</p>
            <Button 
              className="mt-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              View Cart
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 flex flex-col">
                <div className="aspect-square overflow-hidden rounded-md mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                  <Button 
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
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
