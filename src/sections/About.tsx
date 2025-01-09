import TechStack from '@/components/TechStack'
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-teal-100/30 py-16 font-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <Image src="/images/waverock.jpg"
              alt="Logo"
              width={300}
              height={300}
              quality={100}
              className="rounded-xl"
              style={{ }}/>
        <div className="ml-4">
          <h2 className="text-4xl font-semibold mb-4">About me</h2>
          <p className="text-md font-albert mb-4">
            Over 2 years of teaching full stack web development at Le Wagon
            in Cape Town and Berlin, I've worked on dozens of Ruby on Rails
            apps and taught hundreds of students to code.
          </p>
          <p className="text-md font-albert mb-4">
            With a background in graphic design, I'm passionate about creating
            beautiful, intuitive user interfaces and seamless user experiences.
          </p>
          <p className="text-md font-albert mb-4">
            I'm looking for my next opportunity to grow my skills as a developer
            by joining a forward thinking team and working on meaningful projects.
          </p>
        </div>
      </div>
      <TechStack />
    </section>
  )
}

export default About
