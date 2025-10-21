import React, { useState } from 'react'

function BookingCard({ pricePerNight, isAvailable }) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)

    const calculateNights = () => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn)
            const end = new Date(checkOut)
            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            return nights > 0 ? nights : 0
        }
        return 0
    }

    const nights = calculateNights()
    const subtotal = nights * pricePerNight
    const serviceFee = subtotal * 0.1 // 10% service fee
    const total = subtotal + serviceFee

    const handleBooking = (e) => {
        e.preventDefault()
        // Handle booking logic here
        alert('Booking functionality to be implemented!')
    }

    return (
        <div className='lg:sticky lg:top-24'>
            <div className='bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg'>
                <div className='mb-6'>
                    <div className='flex items-baseline gap-2 mb-2'>
                        <span className='text-3xl font-bold text-gray-900'>${pricePerNight}</span>
                        <span className='text-gray-600'>/ night</span>
                    </div>
                    {isAvailable ? (
                        <span className='inline-flex items-center gap-1 text-sm text-green-600 font-medium'>
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            Available
                        </span>
                    ) : (
                        <span className='text-sm text-red-600 font-medium'>Not Available</span>
                    )}
                </div>

                <form onSubmit={handleBooking} className='space-y-4'>
                    {/* Check-in Date */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-900 mb-2'>
                            Check-in
                        </label>
                        <input
                            type='date'
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                        />
                    </div>

                    {/* Check-out Date */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-900 mb-2'>
                            Check-out
                        </label>
                        <input
                            type='date'
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            required
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                        />
                    </div>

                    {/* Guests */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-900 mb-2'>
                            Guests
                        </label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                        >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'Guest' : 'Guests'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Breakdown */}
                    {nights > 0 && (
                        <div className='border-t border-gray-200 pt-4 space-y-2'>
                            <div className='flex justify-between text-sm text-gray-600'>
                                <span>${pricePerNight} × {nights} nights</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between text-sm text-gray-600'>
                                <span>Service fee</span>
                                <span>${serviceFee.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200'>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    {/* Book Button */}
                    <button
                        type='submit'
                        disabled={!isAvailable}
                        className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl'
                    >
                        {isAvailable ? 'Reserve Now' : 'Not Available'}
                    </button>
                </form>

                <p className='text-xs text-gray-500 text-center mt-4'>
                    You won't be charged yet
                </p>
            </div>

            {/* Contact Card */}
            <div className='bg-gray-50 rounded-2xl border border-gray-200 p-6 mt-4'>
                <h3 className='font-semibold text-gray-900 mb-2'>Need Help?</h3>
                <p className='text-sm text-gray-600 mb-4'>
                    Contact our team for assistance
                </p>
                <button className='w-full border-2 border-gray-300 hover:border-blue-600 text-gray-900 font-semibold py-3 rounded-lg transition-all'>
                    Contact Hotel
                </button>
            </div>
        </div>
    )
}

export default BookingCard
