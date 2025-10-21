import React from 'react'
import HotelCard from '../HotelCard'

function SimilarRooms({ currentRoomId, allRooms }) {
    // Filter out current room and get 3 similar rooms
    const similarRooms = allRooms
        .filter(room => room._id !== currentRoomId)
        .slice(0, 3)

    if (similarRooms.length === 0) return null

    return (
        <div className='py-12 bg-gray-50 rounded-2xl px-6'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-playfair text-center'>
                Similar Properties
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {similarRooms.map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>
        </div>
    )
}

export default SimilarRooms
