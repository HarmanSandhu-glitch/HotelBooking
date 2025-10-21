import React from 'react'

function BookingsFilter({ activeFilter, setActiveFilter, counts }) {
    const filters = [
        { id: 'all', label: 'All Bookings', count: counts.all },
        { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
        { id: 'completed', label: 'Completed', count: counts.completed },
        { id: 'cancelled', label: 'Cancelled', count: counts.cancelled }
    ]

    return (
        <div className='flex flex-wrap gap-3 mb-8'>
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        activeFilter === filter.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-600 hover:text-blue-600'
                    }`}
                >
                    {filter.label}
                    {filter.count > 0 && (
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                            activeFilter === filter.id
                                ? 'bg-white/20'
                                : 'bg-gray-100'
                        }`}>
                            {filter.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}

export default BookingsFilter
