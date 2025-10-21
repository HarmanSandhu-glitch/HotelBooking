import React, { useState } from 'react'

function ImageGallery({ images, hotelName }) {
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className='relative'>
            {/* Main Image */}
            <div className='relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gray-100'>
                <img 
                    src={images[currentImage]} 
                    alt={`${hotelName} - Image ${currentImage + 1}`}
                    className='w-full h-full object-cover'
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className='absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all'
                        >
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className='absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all'
                        >
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image Counter */}
                <div className='absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium'>
                    {currentImage + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className='grid grid-cols-4 gap-4 mt-4'>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                                currentImage === index 
                                    ? 'ring-2 ring-blue-600 opacity-100' 
                                    : 'opacity-60 hover:opacity-100'
                            }`}
                        >
                            <img 
                                src={image} 
                                alt={`Thumbnail ${index + 1}`}
                                className='w-full h-full object-cover'
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageGallery
