

'use client'

import { useState } from 'react'
import axios from 'axios'
import ForgotPasswordForm from '@/components/forgot-password-form'

export default function page() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Forgot Your Password?</h2>
          <p className="text-center text-gray-600 mb-6">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
    )
}
