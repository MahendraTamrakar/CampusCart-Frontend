'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export function BuyPage() {
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [cart, setCart] = useState<CartItem[]>([]);

  // Environment variables
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/products`);

        if (response.data && response.data.success && Array.isArray(response.data.products)) {
          const productsData: Product[] = response.data.products;
          setProducts(productsData);

          // Initialize quantities
          const initialQuantities = productsData.reduce(
            (acc: { [key: string]: number }, product: Product) => ({
              ...acc,
              [product.id]: 1,
            }),
            {}
          );
          setQuantities(initialQuantities);
        } else {
          throw new Error('Unexpected response format from the server.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_BASE_URL]);

  // Helper functions
  const getImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${API_BASE_URL}/${cleanImagePath}`;
  };

  const updateQuantity = (productId: string, increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Math.min(10, (prev[productId] || 1) + (increment ? 1 : -1))),
    }));
  };

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity }];
    });

    toast.success(`Added ${product.name} to cart`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffffe0] flex items-center justify-center">
        <div className="text-2xl font-mono animate-pulse">Loading products...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#ffffe0] flex items-center justify-center">
        <div className="text-2xl font-mono text-red-600">
          {error}
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-black text-white hover:bg-blue-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffe0]">
      {/* Hero Section with Spline */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 h-full w-full">
          <Spline scene="https://prod.spline.design/vWPc4Cww90yAoWL7/scene.splinecode" />
        </div>
      </section>

      {/* Products Section */}
      <div className="p-8">
        <div className="text-center my-8">
          <h3 className="text-4xl md:text-3xl font-bold font-mono text-black">
            Find the Best Products Tailored for You
          </h3>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card
                className="relative overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative">
                    <Image
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-full aspect-square object-cover"
                      priority
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/placeholder-image.jpg'; // Make sure to have a placeholder image
                      }}
                    />
                    {/* Quick Add to Cart Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute rounded-full top-2 right-2 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 text-black hover:text-white" />
                      <span className="sr-only">Add to Cart</span>
                    </Button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 space-y-2">
                    <p className="text-sm font-mono text-gray-600">{product.category}</p>
                    <h3 className="font-mono text-black font-semibold">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="font-mono text-black font-bold text-lg">
                        ${product.price.toFixed(2)}
                      </p>
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            updateQuantity(product.id, false);
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-mono w-8 text-center">
                          {quantities[product.id]}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            updateQuantity(product.id, true);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>

                {/* Buy Button */}
                <CardFooter className="p-4 pt-0">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="w-full bg-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-white rounded-none font-mono border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyPage;

