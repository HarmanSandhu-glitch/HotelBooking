import React from 'react'
import { Link } from 'react-router-dom'

function BookingCard({ booking }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        })
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getPaymentStatusColor = (isPaid) => {
        return isPaid 
            ? 'bg-green-100 text-green-800' 
            : 'bg-orange-100 text-orange-800'
    }

    const handlePayNow = () => {
        // Payment logic to be implemented
        alert('Payment functionality to be implemented!')
    }

    return (
        <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300'>
            {/* Booking Header */}
            <div className='p-6 border-b border-gray-200 bg-gray-50'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div>
                        <h3 className='text-xl font-bold text-gray-900 mb-1 font-playfair'>
                            {booking.hotel.name}
                        </h3>
                        <p className='text-sm text-gray-600'>
                            Booking ID: <span className='font-mono font-medium'>{booking._id.slice(-8)}</span>
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.isPaid)}`}>
                            {booking.isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Booking Content */}
            <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                    {/* Room Image */}
                    <div className='relative h-48 rounded-xl overflow-hidden'>
                        <img 
                            src={booking.room.images[0]} 
                            alt={booking.hotel.name}
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold'>
                            {booking.room.roomType}
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className='space-y-4'>
                        {/* Check-in & Check-out */}
                        <div className='flex items-start gap-3'>
                            <div className='shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm text-gray-600'>Check-in</p>
                                <p className='font-semibold text-gray-900'>{formatDate(booking.checkInDate)}</p>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm text-gray-600'>Check-out</p>
                                <p className='font-semibold text-gray-900'>{formatDate(booking.checkOutDate)}</p>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className='flex items-start gap-3'>
                            <div className='shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                </svg>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600'>Guests</p>
                                <p className='font-semibold text-gray-900'>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className='flex items-start gap-3'>
                            <div className='shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                                </svg>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600'>Payment Method</p>
                                <p className='font-semibold text-gray-900'>{booking.paymentMethod}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price and Actions */}
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200'>
                    <div>
                        <p className='text-sm text-gray-600 mb-1'>Total Amount</p>
                        <p className='text-2xl font-bold text-gray-900'>${booking.totalPrice}</p>
                    </div>
                    <div className='flex gap-3 w-full sm:w-auto'>
                        {!booking.isPaid && booking.status !== 'cancelled' && (
                            <button
                                onClick={handlePayNow}
                                className='flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg'
                            >
                                Pay Now
                            </button>
                        )}
                        <Link
                            to={`/rooms/${booking.room._id}`}
                            className='flex-1 sm:flex-none px-6 py-3 border-2 border-gray-300 hover:border-blue-600 text-gray-900 font-semibold rounded-lg transition-all text-center'
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard
