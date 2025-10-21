import React from 'react'
import { cities } from '../assets/assets'

function FilterSidebar({ 
    selectedCity, 
    setSelectedCity, 
    selectedRoomType, 
    setSelectedRoomType, 
    priceRange, 
    setPriceRange, 
    roomTypes, 
    resetFilters,
    showFilters,
    setShowFilters
}) {
    return (
        <div className='lg:w-80'>
            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setShowFilters(!showFilters)}
                className='lg:hidden w-full flex items-center justify-between px-6 py-3 bg-white border border-gray-200 rounded-xl mb-4'
            >
                <span className='font-semibold text-gray-900'>Filters</span>
                <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
            </button>

            {/* Filters Container */}
            <div className={`bg-white rounded-2xl border border-gray-200 p-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-lg font-semibold text-gray-900'>Filters</h2>
                    <button
                        onClick={resetFilters}
                        className='text-sm text-blue-600 hover:text-blue-700 font-medium'
                    >
                        Reset All
                    </button>
                </div>

                {/* City Filter */}
                <div className='mb-6 pb-6 border-b border-gray-200'>
                    <h3 className='text-sm font-semibold text-gray-900 mb-3'>City</h3>
                    <div className='space-y-2'>
                        {['All', ...cities].map((city) => (
                            <label key={city} className='flex items-center cursor-pointer group'>
                                <input
                                    type='radio'
                                    name='city'
                                    checked={selectedCity === city}
                                    onChange={() => setSelectedCity(city)}
                                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                />
                                <span className='ml-3 text-sm text-gray-700 group-hover:text-gray-900'>
                                    {city}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Room Type Filter */}
                <div className='mb-6 pb-6 border-b border-gray-200'>
                    <h3 className='text-sm font-semibold text-gray-900 mb-3'>Room Type</h3>
                    <div className='space-y-2'>
                        {roomTypes.map((type) => (
                            <label key={type} className='flex items-center cursor-pointer group'>
                                <input
                                    type='radio'
                                    name='roomType'
                                    checked={selectedRoomType === type}
                                    onChange={() => setSelectedRoomType(type)}
                                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                />
                                <span className='ml-3 text-sm text-gray-700 group-hover:text-gray-900'>
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className='mb-6'>
                    <h3 className='text-sm font-semibold text-gray-900 mb-3'>Price Range</h3>
                    <div className='space-y-4'>
                        <input
                            type='range'
                            min='0'
                            max='500'
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
                        />
                        <div className='flex items-center justify-between text-sm'>
                            <span className='text-gray-600'>$0</span>
                            <span className='font-semibold text-gray-900'>${priceRange[1]}</span>
                            <span className='text-gray-600'>$500+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar
