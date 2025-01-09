'use-client'

import ThemeToggle from "@/components/ThemeToggle"
import NavLink from "@/components/NavLink"
import Image from "next/image";
import Link from 'next/link'


const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100  backdrop-blur-sm z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="inline-block">
            <div className="flex items-center flex-shrink-0">
              <Image src="/images/logo.png" alt="Logo" width={30} height={30} unoptimized={true} quality={100} loading="eager" placeholder="empty" />
              <span className="text-3xl ml-4 font-space font-bold">liam strickland</span>
            </div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8 font-space">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
