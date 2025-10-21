import React from 'react'

function EmptyBookings({ filter }) {
    const messages = {
        all: {
            title: 'No Bookings Yet',
            description: 'Start exploring amazing hotels and make your first booking!',
            icon: (
                <svg className='w-16 h-16' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
            )
        },
        upcoming: {
            title: 'No Upcoming Bookings',
            description: 'You don\'t have any upcoming reservations at the moment.',
            icon: (
                <svg className='w-16 h-16' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
            )
        },
        completed: {
            title: 'No Completed Bookings',
            description: 'Your past bookings will appear here.',
            icon: (
                <svg className='w-16 h-16' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
            )
        },
        cancelled: {
            title: 'No Cancelled Bookings',
            description: 'You haven\'t cancelled any bookings.',
            icon: (
                <svg className='w-16 h-16' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
            )
        }
    }

    const message = messages[filter] || messages.all

    return (
        <div className='text-center py-20'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6 text-gray-400'>
                {message.icon}
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-3'>{message.title}</h3>
            <p className='text-gray-600 mb-8 max-w-md mx-auto'>{message.description}</p>
            <a
                href='/rooms'
                className='inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg'
            >
                Explore Hotels
            </a>
        </div>
    )
}

export default EmptyBookings
