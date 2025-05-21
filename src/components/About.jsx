import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// phase1
import png_dev_top from '../assets/about/phase1/dev_top.jpg'
import png_dev_1 from '../assets/about/phase1/dev1.jpg'
import png_dev_2 from '../assets/about/phase1/dev2.jpg'
import png_dev_3 from '../assets/about/phase1/dev3.jpg'
// phase2
import png_clothes_top from '../assets/about/phase2/clothes_top.jpg'
import png_clothes_1 from '../assets/about/phase2/clothes1.jpg'
import png_clothes_2 from '../assets/about/phase2/clothes2.jpg'
import png_clothes_3 from '../assets/about/phase2/clothes3.jpg'
// phase3
import png_fashion_top from '../assets/about/phase3/fashion_top.jpg'
import png_fashion_1 from '../assets/about/phase3/fashion1.jpg'
import png_fashion_2 from '../assets/about/phase3/fashion2.jpg'
import png_fashion_3 from '../assets/about/phase3/fashion3.jpg'

function About() {
    // Slideshow images for top banner
    const topBannerImages = [
        { img: png_dev_top, label: 'Development' },
        { img: png_clothes_top, label: 'Design' },
        { img: png_fashion_top, label: 'Fashion' }
    ];

    // Define the slideshow images for gallery
    const galleryImages = [
        [
            { img: png_dev_1, label: 'Development 1' },
            { img: png_dev_2, label: 'Development 2' },
            { img: png_dev_3, label: 'Development 3' }
        ],
        [
            { img: png_clothes_1, label: 'Design 1' },
            { img: png_clothes_2, label: 'Design 2' },
            { img: png_clothes_3, label: 'Design 3' }
        ],
        [
            { img: png_fashion_1, label: 'Fashion 1' },
            { img: png_fashion_2, label: 'Fashion 2' },
            { img: png_fashion_3, label: 'Fashion 3' }
        ]
    ];

    // State for active slides
    const [activeTopSlide, setActiveTopSlide] = useState(0);
    const [activeGallerySlides, setActiveGallerySlides] = useState([0, 0, 0]);
    const [autoplay, setAutoplay] = useState(true);

    // Autoplay effect for top banner
    useEffect(() => {
        let interval;
        if (autoplay) {
            interval = setInterval(() => {
                setActiveTopSlide((prev) => (prev + 1) % topBannerImages.length);
            }, 5000); // Change slide every 5 seconds
        }
        return () => clearInterval(interval);
    }, [autoplay, topBannerImages.length]);

    // Autoplay effect for gallery images
    useEffect(() => {
        let intervals = [];
        if (autoplay) {
            // Create separate intervals for each gallery image
            intervals = galleryImages.map((_, index) => {
                return setInterval(() => {
                    setActiveGallerySlides(prev => {
                        const newSlides = [...prev];
                        newSlides[index] = (newSlides[index] + 1) % galleryImages[index].length;
                        return newSlides;
                    });
                }, 4000 + index * 1000); // Stagger the intervals for more visual interest
            });
        }
        return () => intervals.forEach(interval => clearInterval(interval));
    }, [autoplay, galleryImages.length]);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };
    
    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    
    // Zoom hover effect
    const imageHover = {
        rest: { scale: 1 },
        hover: { 
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    // Slide transition variants
    const slideVariants = {
        enter: {
            opacity: 0,
            scale: 0.95
        },
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1
        },
        exit: {
            zIndex: 0,
            opacity: 0,
            scale: 1.05
        }
    };

    // Handle dot indicator click for top banner
    const handleTopDotClick = (index) => {
        setActiveTopSlide(index);
        setAutoplay(false); // Pause autoplay when manually navigating
    };

    // Handle dot indicator click for gallery images
    const handleGalleryDotClick = (galleryIndex, slideIndex) => {
        setActiveGallerySlides(prev => {
            const newSlides = [...prev];
            newSlides[galleryIndex] = slideIndex;
            return newSlides;
        });
        setAutoplay(false); // Pause autoplay when manually navigating
    };

    // Handle mouse enter/leave for autoplay control
    const handleMouseEnter = () => setAutoplay(false);
    const handleMouseLeave = () => setAutoplay(true);

    return (
        <section id='about' className='bg-gray-100'>
            <div className='container mx-auto px-10 py-10 sm:px-6 md:py-16 lg:py-20 xl:px-25'>
                {/* Top section - Image and About text */}
                <motion.div 
                    className='flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-10 lg:mb-16 2xl:gap-22'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerChildren}
                >
                    {/* Image with slideshow - Full width on mobile, height maintained on larger screens */}
                    <motion.div 
                        className="w-full lg:w-auto flex justify-center overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-3xl shadow-lg relative"
                        variants={fadeInUp}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="relative w-full lg:w-auto lg:h-96 xl:h-96">
                            <AnimatePresence initial={false}>
                                <motion.img
                                    key={activeTopSlide}
                                    className='w-full h-auto lg:h-96 xl:h-96 object-cover'
                                    src={topBannerImages[activeTopSlide].img}
                                    alt={`${topBannerImages[activeTopSlide].label} banner`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={slideVariants}
                                    transition={{
                                        opacity: { duration: 0.5 },
                                        scale: { duration: 0.5 }
                                    }}
                                />
                            </AnimatePresence>
                            
                            {/* Dot indicators for top banner */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                {topBannerImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTopDotClick(index)}
                                        className={`cursor-pointer h-3 w-3 mx-1 rounded-full transition-colors duration-300 ${
                                            activeTopSlide === index 
                                            ? 'bg-pink-500' 
                                            : 'bg-white/70 hover:bg-pink-300'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                            
                            {/* Category label */}
                            <div className="absolute bottom-4 left-4 z-10">
                                <span className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-gray-900">
                                    {topBannerImages[activeTopSlide].label}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text content - Full width on mobile, sized appropriately on larger screens */}
                    <motion.div 
                        className="w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 mt-6 lg:mt-0 flex flex-col items-center"
                        variants={fadeInUp}
                    >
                        <div className=''>
                            <motion.h2 
                                className='bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-transparent'
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { 
                                        opacity: 1, 
                                        x: 0,
                                        transition: { duration: 0.5, delay: 0.2 }
                                    }
                                }}
                            >
                                About
                            </motion.h2>
                            <motion.h2 
                                className='pl-10 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-transparent mt-0 lg:mt-2'
                                variants={{
                                    hidden: { opacity: 0, x: 20 },
                                    visible: { 
                                        opacity: 1, 
                                        x: 0,
                                        transition: { duration: 0.5, delay: 0.4 }
                                    }
                                }}
                            >
                                Website
                            </motion.h2>
                        </div>
                        <motion.p 
                            className='text-sm sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg text-gray-800 mt-3 md:mt-4 font-semibold leading-relaxed'
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { 
                                    opacity: 1,
                                    transition: { duration: 0.7, delay: 0.6 }
                                }
                            }}
                        >
                            This website was developed as a demonstration project to showcase modern web technologies and user interface functionalities through a landing page format.
                            It is intended solely for presentation purposes and does not include any backend processes or computations. The primary goal is to highlight frontend design and user experience (UX/UI), allowing users to explore the interface as a visual and interactive example.
                            The project utilizes modern frontend technologies including React for its component-based architecture, Vite for a fast and optimized development environment, and TailwindCSS for utility-first styling and responsive design.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Gallery Section with Independent Slideshows */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-8 mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerChildren}
                >
                    {/* Create three independent slideshows */}
                    {galleryImages.map((imageGroup, galleryIndex) => (
                        <motion.div 
                            key={galleryIndex}
                            variants={fadeInUp}
                            className="relative overflow-hidden rounded-xl shadow-md"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                                <AnimatePresence initial={false}>
                                    <motion.img
                                        key={activeGallerySlides[galleryIndex]}
                                        src={imageGroup[activeGallerySlides[galleryIndex]].img}
                                        alt={imageGroup[activeGallerySlides[galleryIndex]].label}
                                        className="w-full h-full object-cover"
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={slideVariants}
                                        transition={{
                                            opacity: { duration: 0.5 },
                                            scale: { duration: 0.5 }
                                        }}
                                    />
                                </AnimatePresence>
                                
                                {/* Dot indicators for each gallery image */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                    {imageGroup.map((_, slideIndex) => (
                                        <button
                                            key={slideIndex}
                                            onClick={() => handleGalleryDotClick(galleryIndex, slideIndex)}
                                            className={`cursor-pointer h-2 w-2 mx-1 rounded-full transition-colors duration-300 ${
                                                activeGallerySlides[galleryIndex] === slideIndex 
                                                ? 'bg-pink-500' 
                                                : 'bg-white/70 hover:bg-pink-300'
                                            }`}
                                            aria-label={`Gallery ${galleryIndex + 1}, slide ${slideIndex + 1}`}
                                        />
                                    ))}
                                </div>
                                
                                {/* Category label */}
                                <div className="absolute bottom-4 left-4 z-10">
                                    <span className="px-2 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-900">
                                        {galleryIndex === 0 ? 'Development' : galleryIndex === 1 ? 'Design' : 'Fashion'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default About