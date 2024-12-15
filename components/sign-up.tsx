'use client'

import { useState, useRef, FormEvent } from 'react'
import { FaGooglePlusG, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export function SignUpComponent() {
  const [isActive, setIsActive] = useState(true) 
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' })
  const [signInData, setSignInData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ signUp: { [key: string]: string }, signIn: { [key: string]: string } }>({ signUp: {}, signIn: {} })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleToggle = () => {
    setIsActive(prev => !prev)
    setErrorMessage('')
    // Reset form data when toggling
    setSignUpData({ name: '', email: '', password: '' })
    setSignInData({ email: '', password: '' })
    setErrors({ signUp: {}, signIn: {} })
  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignUpData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({
      ...prev,
      signUp: { ...prev.signUp, [name]: '' }
    }))
    setErrorMessage('')
  }

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignInData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({
      ...prev,
      signIn: { ...prev.signIn, [name]: '' }
    }))
    setErrorMessage('')
  }

  const validateForm = (data: typeof signUpData | typeof signInData, formType: 'signUp' | 'signIn') => {
    const newErrors: { [key: string]: string } = {}
    Object.entries(data).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required'
      }
      if (key === 'email' && value.trim() && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[key] = 'Please enter a valid email address'
      }
      if (key === 'password' && value.trim().length < 6) {
        newErrors[key] = 'Password must be at least 6 characters'
      }
    })
    setErrors(prev => ({ ...prev, [formType]: newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    if (validateForm(signUpData, 'signUp')) {
      setLoading(true)
      try {
        const response = await axios.post('https://campuscartbackend.onrender.com/api/auth/signup', signUpData)
        console.log('Signup successful:', response.data)
        handleToggle()
      } catch (error: any) {
        console.error('Signup error:', error)
        setErrorMessage(error.response?.data?.message || 'Failed to sign up. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  // const handleSignIn = async (e: FormEvent) => {
  //   e.preventDefault()
  //   if (validateForm(signInData, 'signIn')) {
  //     setLoading(true)
  //     try {
  //       const response = await axios.post('http://localhost:5000/api/auth/login', signInData)
  //       console.log('Signin successful:', response.data)
  //       // Store token or user data in localStorage/session if needed
  //       localStorage.setItem('token', response.data.token)
  //       // Redirect to dashboard or home page
  //       router.push('/')
  //     } catch (error: any) {
  //       console.error('Signin error:', error)
  //       setErrorMessage(error.response?.data?.message || 'Invalid email or password')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  // }

  const ErrorMessage = ({ message }: { message: string }) => (
    message ? (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
        {message}
      </div>
    ) : null
  )

  return (
    <div className="bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] flex items-center justify-center min-h-screen font-['Montserrat']">
      <div ref={containerRef} className={`container bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] relative overflow-hidden w-[768px] max-w-full min-h-[480px] ${isActive ? 'active' : ''}`}> 
        <div className="form-container sign-up absolute top-0 h-full transition-all duration-[0.6s] ease-in-out left-0 w-1/2 opacity-0 z-[1]">
          <form onSubmit={handleSignUp} className="bg-white flex items-center justify-center flex-col px-10 h-full">
            <h1 className="text-3xl font-bold mb-12">Create Account</h1>
            <ErrorMessage message={errorMessage} />
             <input 
              type="text" 
              name="name"
              placeholder="Name" 
              className={`bg-[#eee] text-black border-none mb-2 py-2.5 px-[15px] text-sm rounded-lg w-full outline-none ${errors.signUp.name ? 'shake border-red-500' : ''}`}
              value={signUpData.name}
              onChange={handleSignUpChange}
            />
            {errors.signUp.name && <span className="text-red-500 text-xs mb-2">{errors.signUp.name}</span>}
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className={`bg-[#eee] text-black border-none mb-2 py-2.5 px-[15px] text-sm rounded-lg w-full outline-none ${errors.signUp.email ? 'shake border-red-500' : ''}`}
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
            {errors.signUp.email && <span className="text-red-500 text-xs mb-2">{errors.signUp.email}</span>}
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className={`bg-[#eee] text-black border-none mb-2 py-2.5 px-[15px] text-sm rounded-lg w-full outline-none ${errors.signUp.password ? 'shake border-red-500' : ''}`}
              value={signUpData.password}
              onChange={handleSignUpChange}
            />
            {errors.signUp.password && <span className="text-red-500 text-xs mb-2">{errors.signUp.password}</span>}
            <button 
              type="submit" 
              disabled={loading}
              className={`bg-[#512da8] text-white text-xs py-2.5 px-[45px] border border-transparent rounded-lg font-semibold tracking-[0.5px] uppercase mt-2.5 cursor-pointer transition-transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="form-container sign-in absolute top-0 h-full transition-all duration-[0.6s] ease-in-out left-0 w-1/2 z-[2]">
          <form  className="bg-white flex items-center justify-center flex-col px-10 h-full">
            <h1 className="text-3xl font-bold mb-4">Sign In</h1>
            <ErrorMessage message={errorMessage} />
            <div className="social-icons flex mb-5">
              <a href="#" className="border border-[#ccc] rounded-[20%] text-red-500 hover:bg-red-500 hover:text-white inline-flex justify-center items-center m-[0_3px] w-10 h-10"><FaGooglePlusG /></a>
              <a href="#" className="border border-[#ccc] rounded-[20%] text-blue-600 hover:bg-blue-600 hover:text-white inline-flex justify-center items-center m-[0_3px] w-10 h-10"><FaFacebookF /></a>
              <a href="#" className="border border-[#ccc] rounded-[20%] text-blue-700 hover:bg-blue-700 hover:text-white inline-flex justify-center items-center m-[0_3px] w-10 h-10"><FaLinkedinIn /></a>
            </div>
            <span className="text-xs mb-5"><span className='font-bold'>or</span> use your email and password</span>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className={`bg-[#eee] border-none mb-2 py-2.5 px-[15px] text-sm rounded-lg w-full outline-none ${errors.signIn.email ? 'shake border-red-500' : ''}`}
              value={signInData.email}
              onChange={handleSignInChange}
            />
            {errors.signIn.email && <span className="text-red-500 text-xs mb-2">{errors.signIn.email}</span>}
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className={`bg-[#eee] border-none mb-2 py-2.5 px-[15px] text-sm rounded-lg w-full outline-none ${errors.signIn.password ? 'shake border-red-500' : ''}`}
              value={signInData.password}
              onChange={handleSignInChange}
            />
            {errors.signIn.password && <span className="text-red-500 text-xs mb-2">{errors.signIn.password}</span>}
            <Link href = '/forgot-password' className="text-sm text-[#333] no-underline mt-4 mb-2.5">Forgot Your Password?</Link>
            <button 
              type="submit"
              disabled={loading}
              className={`bg-[#512da8] text-white text-xs py-2.5 px-[45px] border border-transparent rounded-lg font-semibold tracking-[0.5px] uppercase mt-2.5 cursor-pointer transition-transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-[0.6s] ease-in-out z-[1000]">
          <div className="toggle bg-[#512da8] h-full bg-gradient-to-r from-[#5c6bc0] to-[#512da8] text-white relative left-[-100%]  w-[200%] transform translate-x-0 transition-all duration-[0.6s] ease-in-out">
            <div className="toggle-panel toggle-left absolute w-1/2 h-full flex items-center justify-center flex-col p-[0_30px] text-center top-0 transform -translate-x-[200%] transition-all duration-[0.6s] ease-in-out">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm mb-5">Enter your personal details to use all of site features</p>
              <Link href="/sign-in">
              <button 
                className="bg-transparent text-white text-xs py-2.5 px-[45px] border border-white rounded-lg font-semibold tracking-[0.5px] uppercase mt-2.5 cursor-pointer transition-transform hover:scale-105"
                
                type="button"
              >
                Sign In
              </button>
              </Link>
            </div>
            <div className="toggle-panel toggle-right absolute w-1/2 h-full flex items-center justify-center flex-col p-[0_30px] text-center top-0 right-0 transform translate-x-0 transition-all duration-[0.6s] ease-in-out">
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-sm mb-5">Register with your personal details to use all of site features</p>
              <Link href="/sign-up">
              <button 
                className="bg-transparent text-white text-xs py-2.5 px-[45px] border border-white rounded-lg font-semibold tracking-[0.5px] uppercase mt-2.5 cursor-pointer transition-transform hover:scale-105"
                type="button"
              >
                Sign Up
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .container .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }
        .container .sign-in {
          left: 0;
          width: 50%;
          z-index: 2;
        }
        .container.active .sign-in {
          transform: translateX(100%);
        }
        .container .sign-up {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }
        .container.active .sign-up {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: move 0.6s;
        }
        .container .toggle-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: all 0.6s ease-in-out;
          border-radius: 150px 0 0 100px;
          z-index: 1000;
        }
        .container.active .toggle-container {
          transform: translateX(-100%);
          border-radius: 0 150px 100px 0;
        }
        .container .toggle {
          background-color: #512da8;
          height: 100%;
          background: linear-gradient(to right, #5c6bc0, #512da8);
          color: #fff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: all 0.6s ease-in-out;
        }
        .container.active .toggle {
          transform: translateX(50%);
        }
        .toggle-panel {
          position: absolute;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 30px;
          text-align: center;
          top: 0;
          transform: translateX(0);
          transition: all 0.6s ease-in-out;
        }
        .toggle-left {
          transform: translateX(-200%);
        }
        .container.active .toggle-left {
          transform: translateX(0);
        }
        .toggle-right {
          right: 0;
          transform: translateX(0);
        }
        .container.active .toggle-right {
          transform: translateX(200%);
        }
        @keyframes move {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }
        .shake {
          animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0);
          }
          20%, 80% {
            transform: translate3d(2px, 0, 0);
          }
          30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
          }
          40%, 60% {
            transform: translate3d(4px, 0, 0);
          }
        }
      `}</style>
    </div>
  )
}

