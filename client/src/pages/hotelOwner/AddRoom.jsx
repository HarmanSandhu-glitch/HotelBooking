import React, { useState } from 'react'
import ImageUpload from '../../components/AddRoom/ImageUpload'
import BasicInformation from '../../components/AddRoom/BasicInformation'
import AmenitiesSection from '../../components/AddRoom/AmenitiesSection'

function AddRoom() {
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [inputs, setInputs] = useState({
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

        if (!inputs.city) {
            newErrors.city = 'Please select a city'
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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const selectedAmenities = Object.keys(inputs.amenities).filter(
                key => inputs.amenities[key]
            )

            const roomData = {
                ...inputs,
                amenities: selectedAmenities,
                images: Object.values(images).filter(img => img !== null)
            }

            console.log('Room Data:', roomData)
            // Handle form submission (API call)
            alert('Room added successfully!')
        }
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
                        className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'
                    >
                        Add Room
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddRoom