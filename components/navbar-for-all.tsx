/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, Fragment } from 'react'
import { Input } from "@/components/ui/input"
import { ChevronDown, Menu, ShoppingCart, User, Sun, Moon, Search} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignInComponent } from './sign-in'
import { useRouter } from 'next/navigation'
import Link from 'next/link' 




export function ECommerceNav() {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [cart, setCart] = useState<{ name: string, quantity: number }[]>([])
  const router = useRouter()
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
    { name: 'Home', href: `/` },
   /*  { name: 'Best Sellers', href: '#' },
    { name: 'Gift Ideas', href: '#' },
    { name: "Today's Deals", href: '#' }, */
    { name: 'Sell', href: '/SellPage' },
    { name: 'Buy', href: '/BuyPage' },
    { name: 'Contact', href: '/contactUs' },
    { name: 'About Us', href: '/aboutUs' },
  ]

  const userMenuItems = [
    { name: 'My Account', href: '/profile' },
    
    /* { name: 'Settings', href: '#' },
    { name: 'Favourites', href: '#' },
   /*  { name: 'Delivery Addresses', href: '#' }
    { name: 'Billing Data', href: '#' }, */
  ]

   // Check for JWT token on component mount
    useEffect(() => {
      const token = localStorage.getItem('jwtToken')
      if (token) {
        setIsAuthenticated(true)
      }
    }, [])
  
  const handleSignOut = () => {
    localStorage.removeItem('jwtToken')
    setIsAuthenticated(false)
    /* router.push('/') */
  }

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

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Button
          variant="default"
          size="sm"
          onClick={handleSignOut}
          className={`inline-flex items-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg justify-center p-2 text-sm font-medium leading-none transition-colors duration-300 bg-teal-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-white`}
        >
          Sign Out
        </Button>
      )
    }
    return (
      <>
        <Link href="/sign-in">
          <Button
            variant="default"
            size="sm"
            className={`inline-flex items-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg justify-center p-2 text-sm font-medium leading-none transition-colors duration-300 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-black`}
          >
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            variant="default"
            size="sm"
            className={`inline-flex items-center bg-teal-700 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg justify-center p-2 text-sm font-medium leading-none transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-white`}
          >
            Sign Up
          </Button>
        </Link>
      </>
    )
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-lg z-50 shadow-md">
      <div className="max-w-screen-xl px-2 mx-auto 2xl:px-0 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
        <div className="shrink-0">
          <a href="/" className="block">
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
            className="text-sm font-medium hover:text-primary-700 transition-colors hover:text-red-700 text-white"
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
        {/* <DropdownMenu open={isCartOpen} onOpenChange={setIsCartOpen}>
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
        </DropdownMenu> */}
        {/* <DropdownMenu>
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
          <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem onSelect={toggleTheme}>
            <div className="flex items-center justify-between w-full">
            <span>Theme</span>
            {theme === 'light' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            </div>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        {renderAuthButtons()}
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

