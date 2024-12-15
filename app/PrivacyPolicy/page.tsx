import { Footer } from "@/components/footer"
import { ECommerceNav } from "@/components/navbar-for-all"
import { Card } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FFF9E5] min-h-screen" >
        <ECommerceNav />
        <div className="max-w-5xl mt-16 pt-20 mb-16 mx-auto">
        
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform skew-y-3 rounded-3xl shadow-lg"></div>
        <Card className="relative z-10 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-6 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Privacy Policy
          </h1>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="rounded-3xl text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information (name, email, student ID)</li>
            <li>Transaction data (purchase history, payment details)</li>
            <li>Communication records between buyers and sellers</li>
            <li>User-generated content (reviews, ratings, product listings)</li>
            <li>Usage data (browsing patterns, device information)</li>
          </ul>
        </Card>

        <Card className="rounded-3xl text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Facilitate marketplace transactions</li>
            <li>Enhance platform security and prevent fraud</li>
            <li>Improve our services and user experience</li>
            <li>Enable communication between buyers and sellers</li>
            <li>Maintain our rating and review system</li>
          </ul>
        </Card>

        <Card className="rounded-3xl text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <p>
            We implement robust security measures to protect your personal information. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Encryption of sensitive data</li>
            <li>Secure payment processing</li>
            <li>Regular security audits</li>
            <li>Strict data sharing policies</li>
          </ul>
        </Card>

        <Card className="rounded-3xl text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request corrections to your information</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>
        </Card>

        <Card className="rounded-3xl text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Enhance your browsing experience</li>
            <li>Analyze platform usage</li>
            <li>Personalize content</li>
          </ul>
          <p className="mt-2">
            You can control cookie preferences through your browser settings.
          </p>
        </Card>

        <Card className="rounded-3xl text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            For questions about our privacy practices or to exercise your privacy rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Email: privacy@campuscart.com</li>
            <li>Support portal: support.campuscart.com</li>
          </ul>
        </Card>

        <footer className="mt-12 pt-6  border-t border-gray-200 text-sm text-gray-600 text-center">
          <p>Last updated: December 2024</p>
          <p>Campus Cart - Connecting campus communities through secure commerce</p>
        </footer>
      </div>
      
    </div>
    <Footer/>
    </div>

  )
}

