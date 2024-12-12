'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  const [addresses, setAddresses] = useState([''])

  const addAddress = () => {
    setAddresses([...addresses, ''])
  }

  const updateAddress = (index: number, value: string) => {
    const newAddresses = [...addresses]
    newAddresses[index] = value
    setAddresses(newAddresses)
  }

  return (
    <div className="bg-[#FFF8DC] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
        <div className="bg-white rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden">
          <div className="p-8 space-y-8">
            {/* User Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold border-b-2 border-black pb-2">User Information</h2>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full border-2 border-black overflow-hidden">
                  <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <Label htmlFor="profile-picture" className="cursor-pointer bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    Upload Picture
                  </Label>
                  <Input id="profile-picture" type="file" accept="image/*" className="hidden" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <div className="relative">
                    <Input 
                      id="full-name" 
                      placeholder="John Doe" 
                      className="pl-10 rounded-none border-2 border-black focus:ring-0 focus:border-black" 
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username/Nickname</Label>
                  <div className="relative">
                    <Input 
                      id="username" 
                      placeholder="johndoe123" 
                      className="pl-10 rounded-none border-2 border-black focus:ring-0 focus:border-black" 
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="pl-10 rounded-none border-2 border-black focus:ring-0 focus:border-black" 
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+1 (555) 123-4567" 
                      className="pl-10 rounded-none border-2 border-black focus:ring-0 focus:border-black" 
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Addresses</Label>
                {addresses.map((address, index) => (
                  <div key={index} className="relative">
                    <Textarea 
                      placeholder="Enter address" 
                      value={address} 
                      onChange={(e) => updateAddress(index, e.target.value)}
                      className="pl-10 rounded-none border-2 border-black focus:ring-0 focus:border-black min-h-[100px]"
                    />
                    <MapPin className="absolute left-3 top-3 text-black" size={18} />
                  </div>
                ))}
                <Button 
                  onClick={addAddress} 
                  variant="outline" 
                  className="mt-2 border-2 border-black rounded-none hover:bg-black hover:text-white transition-colors"
                >
                  Add Another Address
                </Button>
              </div>
            </section>

            {/* Security Settings */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Security Settings</h2>
              <Button 
                variant="destructive" 
                className="rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white"
              >
                Delete Account
              </Button>
            </section>

            {/* Account Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Account Information</h2>
              <div className="space-y-2">
                <Label>Join Date</Label>
                <div className="relative">
                  <Input 
                    value="January 1, 2023" 
                    disabled 
                    className="pl-10 rounded-none border-2 border-black bg-gray-100" 
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
                </div>
              </div>
            </section>

            <Button className="w-full bg-black text-white rounded-none hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

