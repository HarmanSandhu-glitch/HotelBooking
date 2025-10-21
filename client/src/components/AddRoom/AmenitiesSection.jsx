import React, { useState } from 'react'

function AmenitiesSection({ amenities, onAmenityChange, onAddCustomAmenity, onRemoveAmenity }) {
    const [customAmenity, setCustomAmenity] = useState('')
    const [showCustomInput, setShowCustomInput] = useState(false)

    const handleAddCustom = () => {
        if (customAmenity.trim()) {
            onAddCustomAmenity(customAmenity.trim())
            setCustomAmenity('')
            setShowCustomInput(false)
        }
    }

    const defaultAmenities = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access']
    const customAmenities = Object.keys(amenities).filter(amenity => !defaultAmenities.includes(amenity))

    return (
        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <h2 className='text-xl font-bold text-gray-900'>Amenities</h2>
                    <p className='text-sm text-gray-600 mt-1'>Select all amenities that apply</p>
                </div>
                <button
                    type='button'
                    onClick={() => setShowCustomInput(!showCustomInput)}
                    className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors'
                >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                    </svg>
                    Add Custom
                </button>
            </div>

            {/* Custom Amenity Input */}
            {showCustomInput && (
                <div className='mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Custom Amenity
                    </label>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            value={customAmenity}
                            onChange={(e) => setCustomAmenity(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustom())}
                            placeholder='Enter custom amenity name'
                            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            type='button'
                            onClick={handleAddCustom}
                            className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'
                        >
                            Add
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setShowCustomInput(false)
                                setCustomAmenity('')
                            }}
                            className='px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Default Amenities */}
            <div className='mb-6'>
                <h3 className='text-sm font-semibold text-gray-700 mb-3'>Standard Amenities</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {defaultAmenities.map((amenity) => (
                        <label key={amenity} className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all'>
                            <input
                                type='checkbox'
                                checked={amenities[amenity] || false}
                                onChange={() => onAmenityChange(amenity)}
                                className='w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500'
                            />
                            <span className='text-sm font-medium text-gray-700'>{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Custom Amenities */}
            {customAmenities.length > 0 && (
                <div>
                    <h3 className='text-sm font-semibold text-gray-700 mb-3'>Custom Amenities</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {customAmenities.map((amenity) => (
                            <div key={amenity} className='flex items-center gap-2 p-4 border border-purple-200 bg-purple-50 rounded-lg'>
                                <input
                                    type='checkbox'
                                    checked={amenities[amenity]}
                                    onChange={() => onAmenityChange(amenity)}
                                    className='w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500'
                                />
                                <span className='flex-1 text-sm font-medium text-gray-700'>{amenity}</span>
                                <button
                                    type='button'
                                    onClick={() => onRemoveAmenity(amenity)}
                                    className='text-red-500 hover:text-red-700 transition-colors'
                                    title='Remove amenity'
                                >
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AmenitiesSection
