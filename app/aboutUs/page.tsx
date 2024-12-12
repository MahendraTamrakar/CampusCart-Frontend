

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Spline from '@splinetool/react-spline';
import { Footer } from '@/components/footer';
import { ECommerceNav } from '@/components/navbar-for-all';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF9E5] font-mono">
      <ECommerceNav/>
      {/* Welcome Section */}
      <section className="relative h-screen w-full bg-[#FFF9E5] text-black overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <Spline
            scene="https://prod.spline.design/Fbx-TKY-pvZnIu-h/scene.splinecode"
          />
       </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-black font-bold text-center mb-8 sm:mb-12">What We Do</h2>
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black font-bold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-700">
              Our platform connects buyers and sellers through an intuitive and secure marketplace. Sellers can easily list products, manage inventory,
               and reach a global audience. Buyers enjoy a seamless shopping experience with detailed listings, secure transactions, and real-time communication with sellers. We foster trust with a robust rating system and transparent reviews.
                With secure payment options, real-time order tracking, and we ensure a smooth and efficient experience for all users.
                    </p>       </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF9E5]">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8 sm:mb-12">What We Provide</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-black font-bold">Comprehensive Product Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-gray-700">
          Sellers can effortlessly showcase their products with detailed descriptions, images, and pricing, ensuring buyers have all the information they need.

</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-black font-bold">Secure Buyer-Seller Interaction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-gray-700">
          Facilitate smooth communication through integrated messaging while maintaining the security and privacy of all users.          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-black font-bold">Transparent Ratings and Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-gray-700">
          Build trust and credibility with a user rating system, empowering informed decisions and fostering community growth.          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>


      {/* Team Members Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8 sm:mb-12">Our Team</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Mahendra Kumar Tamrakar', role: 'Frontend Developer', image: '/images/Mahendra1.jpg' },
                { name: 'Lavesh Vyas', role: 'Backend Developer', image: '/images/Lavesh.jpg' },
                { name: 'Kuldeep Vishwakarma', role: 'Frontend Developer', image: '/images/kullu.jpg' },
                { name: 'Malay Choudhary', role: 'Frontend Developer', image: '/images/photo-2.jpg' }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-lg text-gray-700 sm:text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm sm:text-base text-gray-700">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



      {/* About Us Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF9E5]">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF0D9]">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-black font-bold text-center">About Us</CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-gray-700">
              <p className="mb-4">
              Founded in 2024, our platform is dedicated to empowering individuals and businesses through seamless e-commerce solutions. We believe in the potential of technology to bridge gaps, enabling buyers and sellers to connect, trade, and grow in a trusted environment.              </p>
              <p className="mb-4">
              With a team of passionate innovators, we’ve built a platform that simplifies transactions, fosters transparency, and ensures a user-friendly experience. From intuitive product listings to secure communication tools, our goal is to provide a space where users can thrive in a collaborative marketplace.              </p>
              <p>
              Our commitment to excellence is driven by core values: innovation, trust, and customer satisfaction. We look forward to shaping the future of online commerce and making a lasting impact on how people buy and sell online.              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

