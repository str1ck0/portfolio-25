import TechStack from '@/components/TechStack'
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="min-h-screen py-8 md:py-16 font-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container for image and content - stack on mobile, side by side on larger screens */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
          {/* Image container */}
          <div className="w-full md:w-1/3 relative aspect-square">
            <Image
              src="/images/waverock.jpg"
              alt="Logo"
              fill
              quality={100}
              className="rounded-xl object-cover"
              priority
            />
          </div>

          {/* Content container */}
          <div className="flex-1">
            <h2 className="text-3xl text-center md:text-left md:text-4xl font-semibold mt-4 md:mt-0 mb-6">
              About me
            </h2>

            {/* Text content with responsive spacing */}
            <div className="space-y-8">
              <p className="text-md md:text-lg font-albert">
                Since 2022 I've been leading projects and teaching people how to code at
                <a
                  href="https://www.lewagon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-red-600 font-semibold transition-all duration-300 ease-in-out mx-1"
                >
                  Le Wagon
                </a>
                in Cape Town and Berlin. I've led dozens of student teams building full stack Ruby on Rails web apps.
              </p>

              <p className="text-md md:text-lg font-albert">
                A jack of all trades, I combine my skills in digital design and
                full stack web development to create beautiful, functional websites and apps.

              </p>

              <p className="text-md md:text-lg font-albert">
                I'm always on the hunt for my next opportunity to work with talented people
                on creative and meaningful projects. Let's team up!
              </p>
            </div>

            {/* CTA Button with responsive positioning */}
            <div className="mt-12 md:mt-12 flex justify-center md:justify-start">
              <a
                href="mailto:liam.strickland96@gmail.com"
                className="inline-block text-gray-900 dark:text-gray-100 px-6 py-2 text-lg md:text-xl
                         rounded-full border-2 border-teal-500 hover:text-white hover:bg-teal-500
                         transition-all duration-300 ease-in-out"
              >
                Let's chat
              </a>
            </div>
          </div>
        </div>

        {/* TechStack component */}
        <div className="mt-12 md:mt-16">
          <TechStack />
        </div>
      </div>
    </section>
  )
}

export default About
