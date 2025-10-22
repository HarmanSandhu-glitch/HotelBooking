import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import ImageUpload from '../../components/AddRoom/ImageUpload'
import BasicInformation from '../../components/AddRoom/BasicInformation'
import AmenitiesSection from '../../components/AddRoom/AmenitiesSection'
import { roomAPI, hotelAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'

function AddRoom() {
    const { getToken } = useAuth()
    const [myHotels, setMyHotels] = useState([])
    const [loadingHotels, setLoadingHotels] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [inputs, setInputs] = useState({
        hotel: '',
        roomType: '',
        pricePerNight: '',
        maxGuests: '',
        bedrooms: '',
        bathrooms: '',
        city: '',
        description: '',
        amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false
        }
    })

    const [errors, setErrors] = useState({})

    // Fetch owner's hotels
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const token = await getToken()
                const response = await hotelAPI.getMyHotels(token)
                setMyHotels(response.data || [])
            } catch (error) {
                console.error('Error fetching hotels:', error)
            } finally {
                setLoadingHotels(false)
            }
        }
        fetchHotels()
    }, [getToken])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleAmenityChange = (amenity) => {
        setInputs(prev => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                [amenity]: !prev.amenities[amenity]
            }
        }))
    }

    const handleAddCustomAmenity = (amenityName) => {
        if (!inputs.amenities.hasOwnProperty(amenityName)) {
            setInputs(prev => ({
                ...prev,
                amenities: {
                    ...prev.amenities,
                    [amenityName]: true
                }
            }))
        }
    }

    const handleRemoveAmenity = (amenityName) => {
        const defaultAmenities = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access']

        // Don't allow removing default amenities
        if (defaultAmenities.includes(amenityName)) {
            return
        }

        setInputs(prev => {
            const newAmenities = { ...prev.amenities }
            delete newAmenities[amenityName]
            return {
                ...prev,
                amenities: newAmenities
            }
        })
    }

    const handleImageChange = (position, e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Image size should be less than 5MB')
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setImages(prev => ({
                    ...prev,
                    [position]: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = (position) => {
        setImages(prev => ({
            ...prev,
            [position]: null
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!inputs.hotel) {
            newErrors.hotel = 'Please select a hotel'
        }

        if (!inputs.roomType.trim()) {
            newErrors.roomType = 'Room type is required'
        }

        if (!inputs.pricePerNight || inputs.pricePerNight <= 0) {
            newErrors.pricePerNight = 'Please enter a valid price'
        }

        if (!inputs.maxGuests || inputs.maxGuests <= 0) {
            newErrors.maxGuests = 'Please enter number of guests'
        }

        if (!inputs.bedrooms || inputs.bedrooms <= 0) {
            newErrors.bedrooms = 'Please enter number of bedrooms'
        }

        if (!inputs.bathrooms || inputs.bathrooms <= 0) {
            newErrors.bathrooms = 'Please enter number of bathrooms'
        }

        if (!inputs.description.trim()) {
            newErrors.description = 'Description is required'
        }

        const uploadedImages = Object.values(images).filter(img => img !== null)
        if (uploadedImages.length === 0) {
            newErrors.images = 'Please upload at least one image'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitting(true)
            try {
                const token = await getToken()
                
                // Prepare selected amenities
                const selectedAmenities = Object.keys(inputs.amenities).filter(
                    key => inputs.amenities[key]
                )

                // Create FormData for multipart/form-data
                const formData = new FormData()
                formData.append('hotel', inputs.hotel)
                formData.append('roomType', inputs.roomType)
                formData.append('pricePerNight', inputs.pricePerNight)
                formData.append('maxGuests', inputs.maxGuests)
                formData.append('bedrooms', inputs.bedrooms)
                formData.append('bathrooms', inputs.bathrooms)
                formData.append('description', inputs.description)
                formData.append('amenities', JSON.stringify(selectedAmenities))

                // Add images to formData
                const imageFiles = Object.values(images).filter(img => img !== null)
                for (let i = 0; i < imageFiles.length; i++) {
                    // Convert base64 to file
                    const response = await fetch(imageFiles[i])
                    const blob = await response.blob()
                    const file = new File([blob], `room_${i}.jpg`, { type: 'image/jpeg' })
                    formData.append('images', file)
                }

                await roomAPI.add(token, formData)
                alert('Room added successfully!')
                
                // Reset form
                setImages({ 1: null, 2: null, 3: null, 4: null })
                setInputs({
                    hotel: '',
                    roomType: '',
                    pricePerNight: '',
                    maxGuests: '',
                    bedrooms: '',
                    bathrooms: '',
                    description: '',
                    amenities: {
                        'Free WiFi': false,
                        'Free Breakfast': false,
                        'Room Service': false,
                        'Mountain View': false,
                        'Pool Access': false
                    }
                })
            } catch (error) {
                console.error('Error adding room:', error)
                alert(error.message || 'Failed to add room. Please try again.')
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    if (loadingHotels) {
        return <LoadingSpinner fullScreen />
    }

    if (myHotels.length === 0) {
        return (
            <div className='p-8 max-w-6xl mx-auto'>
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center'>
                    <h2 className='text-xl font-bold text-gray-900 mb-2'>No Hotels Found</h2>
                    <p className='text-gray-600 mb-4'>You need to register a hotel before adding rooms.</p>
                    <button className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                        Register Hotel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='p-8 max-w-6xl mx-auto'>
            {/* Page Header */}
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Add New Room</h1>
                <p className='text-gray-600'>Fill in the details to list a new property</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Image Upload Section */}
                <ImageUpload
                    images={images}
                    onImageChange={handleImageChange}
                    onRemoveImage={removeImage}
                    error={errors.images}
                />

                {/* Basic Information */}
                <BasicInformation
                    inputs={inputs}
                    errors={errors}
                    onChange={handleInputChange}
                    hotels={myHotels}
                />

                {/* Amenities */}
                <AmenitiesSection
                    amenities={inputs.amenities}
                    onAmenityChange={handleAmenityChange}
                    onAddCustomAmenity={handleAddCustomAmenity}
                    onRemoveAmenity={handleRemoveAmenity}
                />

                {/* Submit Buttons */}
                <div className='flex gap-4'>
                    <button
                        type='button'
                        disabled={isSubmitting}
                        className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {isSubmitting ? (
                            <>
                                <LoadingSpinner size="sm" />
                                Adding Room...
                            </>
                        ) : (
                            'Add Room'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddRoom