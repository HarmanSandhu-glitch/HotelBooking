import React, { useState, useEffect } from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from '../components/HotelCard'
import SearchHeader from '../components/SearchHeader'
import FilterSidebar from '../components/FilterSidebar'
import RoomsGrid from '../components/RoomsGrid'
import Footer from '../components/Footer'
import { useRoomFilters } from '../hooks/useRoomFilters'
import { roomAPI, hotelAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

function AllRooms() {
    // State management
    const [rooms, setRooms] = useState([])
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedCity, setSelectedCity] = useState('All')
    const [selectedRoomType, setSelectedRoomType] = useState('All')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [sortBy, setSortBy] = useState('recommended')
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [availableCities, setAvailableCities] = useState(['All'])
    const [roomTypes, setRoomTypes] = useState(['All'])

    // Fetch rooms and cities on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                
                // Fetch rooms
                const roomsResponse = await roomAPI.getAll({ isAvailable: true })
                const roomsData = roomsResponse.data || []
                setRooms(roomsData)
                
                // Fetch available cities
                try {
                    const citiesResponse = await hotelAPI.getCities()
                    const cities = citiesResponse.data || []
                    setAvailableCities(['All', ...cities])
                } catch (err) {
                    console.warn('Could not fetch cities:', err)
                }

                // Get unique room types from fetched rooms
                const types = ['All', ...new Set(roomsData.map(room => room.roomType))]
                setRoomTypes(types)
                
            } catch (err) {
                console.error('Error fetching rooms:', err)
                setError(err.message || 'Failed to load rooms')
                // Fallback to dummy data if API fails
                setRooms(roomsDummyData)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Custom hook for filtering logic
    useRoomFilters(
        rooms,
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
        setPriceRange([0, 1000])
        setSortBy('recommended')
        setSearchQuery('')
    }

    if (loading) {
        return <LoadingSpinner fullScreen />
    }

    if (error && rooms.length === 0) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <p className='text-red-500 mb-4'>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Search Header Component */}
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalRooms={rooms.length}
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
                            availableCities={availableCities}
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