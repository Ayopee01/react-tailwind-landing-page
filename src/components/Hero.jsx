import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// import Icon Image
import icon_react from '../assets/hero/icon/icon-react.png'
import icon_vite from '../assets/hero/icon/icon-vite.png'
import icon_tailwind from '../assets/hero/icon/icon-tailwind.svg'

// technologies data
const techs = [
  { name: 'React', icon: icon_react, link: 'https://react.dev/'  },
  { name: 'Vite', icon: icon_vite, link: 'https://vite.dev/'  },
  { name: 'TailwindCSS', icon: icon_tailwind, link: 'https://tailwindcss.com/' },
]

function Hero() {
  // Animation variants for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="bg-[url(assets/hero/LineDrawingcover_web.jpg)] bg-cover bg-center text-gray-100 h-screen relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col text-center items-center justify-center h-full px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold italic drop-shadow mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome To My Website
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          This website was developed using the following technologies.
        </motion.p>

        {/* Technology Icons with Motion */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-4 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {techs.map((tech, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              {tech.link ? (
                <a 
                  href={tech.link} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label={`Link to ${tech.name}`}
                >
                  <motion.img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-16 h-16 p-1 rounded-full bg-white shadow-md transition duration-300 cursor-pointer"
                    whileHover={{ rotate: 15 }}
                  />
                </a>
              ) : (
                <motion.img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-16 h-16 p-1 rounded-full bg-white shadow-md transition duration-300"
                  whileHover={{ rotate: 15 }}
                />
              )}
              <p className="mt-3 text-lg font-medium">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Link
            to="/Page"
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 inline-block font-medium"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero