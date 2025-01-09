import React from 'react';
import Image from "next/image";
import ProjectCard from '@/components/ProjectCard';


const Projects = () => {
  const projects = [
    {
      title: "Circles",
      subtitle: "Ruby on Rails • Bootstrap • Heroku",
      description: "A full stack Ruby on Rails web app, Circles is an event-centric social media platform that makes planning events with your friends easy.",
      imageUrl: "/images/projects/circles_home.png"
    },
    {
      title: "Tempo Libero",
      subtitle: "React • Node.js • MongoDB",
      description: "A brief description of the first project and its key features. This showcases the main accomplishments and technologies used.",
      imageUrl: "/images/projects/foolish-1.png"
    },
    {
      title: "Gold Cloud",
      subtitle: "Ruby on Rails • Bootstrap • Heroku",
      description: "Feature-rich store custom built for a premium medical cannabis supplier in Johannesburg",
      imageUrl: "/images/projects/goldcloud-1.png"
    },
    {
      title: "Garden Elegance",
      subtitle: "Wordpress • Elementor • WooCommerce",
      description: "Website design and WooCommerce online store integration for Perth retail garden centre.",
      imageUrl: "/images/projects/grain.png"
    }
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl text-center font-bold mb-16 font-space dark:text-gray-100">Projects</h2>
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
