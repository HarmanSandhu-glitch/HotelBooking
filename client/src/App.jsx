import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AllRooms from './pages/AllRooms'
import Footer from './components/Footer'
import RoomDetails from './pages/RoomlDetails'
import MyBooking from './pages/MyBooking'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBooking />} />
          <Route path='/registration-form' element={<HotelReg />} />
          <Route path='owner' element={<Layout />}>
            <Route path='' element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-rooms' element={<AllRooms />} />
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
