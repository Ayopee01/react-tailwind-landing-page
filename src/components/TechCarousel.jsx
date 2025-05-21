import React from 'react'

function TechCarousel({ techs }) {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex gap-6 px-6 md:px-0 snap-x snap-mandatory overflow-x-scroll scrollbar-hide">
        {techs.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[100px] snap-center"
          >
            {tech.link ? (
              <a href={tech.link} target="_blank" rel="noreferrer">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="size-14 p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-110 transition duration-300"
                />
              </a>
            ) : (
              <img
                src={tech.icon}
                alt={tech.name}
                className="size-14 p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-110 transition duration-300"
              />
            )}
            <p className="mt-2 text-sm">{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechCarousel
