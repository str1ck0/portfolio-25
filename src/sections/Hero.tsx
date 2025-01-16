'use client';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center font-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold">
          G&apos;day, I&apos;m <span className="text-teal-500">Liam</span>
        </h1>
        <p className="mt-6 md:mt-8 text-2xl font-albert text-gray-600 dark:text-gray-400">
          I&apos;m a freelance web designer & full stack developer.
        </p>
        <button
          onClick={() => {
          const element = document.getElementById('projects');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          }}
          className="text-gray-900 dark:text-gray-100 mt-8 px-6 text-xl py-2 rounded-full border-2 border-teal-500 hover:text-white hover:bg-teal-500 transition-all duration-300 ease-in-out"
          >
            View My Work
        </button>
      </div>
    </section>
  )
}

export default Hero
