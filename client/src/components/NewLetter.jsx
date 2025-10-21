import React, { useState } from 'react'

function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('') // 'success', 'error', or ''

    const handleSubmit = (e) => {
        e.preventDefault()

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!email) {
            setStatus('error')
            setTimeout(() => setStatus(''), 3000)
            return
        }

        if (!emailRegex.test(email)) {
            setStatus('error')
            setTimeout(() => setStatus(''), 3000)
            return
        }

        // Simulate successful subscription
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus(''), 5000)
    }

    return (
        <div className='py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50'>
            <div className='max-w-4xl mx-auto text-center'>
                {/* Icon/Visual Element */}
                <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6'>
                    <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair'>
                    Stay in the Loop
                </h2>

                {/* Subheading */}
                <p className='text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                    Subscribe to our newsletter for exclusive deals, travel inspiration, and insider tips on the best hotels worldwide.
                </p>

                {/* Newsletter Form */}
                <form onSubmit={handleSubmit} className='max-w-xl mx-auto'>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email address'
                            className='flex-1 px-6 py-4 rounded-full border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder:text-gray-400'
                        />
                        <button
                            type='submit'
                            className='px-8 py-4 bg-gray-900 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl'
                        >
                            Subscribe
                        </button>
                    </div>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center gap-2 text-green-800'>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span className='text-sm font-medium'>Thank you for subscribing! Check your inbox.</span>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center gap-2 text-red-800'>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                            </svg>
                            <span className='text-sm font-medium'>Please enter a valid email address.</span>
                        </div>
                    )}
                </form>

                {/* Trust Indicators */}
                <div className='mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500'>
                    <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        <span>We respect your privacy</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                        </svg>
                        <span>Unsubscribe anytime</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z' clipRule='evenodd' />
                        </svg>
                        <span>Weekly updates</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter
