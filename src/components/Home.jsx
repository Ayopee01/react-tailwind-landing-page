import React, { useEffect, useState } from 'react'
import png1 from '../assets/home/dev1.avif'
import png2 from '../assets/home/dev2.jpg'
import png3 from '../assets/home/dev3.jpg'

function Home() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section id='home' className='bg-gray-100 dark:bg-gray-800 overflow-hidden'>
            <div className='container mx-auto px-10 py-8 sm:py-10 md:py-12 sm:px-6 md:px-8 lg:px-6 xl:px-25'>
                {/* Main content container - switch to column on mobile, row on larger screens */}
                <div className='flex flex-col lg:flex-row justify-center items-stretch gap-4 sm:gap-6 lg:gap-8 max-h-[440px]'>

                    {/* Large main image - full width on mobile, proportional on larger screens */}
                    <div className={`relative rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl w-full lg:w-2/3 min-h-[180px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[340px] max-h-[440px] transform transition-all duration-1000${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                        <img
                            src={png1}
                            alt="Main background"
                            className={`absolute inset-0 w-full h-full object-cover rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-all duration-1000${isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-md'}`}
                        />
                        <div className='relative flex items-start h-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'>
                            <div className="flex flex-col gap-y-1 sm:gap-y-2 md:gap-y-3">
                                <h2 className={`text-white font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Welcome</h2>
                                <h2 className={`text-white font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform transition-all duration-700 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>To My</h2>
                                <h2 className={`text-white font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform transition-all duration-700 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Website</h2>
                            </div>
                        </div>
                    </div>

                    {/* Right column with two images - side by side on mobile, stacked on larger screens */}
                    <div className={`w-full lg:w-1/3 flex flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-8 mt-4 lg:mt-0 max-h-[440px] transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                        <div className="w-1/2 lg:w-full h-20 sm:h-28 md:h-32 lg:h-40 xl:h-48 max-h-[216px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl">
                            <img
                                className={`w-full h-full object-cover transform transition-all duration-700 cursor-pointer hover:scale-110`}
                                src={png2}
                                alt="Image 1"
                            />
                        </div>
                        <div className="w-1/2 lg:w-full h-20 sm:h-28 md:h-32 lg:h-40 xl:h-48 max-h-[216px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl">
                            <img
                                className={`w-full h-full object-cover transform transition-all duration-700 cursor-pointer hover:scale-110`}
                                src={png3}
                                alt="Image 2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home