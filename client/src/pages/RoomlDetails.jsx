import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { roomsDummyData } from '../assets/assets'
import ImageGallery from '../components/RoomDetails/ImageGallery'
import RoomHeader from '../components/RoomDetails/RoomHeader'
import AmenitiesSection from '../components/RoomDetails/AmenitiesSection'
import AboutRoom from '../components/RoomDetails/AboutRoom'
import BookingCard from '../components/RoomDetails/BookingCard'
import SimilarRooms from '../components/RoomDetails/SimilarRooms'
import Footer from '../components/Footer'

function RoomDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    // Find the room by ID
    const room = roomsDummyData.find(r => r._id === id)

    // If room not found, show error
    if (!room) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-50'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>Room Not Found</h1>
                    <p className='text-gray-600 mb-6'>The room you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/rooms')}
                        className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all'
                    >
                        Back to All Rooms
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Main Content */}
            <div className='px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-12'>
                <div className='max-w-7xl mx-auto'>
                    {/* Room Header */}
                    <RoomHeader
                        hotel={room.hotel}
                        roomType={room.roomType}
                        pricePerNight={room.pricePerNight}
                    />

                    {/* Image Gallery */}
                    <div className='mb-12'>
                        <ImageGallery
                            images={room.images}
                            hotelName={room.hotel.name}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Left Column - Details */}
                        <div className='lg:col-span-2'>
                            <AboutRoom />
                            <AmenitiesSection amenities={room.amenities} />
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className='lg:col-span-1'>
                            <BookingCard
                                pricePerNight={room.pricePerNight}
                                isAvailable={room.isAvailable}
                            />
                        </div>
                    </div>

                    {/* Similar Rooms */}
                    <div className='mt-12'>
                        <SimilarRooms
                            currentRoomId={room._id}
                            allRooms={roomsDummyData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails
