
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
    name: "Minimalist Watch",
    description: "Elegant timepiece with premium leather strap",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    description: "Premium sound with active noise cancellation",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
  },
  {
    id: "3",
    name: "Smart Speaker",
    description: "360° sound with voice control",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab"
  },
  {
    id: "4",
    name: "Laptop Stand",
    description: "Ergonomic aluminum design",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"
  }
];
