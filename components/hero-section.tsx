'use client'

import { Button } from "@/components/ui/button"
import { Calendar, Users, Phone, Clock, Trophy, Star, Shield, Activity, Handshake, CheckCircle, CheckIcon, Gift, IndianRupee, BookCheck, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { ChevronDown, Menu, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Spline from '@splinetool/react-spline'
import React, { Fragment } from 'react'
import Link from "next/link"
import AppPromotion from "./app-promotion"

export function LandingPagenew() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentDealIndex, setCurrentDealIndex] = useState(0)
  const [cart, setCart] = useState<{ name: string, quantity: number }[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  /* navbar for login page */
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Check for JWT token on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('jwtToken')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    setIsCartOpen(false)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/homepage' },
    { name: 'Sell', href: '/SellPage' },
    { name: 'Buy', href: '/BuyPage' },
    { name: 'Contact', href: '/contactUs' },
    { name: 'About Us', href: '/aboutUs' },
  ]

  const deals = [
    { name: "Essential Study Kit", image: "/images/kit.jpg" },
    { name: "Ergonomic Desk Chair", image: "/images/desk-chair.jpg" },
    { name: "Noise-Cancelling Headphones", image: "/images/heaedphone.jpg" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDealIndex((prevIndex) => (prevIndex + 1) % deals.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [deals.length])

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 300)
    }
  }

  const addToCart = () => {
    const currentDeal = deals[currentDealIndex];
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.name === currentDeal.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === currentDeal.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { name: currentDeal.name, quantity: 1 }];
      }
    });
    alert(`Added ${currentDeal.name} to cart!`);
  };

  const categories = [
    { title: "Stationery", image: "/images/stationary.jpg" },
    { title: "Electronics", image: "/images/electronics.jpg" },
    { title: "Binders & Folders", image: "/images/folders.jpg" },
    { title: "Gadgets", image: "/images/sc.jpg" },
    { title: "Books", image: "/images/books.jpg" },
    { title: "Other Organizational Tools", image: "/images/tools.jpg" },
  ]

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Button
          variant="default"
          size="sm"
          onClick={handleSignOut}
          className={`inline-flex items-center rounded-lg justify-center p-2 text-sm font-medium leading-none transition-colors duration-300 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-black`}
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
            className={`inline-flex items-center rounded-lg justify-center p-2 text-sm font-medium leading-none transition-colors duration-300 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-black`}
          >
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            variant="default"
            size="sm"
            className={`inline-flex items-center rounded-lg justify-center p-2 text-sm font-medium leading-none transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-white`}
          >
            Sign Up
          </Button>
        </Link>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#ffffe0] font-mono space-y-6 md:space-y-12">
      <nav className={`fixed top-0 left-0 right-0 pl-8 pr-10 z-50 antialiased transition-colors duration-300 bg-white/90 text-black backdrop-blur-sm`}>
        <div className="w-full px-4 mx-auto 2xl:px-0 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="shrink-0">
                <a href="/homepage" className="block">
                  <Image
                    className="w-60 h-16 dark:hidden"
                    src="/images/Logo-1.png"
                    alt="Logo"
                    width={240}
                    height={64}
                  />
                  <Image
                    className="hidden w-60 h-16 dark:block"
                    src="/images/Logo-1.png"
                    alt="Logo"
                    width={240}
                    height={64}
                  />
                </a>
              </div>
              <ul className="lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={`text-m font-medium font-weight-10 transition-colors hover:text-red-800`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center lg:space-x-3">
              <DropdownMenu open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                  >
                    <ShoppingCart className="w-5 h-5 lg:me-1" />
                    <span className="hidden sm:inline-block text-black">My Cart</span>
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
                      className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-primary-700' : 'text-white hover:text-primary-200'}`}
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
      <div className="space-y-8 md:space-y-16">
        
        <section className="relative min-h-[600px] flex items-center justify-center px-1 py-6 md:py-12 mt-24">
          <Spline
            scene="https://prod.spline.design/dHV7W3YBuXCUESFn/scene.splinecode"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">

            <p className="text-white font-medium tracking-wider mb-2 md:mb-3 text-sm md:text-base">
              From Study Supplies to Dorm Comforts
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6 leading-tight">
              Essential Gear for College Life
            </h1>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="#">
              <Button
                className="bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-black px-6 py-2 rounded-none text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Shop Now
              </Button>
              </Link>
              <Link href="/contactUs">
              <Button
                variant="outline"
                className="bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-white px-6 py-2 rounded-none text-lg border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Contact Us
              </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-4 md:py-6 px-1">
          <div className="container mx-auto max-w-[1200px] px-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-black mb-3 sm:mb-0">Category</h2>
              <div className="flex items-center gap-2 md:gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-none border-black"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-none border-black"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button variant="default" className="bg-black hover:bg-black/90 text-white rounded-none text-sm md:text-base  transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white">
                  View All
                </Button>
              </div>
            </div>

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-3 md:gap-4 pb-3 no-scrollbar touch-pan-x"
              onScroll={checkScroll}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category, index) => (
                <div key={index} className="flex-shrink-0 w-[130px] md:w-[180px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-full aspect-square overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-center font-medium text-black text-sm md:text-base">{category.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 md:py-8 px-1">
          <div className="container mx-auto max-w-[1200px] px-1">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center">
              <div className="relative border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  src={deals[currentDealIndex].image}
                  alt={deals[currentDealIndex].name}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                  <span className="text-orange-500">Deal</span> of the Month
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-black">{deals[currentDealIndex].name}</h3>
                <p className="text-black text-sm md:text-base">
                  A perfect addition to your college essentials. Do not miss out on this amazing deal!
                </p>
                <Button 
                  onClick={addToCart}
                  className="bg-black hover:bg-black/90 text-white px-5 md:px-6 py-3 md:py-4 rounded-none text-sm md:text-lg w-full md:w-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 md:py-8 px-1">
          <div className="container mx-auto max-w-[1200px] px-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="flex items-center gap-3 border-2 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#FF6B6B]">
                  <IndianRupee className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-black">Secure Payments</h3>
                  <p className="text-black text-xs md:text-sm">Transact safely through our platform.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 border-2 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#4ECDC4]">
                  <Phone className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-black">24/7 Support</h3>
                  <p className="text-black text-xs md:text-sm">Get assistance anytime.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 border-2 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#FFD93D]">
                  <BookCheck className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-black">Trusted Sellers</h3>
                  <p className="text-black text-xs md:text-sm">Connect with reliable sellers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 md:py-8 px-1">
          <div className="container mx-auto max-w-[1200px] px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              <div className="flex flex-col items-center p-3 md:p-4 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#FF6B6B] mb-2 md:mb-3">
                  <Handshake className="w-5 h-5 md:w-7 md:h-7 text-white"/>
                </div>
                <h3 className="mb-1 text-sm md:text-base font-semibold text-black">Easy transactions</h3>
                <p className="text-black text-xs md:text-sm">
                  Enjoy a smooth and simple buying and selling experience.
                </p>
              </div>

              <div className="flex flex-col items-center p-3 md:p-4 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#4ECDC4] mb-2 md:mb-3">
                  <Shield className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="mb-1 text-sm md:text-base font-semibold text-black">100% secure payment</h3>
                <p className="text-black text-xs md:text-sm">
                  Your transactions are fully encrypted and protected.
                </p>
              </div>

              <div className="flex flex-col items-center p-3 md:p-4 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#FFD93D] mb-2 md:mb-3">
                  <CheckCircle className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="mb-1 text-sm md:text-base font-semibold text-black">Quality guarantee</h3>
                <p className="text-black text-xs md:text-sm">
                  Verified and trusted sellers for your peace of mind.
                </p>
              </div>
              <div className="flex flex-col items-center p-3 md:p-4 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#6E44FF] mb-2 md:mb-3">
                  <CheckIcon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="mb-1 text-sm md:text-base font-semibold text-black">Guaranteed savings</h3>
                <p className="text-black text-xs md:text-sm">
                  Find amazing deals and discounts every day.
                </p>
              </div>
              <div className="flex flex-col items-center p-3 md:p-4 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
                <div className="w-10 h-10 md:w-14 md:h-14 border-2 border-black flex items-center justify-center bg-[#FF9A8B] mb-2 md:mb-3">
                  <Gift className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="mb-1 text-sm md:text-base font-semibold text-black">Daily offers</h3>
                <p className="text-black text-xs md:text-sm">
                  New items listed daily, so you never miss out on great deals!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AppPromotion />
    </div>
  )
}


