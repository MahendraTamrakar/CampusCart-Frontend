'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, MapPin, Phone } from 'lucide-react'
import axios from 'axios' // Import axios
import { useState } from 'react' // Import useState for form handling
import FAQPage from "./faq"

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Handle input change
  const handleChange = (e : any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e : any) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await axios.post('https://campuscartbackend.onrender.com/api/contact', formData)
      console.log(response)

      // If the message is sent successfully, show success message
      setSuccessMessage(response.data.message)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    }catch (err : any) {
      // If an error occurs, show error message
      setErrorMessage(err.response?.data?.error || 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#FFF9E5] mt-14 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Have you any question?</h2>
              <p className="text-gray-600">
                We’re here to help! Whether you’re looking for product information, assistance with your order, or just want to share feedback, our team is happy to assist. Feel free to reach out using the form below or check out our contact details.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2"
                />
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2"
                />
                <Input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2"
                />
              </div>
              <Textarea 
                name="message"
                placeholder="Message" 
                value={formData.message}
                onChange={handleChange}
                className="bg-white border-2 text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none px-4 py-2 min-h-[150px]"
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-white px-8 py-2 rounded-none text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          </div>

          <div className="space-y-8">
          <div className="border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-[#FF6B6B]">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Shop Address</h3>
                  <p className="text-gray-600">CampusCart HQ, Indore,</p>
                  <p className="text-gray-600">Madhya Pradesh, India</p>
                 
                </div>
              </div>
            </div>

            <div className="border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-[#4ECDC4]">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Shop Hours</h3>
                  <p className="text-gray-600">MON - FRIDAY: 8 to 9 PM</p>
                  <p className="text-gray-600">SAT - SUN: Close</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-[#FFD93D]">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Contact</h3>
                  <p className="text-gray-600">Phone: +91 123-456-7890</p>
                  <p className="text-gray-600">Email: support@CampusCart.com</p>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
      <FAQPage />
    </div>
  )
}
