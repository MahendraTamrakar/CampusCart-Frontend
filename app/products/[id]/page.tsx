'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Reviews from '@/components/Reviews';
import { ECommerceNav } from '@/components/navbar-for-all';
import { Footer } from '@/components/footer';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  countInStock: number;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params || {};

  const API_BASE_URL = 'https://campuscartbackend.onrender.com';

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        setLoading(true);
        const [productResponse, reviewsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/products/${id}`),
          axios.get(`${API_BASE_URL}/api/products/${id}/reviews`)
        ]);

        if (productResponse.data && productResponse.data.success && productResponse.data.product) {
          setProduct(productResponse.data.product);
        } else {
          throw new Error('Failed to fetch product details.');
        }

        if (reviewsResponse.data && reviewsResponse.data.success) {
          setReviews(reviewsResponse.data.reviews);
        } else {
          throw new Error('Failed to fetch reviews.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductAndReviews();
    }
  }, [API_BASE_URL, id]);

  const getImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${API_BASE_URL}/${cleanImagePath}`;
  };

  const addToCart = () => {
    // Implement add to cart functionality
    toast.success(`Added ${product?.name} to cart`);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#ffffe0] flex items-center justify-center">
      <div className="text-2xl font-mono animate-pulse">Loading product details...</div>
    </div>;
  }

  if (error || !product) {
    return <div className="min-h-screen bg-[#ffffe0] flex items-center justify-center">
      <div className="text-2xl font-mono text-red-600">
        {error || 'Product not found'}
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-20 bg-[#ffffe0]">
      <ECommerceNav/>
      <div className="mt-8 mb-8 max-w-5xl bg-[#FFF0D9] mx-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="grid  md:grid-cols-2 gap-8">
          <div>
            <Image
              src={getImageUrl(product.image)}
              alt={product.name}
              width={500}
              height={500}
              className="w-full aspect-square shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] object-cover border-2 border-black"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl text-black font-bold font-mono">{product.name}</h1>
            <p className="text-gray-600 font-mono">{product.brand}</p>
            <p className="text-2xl text-black font-bold font-mono">₹{product.price.toFixed(2)}</p>
            <p className="font-mono text-black">{product.description}</p> 
            <p className="font-mono text-black">Number of items left: {product.countInStock}</p>
            <hr/>
            <h3 className='text-2xl font-bold font-mono text-black'>Contact the Seller</h3>
            <p className="font-mono text-black">Name: {product.sellerName}</p>
            <p className="font-mono text-black">Email: {product.sellerEmail}</p>
            <p className="font-mono text-black">Phone Number: {product.sellerPhone}</p>
            
            {/* <Button
              onClick={addToCart}
              className="w-full bg-black bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-none font-mono border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button> */}
          </div>
        </div>

        <Reviews  initialReviews={reviews} />
      </div>
      <Footer/>
    </div>
  );
}

