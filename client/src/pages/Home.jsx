import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimoinal'
import Newsletter from '../components/NewLetter'
import Footer from '../components/Footer'

function Home() {
    return (
        <div className='w-full overflow-hidden'>
            <Hero />
            <FeaturedDestination />
            <ExclusiveOffers />
            <Testimonial />
            <Newsletter />
        </div>
    )
}

export default Home