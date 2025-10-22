import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { bookingAPI, hotelAPI, roomAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'

function Dashboard() {
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalBookings: 0,
        activeRooms: 0,
        occupancyRate: 0
    })
    const [recentBookings, setRecentBookings] = useState([])

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                const token = await getToken()
                
                // Fetch owner's bookings
                const bookingsResponse = await bookingAPI.getOwnerBookings(token)
                const bookings = bookingsResponse.data || []
                
                // Fetch owner's rooms
                const roomsResponse = await roomAPI.getMyRooms(token)
                const rooms = roomsResponse.data || []
                
                // Calculate stats
                const totalRevenue = bookings
                    .filter(b => b.isPaid)
                    .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
                
                const activeRooms = rooms.filter(r => r.isAvailable).length
                
                const occupancyRate = rooms.length > 0 
                    ? Math.round((bookings.filter(b => b.status === 'confirmed').length / rooms.length) * 100)
                    : 0
                
                setStats({
                    totalRevenue: `$${totalRevenue.toLocaleString()}`,
                    totalBookings: bookings.length,
                    activeRooms,
                    occupancyRate: `${occupancyRate}%`
                })
                
                // Set recent bookings (last 5)
                setRecentBookings(bookings.slice(0, 5))
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [getToken])

    if (loading) {
        return <LoadingSpinner fullScreen />
    }

    // Stats configuration with dynamic data
    const statsConfig = [
        {
            title: 'Total Revenue',
            value: stats.totalRevenue,
            change: '+12.5%',
            isPositive: true,
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
            ),
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Total Bookings',
            value: stats.totalBookings,
            change: '+8.2%',
            isPositive: true,
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
                </svg>
            ),
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Active Rooms',
            value: stats.activeRooms,
            change: '+3',
            isPositive: true,
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                </svg>
            ),
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            title: 'Occupancy Rate',
            value: stats.occupancyRate,
            change: '-2.4%',
            isPositive: false,
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
            ),
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        }
    ]

    return (
        <div className='p-8'>
            {/* Page Header */}
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard</h1>
                <p className='text-gray-600'>Welcome back! Here's what's happening with your hotel.</p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {statsConfig.map((stat, index) => (
                    <div key={index} className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className={`${stat.bgColor} ${stat.iconColor} p-3 rounded-lg`}>
                                {stat.icon}
                            </div>
                            <span className={`text-sm font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className='text-gray-600 text-sm font-medium mb-1'>{stat.title}</h3>
                        <p className='text-3xl font-bold text-gray-900'>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Recent Bookings */}
                <div className='lg:col-span-2 bg-white rounded-xl shadow-md p-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-bold text-gray-900'>Recent Bookings</h2>
                        <button className='text-blue-600 hover:text-blue-700 text-sm font-semibold'>
                            View All →
                        </button>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Guest</th>
                                    <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Room</th>
                                    <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Check-in</th>
                                    <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Status</th>
                                    <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.length > 0 ? recentBookings.map((booking) => (
                                    <tr key={booking._id} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                                        <td className='py-4 px-4 text-sm text-gray-900 font-medium'>
                                            {booking.user?.username || 'Guest'}
                                        </td>
                                        <td className='py-4 px-4 text-sm text-gray-600'>
                                            {booking.room?.roomType || 'N/A'}
                                        </td>
                                        <td className='py-4 px-4 text-sm text-gray-600'>
                                            {new Date(booking.checkInDate).toLocaleDateString()}
                                        </td>
                                        <td className='py-4 px-4'>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                booking.status === 'confirmed' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : booking.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className='py-4 px-4 text-sm font-semibold text-gray-900'>
                                            ${booking.totalPrice}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-500">
                                            No recent bookings
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='bg-white rounded-xl shadow-md p-6'>
                    <h2 className='text-xl font-bold text-gray-900 mb-6'>Quick Actions</h2>
                    <div className='space-y-3'>
                        <button className='w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left'>
                            <div className='bg-blue-600 text-white p-2 rounded-lg'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                                </svg>
                            </div>
                            <div>
                                <p className='font-semibold text-gray-900 text-sm'>Add New Room</p>
                                <p className='text-xs text-gray-600'>List a new property</p>
                            </div>
                        </button>

                        <button className='w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left'>
                            <div className='bg-green-600 text-white p-2 rounded-lg'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                                </svg>
                            </div>
                            <div>
                                <p className='font-semibold text-gray-900 text-sm'>View Bookings</p>
                                <p className='text-xs text-gray-600'>Manage reservations</p>
                            </div>
                        </button>

                        <button className='w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left'>
                            <div className='bg-purple-600 text-white p-2 rounded-lg'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                                </svg>
                            </div>
                            <div>
                                <p className='font-semibold text-gray-900 text-sm'>View Analytics</p>
                                <p className='text-xs text-gray-600'>Performance insights</p>
                            </div>
                        </button>

                        <button className='w-full flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left'>
                            <div className='bg-orange-600 text-white p-2 rounded-lg'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                </svg>
                            </div>
                            <div>
                                <p className='font-semibold text-gray-900 text-sm'>Settings</p>
                                <p className='text-xs text-gray-600'>Hotel configuration</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard