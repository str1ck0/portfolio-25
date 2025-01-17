'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from "@/components/ThemeToggle"
import NavLink from "@/components/NavLink"
import Image from "next/image"
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="inline-block">
            <div className="flex items-center flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={30}
                height={30}
                unoptimized={true}
                quality={100}
                loading="eager"
                placeholder="empty"
              />
              <span className="text-3xl ml-4 font-space font-bold">liam strickland</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8 font-space">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed right-0 top-16 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            border-l border-gray-200 dark:border-gray-700 h-screen
          `}
        >
          <div className="flex flex-col space-y-4 font-space p-6">
            <NavLink
              href="#about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              href="#projects"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </NavLink>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Backdrop overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar
