import React, { useState } from 'react'
import { cities } from '../assets/assets'

function HotelReg({ onClose }) {
    const [formData, setFormData] = useState({
        hotelName: '',
        phone: '',
        address: '',
        city: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.hotelName.trim()) {
            newErrors.hotelName = 'Hotel name is required'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required'
        }

        if (!formData.city) {
            newErrors.city = 'Please select a city'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            console.log('Form submitted:', formData)
            onClose && onClose()
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose && onClose()
        }
    }

    return (
        <div
            className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70 p-4'
            onClick={handleBackdropClick}
        >
            <div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex'>
                {/* Left Side - Image */}
                <div className='hidden md:block w-2/5 relative'>
                    <img
                        src='https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
                        alt='Luxury Hotel'
                        className='absolute inset-0 w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent'></div>
                    <div className='absolute bottom-8 left-8 right-8 text-white'>
                        <h3 className='text-2xl font-bold mb-2'>Join Our Network</h3>
                        <p className='text-sm opacity-90'>List your property and reach millions of travelers worldwide</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className='w-full md:w-3/5 flex flex-col max-h-[90vh] overflow-y-auto'>
                    {/* Header */}
                    <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-900'>Register Your Hotel</h2>
                                <p className='text-sm text-gray-600 mt-1'>Fill in the details to get started</p>
                            </div>
                            <button
                                onClick={onClose}
                                className='text-gray-400 hover:text-gray-600 transition-colors'
                                aria-label='Close'
                            >
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                        {/* Hotel Name */}
                        <div>
                            <label htmlFor='hotelName' className='block text-sm font-semibold text-gray-700 mb-2'>
                                Hotel Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                id='hotelName'
                                name='hotelName'
                                value={formData.hotelName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.hotelName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                            {errors.hotelName && (
                                <p className='text-red-500 text-xs mt-1 flex items-center'>
                                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                    </svg>
                                    {errors.hotelName}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor='phone' className='block text-sm font-semibold text-gray-700 mb-2'>
                                Phone Number <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='tel'
                                id='phone'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                            {errors.phone && (
                                <p className='text-red-500 text-xs mt-1 flex items-center'>
                                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                    </svg>
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* City Dropdown */}
                        <div>
                            <label htmlFor='city' className='block text-sm font-semibold text-gray-700 mb-2'>
                                City <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <select
                                    id='city'
                                    name='city'
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer`}
                                >
                                    <option value=''>Select a city</option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400'>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                    </svg>
                                </div>
                            </div>
                            {errors.city && (
                                <p className='text-red-500 text-xs mt-1 flex items-center'>
                                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                    </svg>
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor='address' className='block text-sm font-semibold text-gray-700 mb-2'>
                                Address <span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                id='address'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                rows='3'
                                className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                            />
                            {errors.address && (
                                <p className='text-red-500 text-xs mt-1 flex items-center'>
                                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                    </svg>
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-3 pt-4'>
                            <button
                                type='button'
                                onClick={onClose}
                                className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'
                            >
                                Register Hotel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HotelReg