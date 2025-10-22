import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { roomAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'

function ListRoom() {
    const { getToken } = useAuth()
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchMyRooms()
    }, [])

    const fetchMyRooms = async () => {
        try {
            setLoading(true)
            const token = await getToken()
            const response = await roomAPI.getMyRooms(token)
            setRooms(response.data || [])
        } catch (err) {
            console.error('Error fetching rooms:', err)
            setError(err.message || 'Failed to load rooms')
        } finally {
            setLoading(false)
        }
    }

    const handleToggleAvailability = async (roomId, currentStatus) => {
        try {
            const token = await getToken()
            await roomAPI.toggleAvailability(token, roomId, !currentStatus)
            // Update local state
            setRooms(rooms.map(room => 
                room._id === roomId ? { ...room, isAvailable: !currentStatus } : room
            ))
        } catch (err) {
            alert(err.message || 'Failed to update room availability')
        }
    }

    const handleDeleteRoom = async (roomId) => {
        if (!window.confirm('Are you sure you want to delete this room?')) return

        try {
            const token = await getToken()
            await roomAPI.delete(token, roomId)
            setRooms(rooms.filter(room => room._id !== roomId))
            alert('Room deleted successfully')
        } catch (err) {
            alert(err.message || 'Failed to delete room')
        }
    }

    if (loading) {
        return <LoadingSpinner fullScreen />
    }

    return (
        <div className='p-8'>
            {/* Page Header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Rooms</h1>
                    <p className='text-gray-600'>Manage all your listed properties</p>
                </div>
                <button className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg'>
                    + Add New Room
                </button>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <div className='bg-white rounded-xl shadow-md p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-600 text-sm mb-1'>Total Rooms</p>
                            <p className='text-3xl font-bold text-gray-900'>{rooms.length}</p>
                        </div>
                        <div className='bg-blue-50 p-3 rounded-lg'>
                            <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-md p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-600 text-sm mb-1'>Available</p>
                            <p className='text-3xl font-bold text-green-600'>
                                {rooms.filter(r => r.isAvailable).length}
                            </p>
                        </div>
                        <div className='bg-green-50 p-3 rounded-lg'>
                            <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-md p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-600 text-sm mb-1'>Unavailable</p>
                            <p className='text-3xl font-bold text-red-600'>
                                {rooms.filter(r => !r.isAvailable).length}
                            </p>
                        </div>
                        <div className='bg-red-50 p-3 rounded-lg'>
                            <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rooms List */}
            {rooms.length === 0 ? (
                <div className='bg-white rounded-xl shadow-md p-12 text-center'>
                    <svg className='w-16 h-16 text-gray-400 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                    </svg>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>No Rooms Yet</h3>
                    <p className='text-gray-600 mb-6'>Start by adding your first room to get bookings</p>
                    <button className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'>
                        Add Your First Room
                    </button>
                </div>
            ) : (
                <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Room</th>
                                    <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Hotel</th>
                                    <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Type</th>
                                    <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Price/Night</th>
                                    <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Guests</th>
                                    <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Status</th>
                                    <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room._id} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                                        <td className='py-4 px-6'>
                                            <div className='flex items-center gap-3'>
                                                {room.images && room.images[0] ? (
                                                    <img 
                                                        src={room.images[0]} 
                                                        alt={room.roomType}
                                                        className='w-16 h-16 object-cover rounded-lg'
                                                    />
                                                ) : (
                                                    <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
                                                        <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                        </svg>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className='font-semibold text-gray-900'>{room.roomType}</p>
                                                    <p className='text-xs text-gray-500'>{room.bedrooms} bed • {room.bathrooms} bath</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-4 px-6 text-sm text-gray-700'>
                                            {room.hotel?.name || 'N/A'}
                                        </td>
                                        <td className='py-4 px-6 text-sm text-gray-700'>{room.roomType}</td>
                                        <td className='py-4 px-6 text-sm font-semibold text-gray-900'>${room.pricePerNight}</td>
                                        <td className='py-4 px-6 text-sm text-gray-700'>{room.maxGuests}</td>
                                        <td className='py-4 px-6'>
                                            <button
                                                onClick={() => handleToggleAvailability(room._id, room.isAvailable)}
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                                    room.isAvailable 
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                            >
                                                <span className={`w-2 h-2 rounded-full ${room.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {room.isAvailable ? 'Available' : 'Unavailable'}
                                            </button>
                                        </td>
                                        <td className='py-4 px-6'>
                                            <div className='flex items-center gap-2'>
                                                <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600'>
                                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteRoom(room._id)}
                                                    className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600'
                                                >
                                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListRoom