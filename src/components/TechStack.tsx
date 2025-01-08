import StackIcon from 'tech-stack-icons'

const TechStack = () => {
  const technologies = [
    { name: "rails", label: "Rails" },
    { name: "tailwindcss", label: "Tailwind CSS" },
    { name: "typescript", label: "TypeScript" },
    { name: "reactjs", label: "React" },
    { name: "sass", label: "Sass" },
    { name: "bootstrap5", label: "Bootstrap" },
  ]

  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center group"
            >
              <div className="relative w-16 h-16 mb-2">
                <StackIcon name={tech.name} className="filter grayscale hover:scale-[1.2] transition-all duration-300 ease-in-out group-hover:grayscale-0"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
