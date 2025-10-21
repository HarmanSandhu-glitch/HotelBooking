import React from 'react'
import { assets } from '../assets/assets'

function SearchHeader({ searchQuery, setSearchQuery, totalRooms }) {
    return (
        <div className='bg-white border-b border-gray-200'>
            <div className='px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-8 md:pb-12'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-playfair'>
                        Discover Your Perfect Stay
                    </h1>
                    <p className='text-gray-600 text-base md:text-lg mb-6'>
                        Browse through our collection of {totalRooms} handpicked hotels
                    </p>

                    {/* Search Bar */}
                    <div className='relative max-w-2xl'>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search by hotel name, location, or city...'
                            className='w-full px-6 py-4 pl-14 rounded-full border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                        />
                        <img
                            src={assets.searchIcon}
                            alt='search'
                            className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40'
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                            >
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchHeader
