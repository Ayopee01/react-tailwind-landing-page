import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // 🔽 ฟังก์ชัน scroll และปิดเมนู
const handleNavClick = (id) => {
  const el = document.getElementById(id)
  if (el) {
    setIsOpen(false) // ปิดเมนูก่อน scroll

    setTimeout(() => {
      // 🔍 ปรับค่า yOffset ตามขนาดหน้าจอ
      const isDesktop = window.innerWidth >= 768
      const yOffset = isDesktop ? -108 : -100

      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }, 100)
  }
}

  return (
    <header className="sticky top-0 w-full bg-gray-50 shadow-md dark:bg-gray-800 transition-colors duration-300 z-20">
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-gray-800 dark:text-white">Logo</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-lg text-gray-900 dark:text-gray-100">
          <button onClick={() => handleNavClick('home')} className="cursor-pointer font-medium rounded-lg px-3 py-2 duration-500 hover:outline md:outline-offset-2 hover:text-blue-600 dark:hover:text-blue-400">Home</button>
          <button onClick={() => handleNavClick('about')} className="cursor-pointer font-medium rounded-lg px-3 py-2 duration-500 hover:outline md:outline-offset-2 hover:text-blue-600 dark:hover:text-blue-400">About</button>
          <button onClick={() => handleNavClick('product')} className="cursor-pointer font-medium rounded-lg px-3 py-2 duration-500 hover:outline md:outline-offset-2 hover:text-blue-600 dark:hover:text-blue-400">Product</button>
          <button onClick={() => handleNavClick('review')} className="cursor-pointer font-medium rounded-lg px-3 py-2 duration-500 hover:outline md:outline-offset-2 hover:text-blue-600 dark:hover:text-blue-400">Review</button>
          <button onClick={() => handleNavClick('contact')} className="cursor-pointer font-medium rounded-lg px-3 py-2 duration-500 hover:outline md:outline-offset-2 hover:text-blue-600 dark:hover:text-blue-400">Contact</button>
        </nav>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 dark:text-gray-100">
          {isOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
          <button onClick={() => handleNavClick('home')} className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500">Home</button>
          <button onClick={() => handleNavClick('about')} className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500">About</button>
          <button onClick={() => handleNavClick('product')} className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500">Product</button>
          <button onClick={() => handleNavClick('review')} className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500">Review</button>
          <button onClick={() => handleNavClick('contact')} className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500">Contact</button>
        </div>
      )}
    </header>
  )
}

export default Navbar