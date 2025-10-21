import React, { useState } from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from '../components/HotelCard'
import SearchHeader from '../components/SearchHeader'
import FilterSidebar from '../components/FilterSidebar'
import RoomsGrid from '../components/RoomsGrid'
import Footer from '../components/Footer'
import { useRoomFilters } from '../hooks/useRoomFilters'

function AllRooms() {
    // State management
    const [filteredRooms, setFilteredRooms] = useState(roomsDummyData)
    const [selectedCity, setSelectedCity] = useState('All')
    const [selectedRoomType, setSelectedRoomType] = useState('All')
    const [priceRange, setPriceRange] = useState([0, 500])
    const [sortBy, setSortBy] = useState('recommended')
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)

    // Get unique room types
    const roomTypes = ['All', ...new Set(roomsDummyData.map(room => room.roomType))]

    // Custom hook for filtering logic
    useRoomFilters(
        roomsDummyData,
        selectedCity,
        selectedRoomType,
        priceRange,
        searchQuery,
        sortBy,
        setFilteredRooms
    )

    // Reset all filters
    const resetFilters = () => {
        setSelectedCity('All')
        setSelectedRoomType('All')
        setPriceRange([0, 500])
        setSortBy('recommended')
        setSearchQuery('')
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Search Header Component */}
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalRooms={roomsDummyData.length}
            />

            {/* Main Content */}
            <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        {/* Filter Sidebar Component */}
                        <FilterSidebar
                            selectedCity={selectedCity}
                            setSelectedCity={setSelectedCity}
                            selectedRoomType={selectedRoomType}
                            setSelectedRoomType={setSelectedRoomType}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            roomTypes={roomTypes}
                            resetFilters={resetFilters}
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                        />

                        {/* Rooms Grid Component */}
                        <RoomsGrid
                            filteredRooms={filteredRooms}
                            sortBy={sortBy}
                            setSortBy={setSortBy} r
                            HotelCard={HotelCard}
                            resetFilters={resetFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllRooms