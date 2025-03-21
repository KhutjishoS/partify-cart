
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { CartItem } from "@/lib/cart";

interface HeaderProps {
  onCartClick: () => void;  // Function to call when cart icon is clicked
  cartItems: CartItem[];    // Array of items in the cart
}

const Header = ({ onCartClick, cartItems }: HeaderProps) => {
  // Calculate total number of items in cart by summing quantities
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Site name/logo */}
        <div className="text-xl font-semibold">Cart Demo</div>
        {/* Cart button with item count badge */}
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingBag className="h-5 w-5" />
          {/* Display badge with item count if there are items in the cart */}
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-up">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
