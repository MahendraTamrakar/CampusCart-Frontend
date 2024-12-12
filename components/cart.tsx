
import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

// Dynamically import the Spline component with SSR disabled


interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

import { GetServerSideProps } from 'next'

interface CartPageProps {
  initialCartItems: CartItem[]
}

export default function CartPage({ initialCartItems }: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    console.log('Proceeding to checkout')
    // Add checkout logic here
  }

  if (isLoading) {
    return <div className="text-center p-8">Loading cart...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="h-64 w-full mb-8">
      <Spline
        scene="https://prod.spline.design/ezUVXv3fgvMTTPpc/scene.splinecode" 
      />
      </div>
      <div className="flex items-center justify-center mb-6">
        <ShoppingCart className="w-8 h-8 mr-2 text-[#0F4C5C]" />
        <h1 className="text-3xl font-bold text-[#0F4C5C]">My Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF9E5]">
          <CardContent className="p-6">
            <p className="text-center text-lg">Your cart is empty</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF9E5]">
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Quantity</th>
                      <th className="text-left p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded-md"
                            />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="p-2">${item.price.toFixed(2)}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9] text-black hover:bg-[#FFE5B4]"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9] text-black hover:bg-[#FFE5B4]"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF9E5]">
            <CardHeader>
              <CardTitle className="text-[#0F4C5C]">Cart totals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#0F4C5C] text-white hover:bg-[#0D3C4B]"
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

