
import { CartItem as CartItemType } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

// Props for the CartItem component
interface CartItemProps {
  item: CartItemType;                             // The cart item to display
  onUpdateQuantity: (id: string, quantity: number) => void;  // Function to update quantity
  onRemove: (id: string) => void;                 // Function to remove the item
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="flex items-center gap-4 py-4 animate-fade-in">
      {/* Item image */}
      <div className="relative aspect-square w-24 overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        {/* Item name and price */}
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          ${item.price.toFixed(2)}
        </p>
        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          {/* Decrease quantity button */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          {/* Current quantity */}
          <span className="w-8 text-center">{item.quantity}</span>
          {/* Increase quantity button */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Remove item button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onRemove(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
