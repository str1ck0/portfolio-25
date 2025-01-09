import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full font-space bg-teal-500 dark:bg-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <h1 className="text-lg">© Liam Strickland 2025</h1>
          <ul className="flex gap-6 items-center">
            <li>
              <a
                href="https://github.com/str1ck0"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:text-teal-200 hover:scale-110 inline-block"
              >
                <Github size={24} />
              <span className="sr-only">Github</span>
            </a>
          </li>
          <li>
              <a
                href="https://linkedin.com/in/liam-strickland/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:text-teal-200 hover:scale-110 inline-block"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:your.email@example.com"
                className="transition-all duration-300 hover:text-teal-200 hover:scale-110 inline-block"
              >
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
