'use client'

import { useActiveSection } from '@/hooks/useActiveSection'
import { ReactNode, MouseEvent } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

const NavLink = ({ href, children, className = '', onClick }: NavLinkProps) => {
  const sectionId = href.replace('#', '')
  const activeSection = useActiveSection()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    onClick?.() // Call onClick if provided (for mobile menu closing)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`
        relative text-xl w-fit block
        ${activeSection === sectionId ? 'text-teal-500' : 'text-gray-900 dark:text-gray-100'}
        after:block after:content-['']
        after:absolute after:h-[2px]
        after:bg-teal-500 after:w-full
        ${activeSection === sectionId
          ? 'after:scale-x-100'
          : 'after:scale-x-0 after:hover:scale-x-100'
        }
        after:mt-0.5
        after:transition-all after:duration-300
        after:origin-left after:ease-in-out
        ${className}
      `}
    >
      {children}
    </a>
  )
}

export default NavLink
