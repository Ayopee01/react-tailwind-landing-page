import React from 'react'

//Components
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import CTA from './components/CTA'
import Testimonials from './components/Testimonials'
import GetInTouch from './components/GetInTouch'
import Footer from './components/Footer'
import DrakModeToggler from './components/DrakModeToggler'

function Page() {
    return (
        <>
                <Navbar />
                <DrakModeToggler />
                <Home />
                <About />
                <CTA />
                <Testimonials />
                <GetInTouch />
                <Footer />
        </>
    )
}

export default Page