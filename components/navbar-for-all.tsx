/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, Fragment } from 'react'
import { Input } from "@/components/ui/input"
import { ChevronDown, Menu, ShoppingCart, User, Sun, Moon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'



export function ECommerceNav() {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [cart, setCart] = useState<{ name: string, quantity: number }[]>([])

  useEffect(() => {
    setIsCartOpen(false)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { name: 'Home', href: '/homepage' },
   /*  { name: 'Best Sellers', href: '#' },
    { name: 'Gift Ideas', href: '#' },
    { name: "Today's Deals", href: '#' }, */
    { name: 'Sell', href: '/SellPage' },
    { name: 'Buy', href: '/BuyPage' },
    { name: 'Contact', href: '/contactUs' },
    { name: 'About Us', href: '/aboutUs' },
  ]

  const userMenuItems = [
    { name: 'My Account', href: '#' },
    { name: 'My Orders', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Favourites', href: '#' },
   /*  { name: 'Delivery Addresses', href: '#' } */
    { name: 'Billing Data', href: '#' },
  ]


  const addToCart = (itemName: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.name === itemName);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { name: itemName, quantity: 1 }];
      }
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-2 mx-auto 2xl:px-0 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
        <div className="shrink-0">
          <a href="/homepage" className="block">
          <img
            className="w-60 h-16 dark: hidden" 
            src="/images/Logo-1.png"
            alt="Logo"
          />
          <img
            className="hidden w-60 h-16 dark:block"
            src="/images/Logo-1.png"
            alt="Logo"
          />
          </a>
        </div>
        <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
          {navItems.map((item) => (
          <li key={item.name}>
            <a
            href={item.href}
            className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
            >
            {item.name}
            </a>
          </li>
          ))}
        </ul>
        </div>

        {/* <div className="relative">
        <Input
          type="search"
          placeholder="Search..."
          className={`bg-slate-600 text-white pl-8 pr-2 py-1 rounded-full transition-all duration-300 ${
          isSearchVisible ? 'w-64 opacity-100' : 'w-0 opacity-0'
          } md:w-64 md:opacity-100`}
        />
        <Search
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer md:pointer-events-none"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        />
        </div> */}

        <div className="flex items-center lg:space-x-2">
        <DropdownMenu open={isCartOpen} onOpenChange={setIsCartOpen}>
          <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
          >
            <ShoppingCart className="w-5 h-5 lg:me-1" />
            <span className="hidden sm:inline-block">My Cart</span>
            <ChevronDown className="hidden sm:inline-block w-4 h-4 ml-1" />
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
          {cart.length === 0 ? (
            <DropdownMenuItem>
            <div className="flex flex-col items-center w-full py-4">
              <ShoppingCart className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some awesome items!</p>
            </div>
            </DropdownMenuItem>
          ) : (
            <Fragment>
            {cart.map((item, index) => (
              <DropdownMenuItem key={index} className="flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
              </div>
              <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button className="w-full">Proceed to Checkout</Button>
            </DropdownMenuItem>
            </Fragment>
          )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
          >
            <User className="w-5 h-5 me-1" />
            Account
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          {userMenuItems.map((item) => (
            <DropdownMenuItem key={item.name}>
            <a href={item.href} className="w-full">
              {item.name}
            </a>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={toggleTheme}>
            <div className="flex items-center justify-between w-full">
            <span>Theme</span>
            {theme === 'light' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <ul className="space-y-3">
          {navItems.map((item) => (
          <li key={item.name}>
            <a
            href={item.href}
            className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
            >
            {item.name}
            </a>
          </li>
          ))}
        </ul>
        </div>
      )}
      </div>
    </nav>
  )
}

