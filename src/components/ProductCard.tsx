
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
          <p className="mt-4 font-medium">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full group/button"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2 transition-transform duration-200 group-hover/button:scale-110" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
