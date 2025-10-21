import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

function ExclusiveOffers() {

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-20 bg-linear-to-b from-white to-gray-50'>
            <div className='flex flex-col md:flex-row items-center justify-between w-full'>
                <Title title="Exclusive Offers" subTitle="Limited time deals just for you! 🎉" align="left" />
                <button className="group flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 cursor-pointer max-md:mt-8 transition-all">
                    View All Offers
                    <img src={assets.arrowIcon} alt="arrowIcon" className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full'>
                {exclusiveOffers.map((item) => (
                    <div
                        key={item._id}
                        className='group relative flex flex-col items-start justify-end min-h-[400px] p-6 rounded-2xl text-white bg-no-repeat bg-cover bg-center overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2'
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                        
                        {/* Discount Badge */}
                        <div className="absolute top-5 left-5 px-4 py-2 bg-linear-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-1">
                            <span className="text-lg">🔥</span>
                            {item.priceOff}% OFF
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className='text-2xl md:text-3xl font-bold font-playfair mb-3 leading-tight'>{item.title}</h3>
                            <p className='text-sm md:text-base text-gray-200 mb-3 line-clamp-2'>{item.description}</p>
                            <div className='flex items-center gap-2 text-xs text-white/80 mb-4'>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                </svg>
                                <span>Expires {item.expiryDate}</span>
                            </div>
                            <button className='flex items-center gap-2 font-semibold text-sm bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md group-hover:shadow-lg'>
                                View Offer
                                <img className='group-hover:translate-x-1 transition-transform' src={assets.arrowIcon} alt="arrow-icon" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExclusiveOffers