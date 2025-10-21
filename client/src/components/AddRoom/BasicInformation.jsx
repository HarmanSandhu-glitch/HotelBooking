import React from 'react'
import { cities } from '../../assets/assets'

function BasicInformation({ inputs, errors, onChange }) {
    return (
        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
            <h2 className='text-xl font-bold text-gray-900 mb-6'>Basic Information</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Room Type */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Room Type <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        name='roomType'
                        value={inputs.roomType}
                        onChange={onChange}
                        placeholder='e.g., Deluxe Suite, Ocean View'
                        className={`w-full px-4 py-3 border ${errors.roomType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.roomType && <p className='text-red-500 text-xs mt-1'>{errors.roomType}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Price per Night ($) <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='number'
                        name='pricePerNight'
                        value={inputs.pricePerNight}
                        onChange={onChange}
                        min='0'
                        placeholder='0'
                        className={`w-full px-4 py-3 border ${errors.pricePerNight ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.pricePerNight && <p className='text-red-500 text-xs mt-1'>{errors.pricePerNight}</p>}
                </div>

                {/* Max Guests */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Max Guests <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='number'
                        name='maxGuests'
                        value={inputs.maxGuests}
                        onChange={onChange}
                        min='1'
                        placeholder='0'
                        className={`w-full px-4 py-3 border ${errors.maxGuests ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.maxGuests && <p className='text-red-500 text-xs mt-1'>{errors.maxGuests}</p>}
                </div>

                {/* Bedrooms */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Bedrooms <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='number'
                        name='bedrooms'
                        value={inputs.bedrooms}
                        onChange={onChange}
                        min='1'
                        placeholder='0'
                        className={`w-full px-4 py-3 border ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.bedrooms && <p className='text-red-500 text-xs mt-1'>{errors.bedrooms}</p>}
                </div>

                {/* Bathrooms */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Bathrooms <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='number'
                        name='bathrooms'
                        value={inputs.bathrooms}
                        onChange={onChange}
                        min='1'
                        placeholder='0'
                        className={`w-full px-4 py-3 border ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.bathrooms && <p className='text-red-500 text-xs mt-1'>{errors.bathrooms}</p>}
                </div>

                {/* City */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        City <span className='text-red-500'>*</span>
                    </label>
                    <select
                        name='city'
                        value={inputs.city}
                        onChange={onChange}
                        className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white`}
                    >
                        <option value=''>Select a city</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.city && <p className='text-red-500 text-xs mt-1'>{errors.city}</p>}
                </div>
            </div>

            {/* Description */}
            <div className='mt-6'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                    name='description'
                    value={inputs.description}
                    onChange={onChange}
                    rows='4'
                    placeholder='Describe your room...'
                    className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                />
                {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description}</p>}
            </div>
        </div>
    )
}

export default BasicInformation
