import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

function FeaturedDestination({ title = "Featured Destinations" }) {
    const navigate = useNavigate();
    return (
        <div className='m-auto w-full items-center gap-8 flex justify-center flex-col py-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50'>
            <Title
                title={title}
                subTitle="Discover your perfect getaway with our exclusive hotels selection. ✈️"
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8'>
                {roomsDummyData.slice(0, 4).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>
            <button onClick={() => { navigate("/rooms"); scrollTo(0, 0); }}
                className="mt-8 px-8 py-3 text-sm font-semibold border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                View All Destinations →
            </button>

        </div >
    )
}

export default FeaturedDestination