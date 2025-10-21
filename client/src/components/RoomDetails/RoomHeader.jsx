import React from 'react'
import { assets } from '../../assets/assets'

function RoomHeader({ hotel, roomType, pricePerNight }) {
    return (
        <div className='mb-8'>
            {/* Breadcrumb */}
            <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
                <a href='/' className='hover:text-gray-900 transition-colors'>Home</a>
                <span>/</span>
                <a href='/rooms' className='hover:text-gray-900 transition-colors'>Hotels</a>
                <span>/</span>
                <span className='text-gray-900'>{hotel.name}</span>
            </div>

            {/* Title and Rating */}
            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4'>
                <div>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-playfair'>
                        {hotel.name}
                    </h1>
                    <div className='flex items-center gap-2 text-gray-600 mb-2'>
                        <img src={assets.locationIcon} alt='location' className='w-5 h-5' />
                        <span>{hotel.address}, {hotel.city}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg'>
                            <img src={assets.starIconFilled} alt='star' className='w-4 h-4 invert' />
                            <span className='font-semibold'>4.5</span>
                        </div>
                        <span className='text-sm text-gray-600'>(128 reviews)</span>
                    </div>
                </div>

                {/* Price */}
                <div className='text-right'>
                    <p className='text-sm text-gray-600 mb-1'>Starting from</p>
                    <p className='text-4xl font-bold text-gray-900'>${pricePerNight}</p>
                    <p className='text-sm text-gray-600'>per night</p>
                    <span className='inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full'>
                        {roomType}
                    </span>
                </div>
            </div>

            {/* Quick Info */}
            <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                    </svg>
                    <span>2 Guests</span>
                </div>
                <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                    </svg>
                    <span>35 m²</span>
                </div>
                <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                    </svg>
                    <span>Free Cancellation</span>
                </div>
            </div>
        </div>
    )
}

export default RoomHeader
