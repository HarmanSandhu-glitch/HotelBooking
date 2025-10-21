import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='bg-gray-900 text-gray-300 pt-16 pb-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
                {/* Brand Section */}
                <div>
                    <img src={assets.logo} alt="HotelButler Logo" className='h-10 mb-4' />
                    <p className='text-sm text-gray-400 leading-relaxed mb-4'>
                        Discover luxury accommodations and unforgettable experiences at the world's finest hotels and resorts.
                    </p>
                    <div className='flex gap-4'>
                        <a href="#" className='w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300'>
                            <img src={assets.facebookIcon} alt="Facebook" className='w-5 h-5' />
                        </a>
                        <a href="#" className='w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300'>
                            <img src={assets.instagramIcon} alt="Instagram" className='w-5 h-5' />
                        </a>
                        <a href="#" className='w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300'>
                            <img src={assets.twitterIcon} alt="Twitter" className='w-5 h-5' />
                        </a>
                        <a href="#" className='w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300'>
                            <img src={assets.linkendinIcon} alt="LinkedIn" className='w-5 h-5' />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className='text-white font-semibold text-lg mb-4'>Quick Links</h3>
                    <ul className='space-y-3 text-sm'>
                        <li><Link to="/" className='hover:text-blue-400 transition-colors'>Home</Link></li>
                        <li><Link to="/rooms" className='hover:text-blue-400 transition-colors'>Hotels</Link></li>
                        <li><Link to="/about" className='hover:text-blue-400 transition-colors'>About Us</Link></li>
                        <li><Link to="/contact" className='hover:text-blue-400 transition-colors'>Contact</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className='text-white font-semibold text-lg mb-4'>Support</h3>
                    <ul className='space-y-3 text-sm'>
                        <li><a href="#" className='hover:text-blue-400 transition-colors'>Help Center</a></li>
                        <li><a href="#" className='hover:text-blue-400 transition-colors'>Terms of Service</a></li>
                        <li><a href="#" className='hover:text-blue-400 transition-colors'>Privacy Policy</a></li>
                        <li><a href="#" className='hover:text-blue-400 transition-colors'>FAQ</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className='text-white font-semibold text-lg mb-4'>Newsletter</h3>
                    <p className='text-sm text-gray-400 mb-4'>Subscribe to get special offers and updates</p>
                    <div className='flex gap-2'>
                        <input 
                            type="email" 
                            placeholder="Your email" 
                            className='flex-1 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:border-blue-600 focus:outline-none text-sm'
                        />
                        <button className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-sm transition-all shadow-lg'>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500'>
                <p>© 2025 HotelButler. All rights reserved.</p>
                <div className='flex gap-6'>
                    <a href="#" className='hover:text-blue-400 transition-colors'>Terms</a>
                    <a href="#" className='hover:text-blue-400 transition-colors'>Privacy</a>
                    <a href="#" className='hover:text-blue-400 transition-colors'>Cookies</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
