import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaCalendarAlt, FaCar, FaHome, FaLightbulb, FaMoon, FaSun, FaTimes, FaUnlock, FaUser, FaUserShield } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { Bounce } from "react-awesome-reveal";
import { MdCarRental } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";

const Navbar = ({ user, handleLogout, changeDarkMode, darkMode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let temp = location.pathname;
        temp = temp.replaceAll("/", "");
        temp = temp.replaceAll("-", " ");
        temp = temp.replaceAll("_", " ");
        temp = temp || "Home";
        temp = "Car Rental Hub - " + temp  ;
        temp = temp.toCapitalize();

        document.title = temp;
    }, [location]); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`${darkMode ? "bg-[#070707] text-orange-500" : "bg-orange-700 text-white"} z-40  p-4 shadow-md sticky top-0`}>
            <div className="container mx-auto flex justify-between items-center w-10/12">
                <Link to="/" className="text-lg font-bold flex items-center space-x-2 py-4">
                    {/* <Bounce>
                        <Typewriter words={["Car Renter"]} />
                        <MdCarRental size={24}/>
                    </Bounce> */}
                    <img
                        src={darkMode ? "/logo.png" : "/logo-white.png"}
                        width={100}
                        height={100}
                        alt="Car Renter Logo" />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="text-xl xl:hidden focus:outline-none"
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <ul
                    className={`${isMenuOpen ? "block " : "hidden"} absolute xl:static top-[100%] left-0 w-full xl:w-auto  xl:flex items-center space-x-0 space-y-2 xl:space-y-0 xl:space-x-6 p-4 xl:p-0 xl:bg-transparent dark:bg-[#070707]   max-xl:text-orange-700   max-xl:bg-orange-100  `}
                >
                    <li>
                        <Link to="/" className="hover:underline flex items-center space-x-2">
                            <span><FaHome /></span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/available-cars" className="hover:underline  flex items-center space-x-2">
                            <span><FaCar /></span>
                            <span>Available Cars</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={changeDarkMode} className="hover:underline flex items-center space-x-2">
                            <span>{darkMode ? <FaSun /> : <FaMoon />}</span>
                            <span>{!darkMode ? "Dark" : "Light"} Mode</span>
                        </button>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/add-car" className="hover:underline flex items-center space-x-2">
                                    <span><GiArchiveRegister /></span>
                                    <span>Add Car</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-cars" className="hover:underline flex items-center space-x-2">
                                    <span><FaCar /></span>
                                    <span>My Cars</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-bookings" className="hover:underline flex items-center space-x-2">
                                    <span><FaCalendarAlt /></span>
                                    <span>My Bookings</span>
                                </Link>
                            </li>
                            <div className="relative group xl:block flex items-center xl:justify-center">
                                <img
                                    src={user.avatar || <FaUser />}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full cursor-pointer xl:block hidden"
                                />
                                <div className="xl:absolute xl:hidden group-hover:block xl:bg-[#131313] py-2 xl:px-8 xl:rounded xl:shadow-md w-max xl:right-0 left-0 xl:left-auto">
                                    <div className="flex items-center space-x-2 dark:text-gray-400 text-gray-700">
                                        <FaUser size={24} className="max-xl:w-[14px]" />
                                        <span>{user.name}</span>
                                    </div>
                                    <button
                                        className="xl:text-red-400 hover:underline mt-2 flex items-center space-x-2"
                                        onClick={handleLogout}
                                    >
                                        <span><FiLogOut size={24} /></span>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="hover:underline flex items-center space-x-2">
                                    <FaUserShield />
                                    <span>Login</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:underline flex items-center space-x-2">
                                    <span><HiUserAdd/></span>
                                    <span>Register</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
