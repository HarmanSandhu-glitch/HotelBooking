import React from 'react'

function ImageUpload({ images, onImageChange, onRemoveImage, error }) {
    return (
        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
            <h2 className='text-xl font-bold text-gray-900 mb-4'>Room Images</h2>
            <p className='text-sm text-gray-600 mb-4'>Upload up to 4 images (Max 5MB each)</p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {[1, 2, 3, 4].map(position => (
                    <div key={position} className='relative'>
                        {images[position] ? (
                            <div className='relative aspect-square rounded-lg overflow-hidden group'>
                                <img
                                    src={images[position]}
                                    alt={`Room ${position}`}
                                    className='w-full h-full object-cover'
                                />
                                <button
                                    type='button'
                                    onClick={() => onRemoveImage(position)}
                                    className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                                >
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <label className='flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all'>
                                <svg className='w-8 h-8 text-gray-400 mb-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                                </svg>
                                <span className='text-sm text-gray-500'>Upload Image</span>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => onImageChange(position, e)}
                                    className='hidden'
                                />
                            </label>
                        )}
                    </div>
                ))}
            </div>
            {error && (
                <p className='text-red-500 text-sm mt-2 flex items-center'>
                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    )
}

export default ImageUpload
