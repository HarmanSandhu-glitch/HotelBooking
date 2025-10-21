import React from 'react'
import { facilityIcons } from '../../assets/assets'

function AmenitiesSection({ amenities }) {
    return (
        <div className='bg-white rounded-2xl border border-gray-200 p-6 mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 font-playfair'>
                Amenities
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {amenities.map((amenity, index) => (
                    <div key={index} className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                        {facilityIcons[amenity] && (
                            <img 
                                src={facilityIcons[amenity]} 
                                alt={amenity} 
                                className='w-6 h-6'
                            />
                        )}
                        <span className='text-gray-700'>{amenity}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AmenitiesSection
