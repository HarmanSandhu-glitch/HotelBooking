import { useEffect } from 'react'

export function useRoomFilters(
    roomsDummyData,
    selectedCity,
    selectedRoomType,
    priceRange,
    searchQuery,
    sortBy,
    setFilteredRooms
) {
    useEffect(() => {
        let filtered = [...roomsDummyData]

        // Filter by city
        if (selectedCity !== 'All') {
            filtered = filtered.filter(room => room.hotel.city === selectedCity)
        }

        // Filter by room type
        if (selectedRoomType !== 'All') {
            filtered = filtered.filter(room => room.roomType === selectedRoomType)
        }

        // Filter by price range
        filtered = filtered.filter(room => 
            room.pricePerNight >= priceRange[0] && room.pricePerNight <= priceRange[1]
        )

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(room => 
                room.hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                room.hotel.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                room.hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Sort rooms
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.pricePerNight - b.pricePerNight)
                break
            case 'price-high':
                filtered.sort((a, b) => b.pricePerNight - a.pricePerNight)
                break
            case 'name':
                filtered.sort((a, b) => a.hotel.name.localeCompare(b.hotel.name))
                break
            default:
                // recommended - keep original order
                break
        }

        setFilteredRooms(filtered)
    }, [roomsDummyData, selectedCity, selectedRoomType, priceRange, sortBy, searchQuery, setFilteredRooms])
}
