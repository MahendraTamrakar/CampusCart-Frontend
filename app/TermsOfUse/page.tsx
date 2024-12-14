import { Footer } from "@/components/footer"
import { ECommerceNav }  from "@/components/navbar-for-all"
import { Card } from "@/components/ui/card"

export default function TermsAndConditions() {
  return (
    <div className="bg-[#FFF9E5] min-h-screen" >
            <ECommerceNav />
            <div className="max-w-5xl mt-16 mb-16 mx-auto">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 transform skew-y-3 rounded-3xl shadow-lg"></div>
        <Card className="relative z-10 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-6 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
            Terms and Conditions
          </h1>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>By accessing or using Campus Cart, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.</p>
        </Card>

        <Card className=" text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be a current student or staff member of an affiliated educational institution to create an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account and password.</li>
            <li>You agree to accept responsibility for all activities that occur under your account.</li>
          </ul>
        </Card>

        <Card className="text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Listing and Selling</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All items listed must comply with our prohibited items policy.</li>
            <li>Sellers are responsible for accurately describing their items and fulfilling their sales.</li>
            <li>Campus Cart reserves the right to remove any listing without prior notice.</li>
          </ul>
        </Card>

        <Card className="text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Purchases and Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Buyers are responsible for reading the full item description before making a purchase.</li>
            <li>All payments are processed through our secure payment system.</li>
            <li>Campus Cart is not responsible for transactions conducted outside of our platform.</li>
          </ul>
        </Card>

        <Card className="text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Prohibited Conduct</h2>
          <p>Users agree not to engage in any of the following activities:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Violating laws or regulations</li>
            <li>Posting false, inaccurate, or misleading content</li>
            <li>Infringing on intellectual property rights</li>
            <li>Harassing or bullying other users</li>
            <li>Attempting to gain unauthorized access to other user accounts or data</li>
          </ul>
        </Card>

        <Card className="text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>Campus Cart is not liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
        </Card>

        <Card className="text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</p>
        </Card>

        <Card className="text-black rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#fff5eb] p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Email: terms@campuscart.com</li>
            <li>Support portal: support.campuscart.com</li>
          </ul>
        </Card>

        <footer className="text-black mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600 text-center">
          <p>Last updated: December 2024</p>
          <p>Campus Cart - Connecting campus communities through secure commerce</p>
        </footer>
      </div>
    </div>
        <Footer />
    </div>
  )
}

