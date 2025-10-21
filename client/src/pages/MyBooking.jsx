import React, { useState, useMemo } from 'react'
import BookingCard from '../components/MyBookings/BookingCard'
import BookingsFilter from '../components/MyBookings/BookingsFilter'
import EmptyBookings from '../components/MyBookings/EmptyBookings'
import { userBookingsDummyData } from '../assets/assets'

function MyBooking() {
    const [activeFilter, setActiveFilter] = useState('all')

    // Filter bookings based on active filter
    const filteredBookings = useMemo(() => {
        const now = new Date()

        switch (activeFilter) {
            case 'upcoming':
                return userBookingsDummyData.filter(booking => {
                    const checkInDate = new Date(booking.checkInDate)
                    return checkInDate > now && booking.status !== 'cancelled'
                })
            case 'completed':
                return userBookingsDummyData.filter(booking => {
                    const checkOutDate = new Date(booking.checkOutDate)
                    return checkOutDate < now && booking.status !== 'cancelled'
                })
            case 'cancelled':
                return userBookingsDummyData.filter(booking => booking.status === 'cancelled')
            case 'all':
            default:
                return userBookingsDummyData
        }
    }, [activeFilter])

    // Calculate counts for each filter
    const counts = useMemo(() => {
        const now = new Date()
        return {
            all: userBookingsDummyData.length,
            upcoming: userBookingsDummyData.filter(booking => {
                const checkInDate = new Date(booking.checkInDate)
                return checkInDate > now && booking.status !== 'cancelled'
            }).length,
            completed: userBookingsDummyData.filter(booking => {
                const checkOutDate = new Date(booking.checkOutDate)
                return checkOutDate < now && booking.status !== 'cancelled'
            }).length,
            cancelled: userBookingsDummyData.filter(booking => booking.status === 'cancelled').length
        }
    }, [])

    return (
        <div className='min-h-screen bg-gray-50 py-12 mt-20'>
            <div className='max-w-7xl mx-auto px-6 md:px-16 lg:px-24'>
                {/* Page Header */}
                <div className='mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-3'>
                        My Bookings
                    </h1>
                    <p className='text-gray-600 text-lg'>
                        Manage and track all your hotel reservations
                    </p>
                </div>

                {/* Filters */}
                <BookingsFilter
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    counts={counts}
                />

                {/* Bookings List */}
                <div className='mt-8'>
                    {filteredBookings.length === 0 ? (
                        <EmptyBookings filter={activeFilter} />
                    ) : (
                        <div className='space-y-6'>
                            {filteredBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyBooking