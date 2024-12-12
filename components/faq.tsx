'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How do I list a product for sale?",
    answer: "To list a product, go to the 'Sell' page, fill out the product details form, upload images, and click the 'Submit Product' button. Your listing will be reviewed and published shortly after submission."
  },
  {
    question: "What types of products can I sell on CampusCart?",
    answer: "You can sell a wide variety of items on CampusCart, including textbooks, electronics, furniture, and more. However, please ensure your items comply with our terms of service and local regulations."
  },
  {
    question: "How long does it take for my product to be listed after submission?",
    answer: "Typically, product listings are reviewed and published within 24-48 hours after submission. If there are any issues with your listing, we'll contact you via email."
  },
  {
    question: "Can I edit my product listing after it's been published?",
    answer: "Yes, you can edit your product listing at any time. Simply go to your account dashboard, find the listing you want to edit, and click on the 'Edit' button."
  },
  {
    question: "How do I contact a seller about a product?",
    answer: "Each product listing has a 'Contact Seller' button. Click on this to send a message directly to the seller through our secure messaging system."
  },
  {
    question: "Is there a fee for selling items on CampusCart?",
    answer: "CampusCart is free to use for both buyers and sellers. However, we may introduce optional premium features in the future to enhance your selling experience."
  },
  {
    question: "What should I do if I suspect a fraudulent listing or user?",
    answer: "If you come across any suspicious activity, please report it immediately using the 'Report' button on the listing or user profile. Our team will investigate and take appropriate action."
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#ffffe0] py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mt-24 mb-24 mx-auto border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF9E5]">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-black text-center">Frequently Asked Questions</h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FAQItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white/90 backdrop-blur-sm">
      <Button
        className="w-full p-4 flex justify-between items-center text-left bg-transparent hover:bg-[#FFE5B4] transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-black">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-black" />
        ) : (
          <ChevronDown className="h-5 w-5 text-black" />
        )}
      </Button>
      {isOpen && (
        <div className="p-4 border-t-2 border-black">
          <p className="text-black">{answer}</p>
        </div>
      )}
    </div>
  )
}

