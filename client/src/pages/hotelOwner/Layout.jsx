import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'

function Layout() {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <Sidebar />
                <main className='flex-1 overflow-y-auto bg-gray-50'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout