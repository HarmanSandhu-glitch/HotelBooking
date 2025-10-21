import React from 'react'

function RoomsGrid({ filteredRooms, sortBy, setSortBy, HotelCard, resetFilters }) {
    return (
        <div className='flex-1'>
            {/* Results Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
                <p className='text-gray-600'>
                    <span className='font-semibold text-gray-900'>{filteredRooms.length}</span> properties found
                </p>

                {/* Sort By */}
                <div className='flex items-center gap-3'>
                    <label className='text-sm text-gray-600'>Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none text-sm'
                    >
                        <option value='recommended'>Recommended</option>
                        <option value='price-low'>Price: Low to High</option>
                        <option value='price-high'>Price: High to Low</option>
                        <option value='name'>Name: A to Z</option>
                    </select>
                </div>
            </div>

            {/* Results Grid */}
            {filteredRooms.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filteredRooms.map((room, index) => (
                        <HotelCard key={room._id} room={room} index={index} />
                    ))}
                </div>
            ) : (
                <EmptyState resetFilters={resetFilters} />
            )}
        </div>
    )
}

function EmptyState({ resetFilters }) {
    return (
        <div className='text-center py-20'>
            <div className='inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4'>
                <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>No properties found</h3>
            <p className='text-gray-600 mb-6'>Try adjusting your filters or search criteria</p>
            <button
                onClick={resetFilters}
                className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all'
            >
                Clear Filters
            </button>
        </div>
    )
}

export default RoomsGrid
