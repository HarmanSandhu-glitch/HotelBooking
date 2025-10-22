import React, { useState, useMemo, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import BookingCard from '../components/MyBookings/BookingCard'
import BookingsFilter from '../components/MyBookings/BookingsFilter'
import EmptyBookings from '../components/MyBookings/EmptyBookings'
import { userBookingsDummyData } from '../assets/assets'
import { bookingAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

function MyBooking() {
    const { getToken, isSignedIn } = useAuth()
    const [activeFilter, setActiveFilter] = useState('all')
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch user bookings
    useEffect(() => {
        const fetchBookings = async () => {
            if (!isSignedIn) {
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)
                const token = await getToken()
                const response = await bookingAPI.getMyBookings(token)
                setBookings(response.data || [])
            } catch (err) {
                console.error('Error fetching bookings:', err)
                setError(err.message || 'Failed to load bookings')
                // Fallback to dummy data
                setBookings(userBookingsDummyData)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [getToken, isSignedIn])

    // Filter bookings based on active filter
    const filteredBookings = useMemo(() => {
        const now = new Date()

        switch (activeFilter) {
            case 'upcoming':
                return bookings.filter(booking => {
                    const checkInDate = new Date(booking.checkInDate)
                    return checkInDate > now && booking.status !== 'cancelled'
                })
            case 'completed':
                return bookings.filter(booking => {
                    const checkOutDate = new Date(booking.checkOutDate)
                    return checkOutDate < now && booking.status !== 'cancelled'
                })
            case 'cancelled':
                return bookings.filter(booking => booking.status === 'cancelled')
            case 'all':
            default:
                return bookings
        }
    }, [activeFilter, bookings])

    // Calculate counts for each filter
    const counts = useMemo(() => {
        const now = new Date()
        return {
            all: bookings.length,
            upcoming: bookings.filter(booking => {
                const checkInDate = new Date(booking.checkInDate)
                return checkInDate > now && booking.status !== 'cancelled'
            }).length,
            completed: bookings.filter(booking => {
                const checkOutDate = new Date(booking.checkOutDate)
                return checkOutDate < now && booking.status !== 'cancelled'
            }).length,
            cancelled: bookings.filter(booking => booking.status === 'cancelled').length
        }
    }, [bookings])

    if (loading) {
        return <LoadingSpinner fullScreen />
    }

    if (!isSignedIn) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>Please Sign In</h2>
                    <p className='text-gray-600'>You need to be signed in to view your bookings</p>
                </div>
            </div>
        )
    }

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