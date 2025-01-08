'use client'
import { useActiveSection } from '@/hooks/useActiveSection'

const NavLink = ({ href, children }) => {
  const sectionId = href.replace('#', '');
  const activeSection = useActiveSection();

  const handleClick = (event) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
      `}    >
      {children}
    </a>
  );
};

export default NavLink;
