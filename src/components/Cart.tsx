
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem as CartItemType } from "@/lib/cart";
import CartItem from "./CartItem";

// Props for the Cart component
interface CartProps {
  isOpen: boolean;                              // Whether the cart sidebar is open
  onClose: () => void;                          // Function to call when cart is closed
  items: CartItemType[];                        // Array of items in the cart
  onUpdateQuantity: (id: string, quantity: number) => void;  // Function to update item quantity
  onRemove: (id: string) => void;               // Function to remove an item
  total: number;                                // Total price of all items
}

const Cart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  total,
}: CartProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {/* If cart has items, display them with checkout button */}
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="divide-y">
                {/* Map through each cart item and render it */}
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </ScrollArea>
            {/* Display total and checkout button */}
            <div className="space-y-4 mt-6">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          </>
        ) : (
          // If cart is empty, show empty state message
          <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
            <p>Your cart is empty</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
