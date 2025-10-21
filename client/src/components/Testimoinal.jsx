import React, { useState } from 'react'
import { testimonials, assets } from '../assets/assets'
import Title from './Title'

function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToTestimonial = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className='py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-white'>
            <Title
                title="Guest Experiences"
                subTitle="Hear from travelers who discovered their perfect stay"
            />

            <div className='mt-20 max-w-4xl mx-auto'>
                {/* Main Testimonial Card - Minimal Design */}
                <div className='relative'>
                    {/* Testimonial Content */}
                    <div className='text-center px-4'>
                        {/* Rating Stars - Minimal */}
                        <div className='flex justify-center gap-1.5 mb-8'>
                            {[...Array(5)].map((_, index) => (
                                <svg 
                                    key={index} 
                                    className={`w-5 h-5 ${index < testimonials[currentIndex].rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        {/* Review Text - Clean Typography */}
                        <p className='text-xl md:text-2xl text-gray-800 leading-relaxed mb-12 font-light max-w-3xl mx-auto'>
                            {testimonials[currentIndex].review}
                        </p>

                        {/* User Info - Minimal & Elegant */}
                        <div className='flex flex-col items-center'>
                            <img 
                                src={testimonials[currentIndex].image} 
                                alt={testimonials[currentIndex].name}
                                className='w-16 h-16 rounded-full object-cover mb-4 ring-1 ring-gray-200'
                            />
                            <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                                {testimonials[currentIndex].name}
                            </h3>
                            <p className='text-sm text-gray-500'>{testimonials[currentIndex].address}</p>
                        </div>
                    </div>

                    {/* Navigation Arrows - Minimal */}
                    <button
                        onClick={prevTestimonial}
                        className='absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 text-gray-400 hover:text-gray-900 flex items-center justify-center transition-all duration-200'
                        aria-label="Previous testimonial"
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth={1.5}>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
                        </svg>
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className='absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 text-gray-400 hover:text-gray-900 flex items-center justify-center transition-all duration-200'
                        aria-label="Next testimonial"
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth={1.5}>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                        </svg>
                    </button>
                </div>

                {/* Dots Navigation - Minimal */}
                <div className='flex justify-center gap-2 mt-12'>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'w-8 h-2 bg-gray-900 rounded-full' 
                                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* All Testimonials Preview - Minimal Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-20'>
                    {testimonials.map((testimonial, index) => (
                        <button
                            key={testimonial.id}
                            onClick={() => goToTestimonial(index)}
                            className={`text-left p-8 rounded-xl border transition-all duration-300 hover:shadow-md ${
                                index === currentIndex 
                                    ? 'border-gray-900 bg-gray-50' 
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {/* Stars */}
                            <div className='flex gap-1 mb-4'>
                                {[...Array(5)].map((_, i) => (
                                    <svg 
                                        key={i} 
                                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Review */}
                            <p className='text-sm text-gray-700 line-clamp-3 mb-6 leading-relaxed'>
                                {testimonial.review}
                            </p>

                            {/* Author */}
                            <div className='flex items-center gap-3 pt-4 border-t border-gray-200'>
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className='w-10 h-10 rounded-full object-cover ring-1 ring-gray-200'
                                />
                                <div>
                                    <h4 className='font-medium text-gray-900 text-sm'>{testimonial.name}</h4>
                                    <p className='text-xs text-gray-500'>{testimonial.address}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonial
