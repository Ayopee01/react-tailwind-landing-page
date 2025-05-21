import React from 'react'

// Import Icon Images
import icon_call from '../assets/footer/icons-call.png'
import icon_email from '../assets/footer/icons-email.png'
import icon_facebook from '../assets/footer/icons-facebook.png'
import icon_ig from '../assets/footer/icons-ig.png'
import icon_line from '../assets/footer/icons-line.png'

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white py-6 md:py-8'>
            <div className='container mx-auto px-4 text-center'>
                <p className='text-base sm:text-lg'>© This is a demo website intended for viewing purposes only.</p>
                
                {/* Main footer content container */}
                <div className='mt-6 flex flex-col items-center'>
                    
                    {/* Two column layout on medium+ screens, single column on mobile */}
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
                        
                        {/* Contact section */}
                        <div className='flex flex-col items-center'>
                            <h3 className='text-lg sm:text-xl font-medium mb-4'>Contact me</h3>
                            <div className='flex flex-col items-start space-y-3'>
                                <a className='flex items-center transition-colors duration-200 hover:text-blue-300 group' 
                                   href="tel:0632614727">
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 mr-3' src={icon_call} alt="icon-call" />
                                    <span className='group-hover:text-blue-300'>063-261-4727</span>
                                </a>
                                <a className='flex items-center transition-colors duration-200 hover:text-blue-300 group' 
                                   href="mailto:ayopee001@gmail.com">
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 mr-3' src={icon_email} alt="icon-email" />
                                    <span className='group-hover:text-blue-300'>Ayopee001@gmail.com</span>
                                </a>
                            </div>
                        </div>
                        
                        {/* Social section */}
                        <div className='flex flex-col items-center'>
                            <h3 className='text-lg sm:text-xl font-medium mb-4'>Social</h3>
                            <div className='flex flex-col items-start space-y-3'>
                                <a className='flex items-center transition-colors duration-200 hover:text-blue-300 group' 
                                   href="https://www.facebook.com/pee.ple.77/?locale=th_TH">
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 mr-3' src={icon_facebook} alt="icon-facebook" />
                                    <span className='group-hover:text-blue-300'>Pee Ple</span>
                                </a>
                                <a className='flex items-center transition-colors duration-200 hover:text-blue-300 group' 
                                   href="https://www.instagram.com/ayopee/">
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 mr-3' src={icon_ig} alt="icon-ig" />
                                    <span className='group-hover:text-blue-300'>Ayopee</span>
                                </a>
                                <a className='flex items-center transition-colors duration-200 hover:text-blue-300 group' 
                                   href="https://line.me/ti/p/inN8WR5o5u">
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 mr-3' src={icon_line} alt="icon-line" />
                                    <span className='group-hover:text-blue-300'>ID : Ayopee01</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer