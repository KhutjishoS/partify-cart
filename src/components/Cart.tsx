
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem as CartItemType } from "@/lib/cart";
import CartItem from "./CartItem";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  total: number;
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
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="divide-y">
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
          <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
            <p>Your cart is empty</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
