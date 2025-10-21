import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

function HotelCard({ room, index }) {
    return (
        <Link to={'/rooms/' + room._id} onClick={() => window.scrollTo(0, 0)} key={room._id} className='group relative w-full rounded-2xl overflow-hidden bg-white text-gray-600 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
            <div className='relative overflow-hidden'>
                <img src={room.images[0]} alt="" className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500' />
                {index % 2 == 0 && <p className="px-4 py-2 absolute top-4 left-4 text-xs bg-blue-600 text-white font-semibold rounded-full shadow-md flex items-center gap-1">
                    <span>⭐</span> Best Seller
                </p>}
                <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1 shadow-lg'>
                    <img src={assets.starIconFilled} alt="star-icon" className='w-4 h-4' />
                    <span className='font-semibold text-gray-800'>4.5</span>
                </div>
            </div>

            <div className='p-5'>
                <h3 className='font-playfair text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>{room.hotel.name}</h3>

                <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
                    <img src={assets.locationIcon} alt="locationIcon" className='w-4 h-4' />
                    <span className='line-clamp-1'>{room.hotel.address}</span>
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                    <div>
                        <p className='text-xs text-gray-500'>Starting from</p>
                        <p className='text-2xl font-bold text-gray-900'>${room.pricePerNight}<span className='text-sm font-normal text-gray-500'>/night</span></p>
                    </div>
                    <button className='px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg'>
                        Book Now
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard