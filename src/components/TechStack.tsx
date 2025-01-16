import StackIcon from 'tech-stack-icons'

const TechStack = () => {
  const technologies = [
    { name: "html5", label: "HTML" },
    { name: "css3", label: "CSS" },
    { name: "js", label: "Javascript" },
    { name: "rails", label: "Rails" },
    { name: "reactjs", label: "React" },
    { name: "nextjs2", label: "NextJS" },
    { name: "tailwindcss", label: "Tailwind" },
    { name: "typescript", label: "TypeScript" },
    { name: "sass", label: "Sass" },
    { name: "bootstrap5", label: "Bootstrap" },
    { name: "git", label: "Git" },
    { name: "github", label: "Github" },
    { name: "postgresql", label: "PostgreSQL" },
    { name: "ai", label: "Illustrator" },
    { name: "ps", label: "Photoshop" },
    { name: "id", label: "InDesign" },
    { name: "figma", label: "Figma" },
    { name: "wordpress", label: "WordPress" },
  ]


  return (
    <section className="pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-center md:text-4xl font-semibold mb-16">
          Tools in Use
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-12">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center group p-4"
            >
              <div className="relative w-12 h-12 mb-3">
                <StackIcon name={tech.name} className="filter grayscale group-hover:scale-[1.1] transition-all duration-300 ease-in-out group-hover:grayscale-0"/>
              </div>
              <p className="font-albert text-center">{tech.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
