'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'
import { ECommerceNav } from './navbar-for-all'
import axios from 'axios'
import { useRouter } from 'next/navigation'
interface ProductDetails {
  productName: string
  brandName: string
  description: string
  price: string
  quantity: number
  images: File[]
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
}

export default function SellPage() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      alert("You are not Authorized , first sign up or sign in")
      router.push('/sign-in')
    }

  }, [])


 const [productDetails, setProductDetails] = useState<ProductDetails>({
    productName: '',
    brandName: '',
    description: '',
    price: '',
    quantity: 1,
    images: [],
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleQuantityChange = (change: number) => {
    setProductDetails(prev => ({ ...prev, quantity: Math.max(1, prev.quantity + change) }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProductDetails(prev => ({ ...prev, images: [...prev.images, ...Array.from(event.target.files!)] }))
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
        // Check if there's at least one image
        if (productDetails.images.length === 0) {
            toast({
                title: "Error",
                description: "Please upload at least one image.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', productDetails.images[0]); // Backend expects a single file as 'file'
        formData.append('name', productDetails.productName);
        formData.append('description', productDetails.description);
        formData.append('category', ''); // Add a default or dynamic category if applicable
        formData.append('countInStock', productDetails.quantity.toString());
        formData.append('price', productDetails.price);
        formData.append('brand', productDetails.brandName);
        formData.append('sellerName', productDetails.sellerName);
        formData.append('sellerPhone', productDetails.sellerPhone);
        formData.append('sellerEmail', productDetails.sellerEmail);

        // Make the request with FormData and proper headers
        const response = await axios.post('https://campuscartbackend.onrender.com/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include auth token if needed
            },
        });

        if (response.status === 201) {
            toast({
                title: "Success",
                description: "Product has been added successfully.",
            });

            // Reset form
            setProductDetails({
                productName: '',
                brandName: '',
                description: '',
                price: '',
                quantity: 1,
                images: [],
                sellerName: '',
                sellerPhone: '',
                sellerEmail: '',
            });
        } else {
            throw new Error(response.data.message || 'Failed to add product');
        }
    } catch (error: any) {
        console.error('Error submitting product:', error.response?.data || error.message);
        toast({
            title: "Error",
            description: error.response?.data?.message || "Failed to add product. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
};

  const removeImage = (index: number) => {
    setProductDetails(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-[#ffffe0] py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-40 h-40 relative">
              <Image
                src="/images/Logo.png"
                alt="CampusCart Logo"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-black text-center">Sell Your Product</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            <InputField
              label="Product Name"
              id="productName"
              name="productName"
              value={productDetails.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />

            <InputField
              label="Brand Name"
              id="brandName"
              name="brandName"
              value={productDetails.brandName}
              onChange={handleInputChange}
              placeholder="Enter the name of the brand"
              required
            />

            <div className="space-y-2">
              <Label htmlFor="description">Description:</Label>
              <Textarea
                id="description"
                name="description"
                value={productDetails.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="min-h-[100px] border-2 border-black bg-white/90 backdrop-blur-sm rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>

            <InputField
              label="Price (in ₹)"
              id="price"
              name="price"
              type="number"
              value={productDetails.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />

            <div className="space-y-2">
              <Label htmlFor="image">Upload Product Images:</Label>
              <div className="flex flex-wrap gap-2">
                {productDetails.images.map((file, index) => (
                  <div key={index} className="relative w-20 h-20 border-2 border-black">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label htmlFor="image" className="w-20 h-20 flex items-center justify-center border-2 border-black bg-white/90 backdrop-blur-sm cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Upload className="w-8 h-8 text-[#0F4C5C]" />
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    title="Upload Product Images"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Stock Quantity:</Label>
              <div className="flex items-center gap-4">
                <QuantityButton onClick={() => handleQuantityChange(-1)} icon={<Minus className="h-4 w-4" />} />
                <Input
                  type="number"
                  value={productDetails.quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) - productDetails.quantity)}
                  className="w-20 text-center border-2 border-black bg-white/90 backdrop-blur-sm rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  min="1"
                />
                <QuantityButton onClick={() => handleQuantityChange(1)} icon={<Plus className="h-4 w-4" />} />
              </div>
            </div>

            <InputField label="Seller Name" id="sellerName" name="sellerName" value={productDetails.sellerName} onChange={handleInputChange} placeholder="Enter seller name" required/>
            <InputField label="Seller Phone" id="sellerPhone" name="sellerPhone" value={productDetails.sellerPhone} onChange={handleInputChange} placeholder="Enter seller phone number" required/>
            <InputField label="Seller Email" id="sellerEmail" name="sellerEmail" value={productDetails.sellerEmail} onChange={handleInputChange} placeholder="Enter seller email" type="email" required/>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white bg-gradient-to-r from-blue-500 to-purple-500 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function InputField({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}:</Label>
      <Input
        {...props}
        className="border-2 border-black bg-white/90 backdrop-blur-sm rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    </div>
  )
}

function QuantityButton({ onClick, icon }: { onClick: () => void, icon: React.ReactNode }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-blue-600 text-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all"
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

