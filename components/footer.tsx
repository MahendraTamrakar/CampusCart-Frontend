'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Youtube, Instagram, ShoppingCart, Leaf, Gift, MapPin, Phone, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"

export function Footer() {
  return (
    <footer className="w-full py-12 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                CAMPUS CART
              </span>
            </div>
            <p className="text-sm text-gray-500">Your one-stop shop for campus essentials</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-blue-800 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg text-green-500 font-semibold flex items-center space-x-2">
{/*               <Leaf className="h-5 w-5 text-green-500" />
 */}              <BadgeCheck className="h-5 w-5 text-green-500" />
              <span>Company</span>
            </h3>
            <ul className="space-y-2">
            {/* <li>
                <Link href="/profile" className="text-gray-500 hover:text-green-500 transition-colors">
                 Your Account
                </Link>
              </li> */}
              <li>
                <Link href="/aboutUs" className="text-gray-500 hover:text-green-600 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/PrivacyPolicy" className="text-gray-500 hover:text-purple-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/TermsOfUse" className="text-gray-500 hover:text-purple-500 transition-colors">
                  Terms of Use
                </Link>
              </li>
              

            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg text-blue-500 font-semibold flex items-center space-x-2">
              <Gift className="h-5 w-5 text-blue-500" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2">
              {/* <li>
                <Link href="/profile" className="text-gray-500 hover:text-blue-500 transition-colors">
                 Your Account
                </Link>
              </li> */}
              <li>
                <Link href="/BuyPage" className="text-gray-500 hover:text-blue-500 transition-colors">
                  Buy on CampusCart
                </Link>
              </li>
              <li>
                <Link href="/SellPage" className="text-gray-500 hover:text-blue-500 transition-colors">
                  Sell Your Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-500 flex items-center space-x-2">
              <Phone className="h-5 w-5 text-purple-500" />
              <span>Customer Service</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/FAQ" className="text-gray-500 hover:text-purple-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contactUs" className="text-gray-500 hover:text-purple-500 transition-colors">
                  Contact
                </Link>
              </li>
              
              
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex text-yellow-500 items-center space-x-2">
              <EnvelopeClosedIcon className="h-5 w-5 text-yellow-500" />
              <span>Subscribe Us</span>
            </h3>
            <p className="text-sm text-gray-500">
              Get updates about our grand offers and new arrivals!
            </p>
            <div className="flex space-x-2">
              <Input
                className="max-w-lg flex-1 bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                placeholder="Email Address"
                type="email"
              />
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Subscribe
              </Button>
            </div>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>123 Campus Street, Collegetown, ST 12345</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-teal-800">
          <p>© 2024 CampusCart, All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}