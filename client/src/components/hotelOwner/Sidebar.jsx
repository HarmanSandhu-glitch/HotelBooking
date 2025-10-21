import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

function Sidebar() {
    const sidebarLinks = [
        { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
        { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
        { name: "List Rooms", path: "/owner/list-rooms", icon: assets.listIcon },
    ]

    return (
        <div className='w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col'>
            {/* Sidebar Header */}
            <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-lg font-bold text-gray-800'>Hotel Management</h2>
                <p className='text-xs text-gray-500 mt-1'>Owner Dashboard</p>
            </div>

            {/* Navigation Links */}
            <nav className='flex-1 px-4 py-6'>
                <ul className='space-y-2'>
                    {sidebarLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.path}
                                end={link.path === '/owner'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-50 text-blue-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <img 
                                    src={link.icon} 
                                    alt={link.name}
                                    className='w-5 h-5'
                                />
                                <span>{link.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer Section */}
            <div className='px-6 py-4 border-t border-gray-200'>
                <div className='bg-blue-50 rounded-lg p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                        <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        <h3 className='text-sm font-semibold text-gray-800'>Need Help?</h3>
                    </div>
                    <p className='text-xs text-gray-600 mb-3'>
                        Contact our support team for assistance
                    </p>
                    <button className='w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors'>
                        Get Support
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar