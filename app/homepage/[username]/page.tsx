'use client'

import { ECommerceNav } from "@/components/navbar-for-all"
import { Footer } from "@/components/footer"
import { LandingPagenew } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AppPromotion from "@/components/app-promotion"


export default function Page() {
  return (
    <div>
      
    
      <LandingPagenew/>
      
      <Footer />
    </div>
  )
}