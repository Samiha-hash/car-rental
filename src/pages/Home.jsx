import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade, Slide, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { HashLoader } from "react-spinners";
import CarCard from "../components/CarCard";

const Home = ({ user, highestRatedCars = [], isDarkTheme = false, fetchMostRecentCars }) => {

    const [carsLoading, setCarsLoading] = useState(true);
    const [mostRecentCarList, setMostRecentCarList] = useState([])

    useEffect(() => {
        (async () => {
            setCarsLoading(true);
            const res = await fetchMostRecentCars();
            setCarsLoading(false);
            if (res && res.length > 0) {
                setMostRecentCarList(res);
            }
        })();
    }, [fetchMostRecentCars]);


    const slideImages = [
        {
            url: "https://autovista24.autovistagroup.com/wp-content/uploads/sites/5/2022/05/d662614-1024x640.jpg",
            title: `Welcome ${user ? "back " + user.displayName : ""} to Car Rental`,
            desc: "Drive Your Dreams Today!",
            btnName: "",
            btnLink: ""
        },
        {
            url: "https://charge.cars/uploads/videos-cover/product-1.jpg",
            title: "Your Next Car Awaits You",
            desc: "",
            btnName: "View Available Cars",
            btnLink: "/available-cars"
        },
        {
            url: "https://www.paintnuts.co.uk/storage/photos/321873/Cars%20on%20production%20line.webp",
            title: "Your Ride Awaits",
            desc: "",
            btnName: "View Available Cars",
            btnLink: "/available-cars"
        },
    ];


    const testimonials = [
        { name: "Alice Johnson", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_52ohYMqFwf18gOAaAwpLdIH_Qf54wq0ybk_py8EkNjnss9KfpSo1YuQCdvpT7Rp_rwguoAsBgQ9uP03agZY0w", rating: 5, text: "Amazing service and great cars. Highly recommend!" },
        { name: "Bob Smith", image: "https://innovation.gwu.edu/sites/g/files/zaxdzs4966/files/2023-01/bobheadshotrect.jpg", rating: 4, text: "Affordable prices and smooth booking process!" },
        { name: "Clara Davis", image: "https://media.licdn.com/dms/image/v2/C5103AQGXAV2-OR0E6A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516985328996?e=2147483647&v=beta&t=n48mZ9IChQ07ZO1OUmbqu6z7IuGH3dTtjniDbOmajsk", rating: 5, text: "Loved the car options, and the service was excellent." },
    ];

    const specialOffers = [
        { title: "15% Off Weekend Rentals", description: "Book now to enjoy exclusive weekend discounts!", link: "/available-cars" },
        { title: "Luxury Cars at BDT 99/day", description: "This holiday season, drive in style for less.", link: "/available-cars" },
    ];

    return (
        <div className={`${isDarkTheme ? "bg-[#131313] text-white" : "bg-white text-black"} min-h-[100vh] w-full`}>
            <div>
                <section className="slide-container">
                    <Zoom
                        scale={3}
                        prevArrow={
                            <button
                                style={{
                                    position: "absolute",
                                    left: "20px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 10,
                                    padding: "20px",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                            >
                                <GrPrevious />
                            </button>
                        }
                        nextArrow={
                            <button
                                style={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 10,
                                    padding: "20px",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                            >
                                <GrNext />
                            </button>
                        }
                        duration={1000}
                        cssClass={"bg-black"}
                    >
                        {slideImages.map((slideImage, index) => (
                            <div key={index} className="text-center -z-10 relative">
                                <div
                                    style={{
                                        backgroundImage: `url(${slideImage.url})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        height: "400px"
                                    }}
                                >
                                    <div
                                        className={`w-full h-full flex flex-col items-center justify-center ${isDarkTheme ? "bg-[#131313] bg-opacity-75" : "bg-white bg-opacity-25 backdrop-blur-sm text-white "}`}
                                    >
                                        <div className="text-4xl font-bold animate__animated animate__bounce">{slideImage.title}</div>
                                        {slideImage.desc !== "" && (
                                            <div className="py-4">{slideImage.desc}</div>
                                        )}
                                        {slideImage.btnName !== "" && (
                                            <Link
                                                to={slideImage.btnLink}
                                                className={`${isDarkTheme ? "bg-[#2e2e2e]" : "bg-gray-500"} mt-4 text-white px-6 py-2 rounded font-semibold bg-opacity-25 backdrop-blur-[1px] hover:backdrop-blur-[5px]`}
                                            >
                                                {slideImage.btnName}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Zoom>
                </section>
                <div className="mx-auto w-10/12">






                    {/* most recent cars */}
                    <section className="my-10 mx-auto">
                        <div className="mx-4">
                            <h2 className="md:text-2xl text-xl font-semibold mb-6">Most Recent Cars</h2>
                            {carsLoading ? (
                                <HashLoader color="red" />
                            ) : mostRecentCarList.length > 0 ?
                                <div className="mb-32 grid grid-cols-1 justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-8">
                                    {mostRecentCarList.map((car) => {
                                        return (
                                            <CarCard key={car._id} car={car} className={"w-[300px] "} />
                                        )
                                    })}
                                </div> : (
                                    <p>No Most Recent Cars available.</p>
                                )
                            }
                        </div>
                    </section>



                    {/* Special Offers Section */}
                    <section className="my-10">
                        <h2 className="text-3xl font-bold mb-8 text-center">Special Offers</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {specialOffers.map((offer, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-[300px] bg-blue-100 shadow-lg p-4 rounded-lg text-center transition-transform transform hover:scale-105"
                                >
                                    <h3 className="font-bold text-lg text-blue-800">{offer.title}</h3>
                                    <p className="text-sm text-gray-600 my-2">{offer.description}</p>
                                    <Link
                                        to={offer.link}
                                        className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>



                    {/* why choose us sec */}
                    <section className="py-16 px-6">
                        <div className="mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                            <div className="md:flex block w-full justify-center items-center">
                                <div className="md:w-[50%] w-full text-justify text-lg leading-relaxed">
                                    <span className="block">
                                        Renting a car with us ensures comfort, convenience, and safety at competitive prices. Whether you're looking for a budget-friendly ride or a luxury experience, we have a variety of cars to suit your needs.
                                    </span>
                                    <ul className="list-disc list-inside my-2 text-sm font-light">
                                        <li><span className="font-bold">Wide Range</span>: Economy to Luxury Cars</li>
                                        <li><span className="font-bold">Best Rates</span>: Competitive Daily Pricing</li>
                                        <li><span className="font-bold">Quick Booking</span>: Simple Online Process</li>
                                        <li><span className="font-bold">24/7 Support</span>: Always Here to Help</li>
                                        <li><span className="font-bold">Clear Pricing</span>: No Hidden Fees</li>
                                    </ul>
                                    <span className="block">
                                        Book your next ride with us and experience the difference. We guarantee a smooth and hassle-free experience every time you rent with us.
                                    </span>
                                </div>
                                <div className="md:w-[50%] w-full overflow-hidden">
                                    <img
                                        src="https://png.pngtree.com/png-vector/20241002/ourmid/pngtree-modern-black-sports-car-silhouette-vector-illustration-on-transparent-background-for-png-image_13980107.png"
                                        alt="Car Illustration"
                                        className="mx-auto w-64 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>





                    {/* User Testimonials Section */}
                    <section className="my-10 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
                        <Slide pauseOnHover={true}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="mx-auto flex flex-col items-center max-w-3xl bg-black  bg-opacity-5 dark:bg-opacity-50 shadow-lg p-6 rounded-lg select-none">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full mb-4 object-cover"
                                    />
                                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                    <div className="flex mb-2">
                                        {Array.from({ length: testimonial.rating }, (_, i) => (
                                            <span key={i} className="text-yellow-500">★</span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600">{testimonial.text}</p>
                                </div>
                            ))}
                        </Slide>
                    </section>


                    {/* find you drems */}

                    <section className="py-12 text-center">
                        <h2 className="text-2xl font-bold mb-6">Find Your Dream Car Today!</h2>
                        <p>Explore our wide selection of cars and book your next ride now.</p>
                        <Link
                            to="/available-cars"
                            className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded font-semibold"
                        >
                            Browse Available Cars
                        </Link>
                    </section>


                </div>
            </div>
        </div>
    );
};

export default Home;
