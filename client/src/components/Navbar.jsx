import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets"
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

function Navbar() {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    const BookIcon = () => (
        <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
        </svg>
    )
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const ref = React.useRef(null)
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Scrolled by default on non-home routes, scroll-based on home
    React.useEffect(() => {
        if (location.pathname === '/') {
            const handleScroll = () => setIsScrolled(window.scrollY > 10);
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // set initial state
            return () => window.removeEventListener('scroll', handleScroll);
        } else {
            setIsScrolled(true);
        }
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/95 shadow-lg text-gray-700 backdrop-blur-lg py-3 md:py-4" : "bg-transparent py-4 md:py-6"}`}>
            {/* Logo */}
            <Link to="/">
                <img src={assets.logo} alt="" className={`h-9 ${isScrolled && "invert opacity-90"}`} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} className={`group flex flex-col gap-0.5 font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-blue-600" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </a>
                ))}

                {user && <button onClick={() => navigate("/owner")} className={`border-2 px-5 py-2 text-sm font-medium rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ${isScrolled ? 'text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600' : 'text-white border-white hover:bg-white hover:text-gray-900'}`}>
                    Dashboard
                </button>}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                <img src={assets.searchIcon} alt="" className={`${isScrolled && "invert"} h-6 transition duration-500 cursor-pointer hover:scale-110`} />
                {user ?
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My bookings' labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>)
                    : (<button onClick={openSignIn} className={`px-8 py-2.5 rounded-full ml-4 font-semibold transition-all duration-500 hover:scale-105 shadow-lg ${isScrolled ? "text-white bg-blue-600 hover:bg-blue-700" : "bg-white text-gray-900 hover:bg-gray-100"}`}>
                        Login
                    </button>)
                }
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                {user ?
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My bookings' labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>)
                    :
                    <button onClick={openSignIn} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full transition-all duration-300 font-semibold shadow-lg">
                        Login
                    </button>
                }
                <img src={assets.menuIcon} alt="" className={`${isScrolled && "invert"} h-4`} onClick={() => setIsMenuOpen((state) => !state)} />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-8 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-6 right-6 hover:scale-110 transition-transform" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close menu" className={`h-7`} />
                </button>

                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)} className="text-lg hover:text-blue-600 transition-colors">
                        {link.name}
                    </a>
                ))}

                {user && <button onClick={() => navigate("/owner")} className="border-2 border-gray-300 px-6 py-2 text-sm font-medium rounded-full cursor-pointer hover:border-blue-600 hover:text-blue-600 transition-all">
                    Dashboard
                </button>}
            </div>
        </nav>
    );
}

export default Navbar
