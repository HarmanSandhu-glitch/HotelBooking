import { assets, cities } from "../assets/assets"

function Hero() {
    return (
        <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-3xl">
                <p className="bg-blue-500/80 backdrop-blur-sm px-4 py-2 rounded-full mt-20 inline-block text-sm font-medium mb-4 shadow-lg">
                    ✨ The Ultimate Hotel Experience
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-playfair">
                    Discover Your Perfect Gateway Destination
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
                    Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
                </p>
            </div>

            <form className='mt-8 relative z-10 bg-white/95 backdrop-blur-md text-gray-700 rounded-2xl px-6 py-6 shadow-2xl flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto border border-gray-200 items-end'>


                <div className="flex-1 min-w-[160px]">
                    <div className='flex items-center gap-2 mb-2'>
                        <img src={assets.locationIcon} alt="" className="h-4" />
                        <label htmlFor="destinationInput" className="text-sm font-semibold">Destination</label>
                    </div>
                    <input
                        list='destinations'
                        id="destinationInput"
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Where to?"
                        required
                    />
                    <datalist id="destinations">
                        {cities.map((city, index) => (
                            <option value={city} key={index} />
                        ))}
                    </datalist>
                </div>


                <div className="flex-1 min-w-[160px]">
                    <div className='flex items-center gap-2 mb-2'>
                        <img src={assets.calenderIcon} alt="" className="h-4" />
                        <label htmlFor="checkIn" className="text-sm font-semibold">Check in</label>
                    </div>
                    <input
                        id="checkIn"
                        type="date"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                </div>


                <div className="flex-1 min-w-[160px]">
                    <div className='flex items-center gap-2 mb-2'>
                        <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                        </svg>
                        <label htmlFor="checkOut" className="text-sm font-semibold">Check out</label>
                    </div>
                    <input
                        id="checkOut"
                        type="date"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                </div>


                <div className='flex-1 min-w-[120px]'>
                    <label htmlFor="guests" className="text-sm font-semibold mb-2 block">Guests</label>
                    <input
                        min={1}
                        max={10}
                        id="guests"
                        type="number"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="1"
                        defaultValue={1}
                    />
                </div>

                <button className='flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 px-6 text-white font-semibold my-auto cursor-pointer max-md:w-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' >
                    <img src={assets.searchIcon} alt="search-icon" className="h-5 invert" />
                    <span>Search Hotels</span>
                </button>

            </form>
        </div>
    )
}

export default Hero 