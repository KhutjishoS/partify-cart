
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
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
