import React from 'react'
import { roomCommonData } from '../../assets/assets'

function AboutRoom() {
    return (
        <div className='bg-white rounded-2xl border border-gray-200 p-6 mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4 font-playfair'>
                About This Room
            </h2>
            <p className='text-gray-700 leading-relaxed mb-6'>
                Experience luxury and comfort in this beautifully designed room. Featuring modern amenities 
                and elegant décor, this space is perfect for both business and leisure travelers. Enjoy 
                stunning views, premium bedding, and a spacious layout that makes you feel right at home.
            </p>

            {/* Room Features Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {roomCommonData.map((item, index) => (
                    <div key={index} className='flex gap-4'>
                        <div className='shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
                            <img src={item.icon} alt={item.title} className='w-6 h-6' />
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900 mb-1'>{item.title}</h3>
                            <p className='text-sm text-gray-600'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutRoom
