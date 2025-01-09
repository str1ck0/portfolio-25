import React from 'react';
import ProjectCard from '@/components/ProjectCard';


const Projects = () => {
  const projects = [
    {
      title: "Circles",
      subtitle: "Ruby on Rails • Bootstrap • Heroku",
      description: "A full stack Ruby on Rails web app, Circles is an event-centric social media platform that makes planning events with your friends easy.",
      images: [
        {
          url: "/images/projects/circles_home.png",
          alt: "Circles project"
        },
        {
          url: "/images/projects/circles_event.png",
          alt: "Circles project"
        },
      ]
    },
    {
      title: "Tempo Libero",
      subtitle: "React • Node.js • MongoDB",
      description: "A brief description of the first project and its key features. This showcases the main accomplishments and technologies used.",
      images: [
        {
          url: "/images/projects/foolish-1.png",
          alt: "Tempo project"
        },
      ]
    },
    {
      title: "Gold Cloud",
      subtitle: "Ruby on Rails • Bootstrap • Heroku",
      description: "Feature-rich store custom built for a premium medical cannabis supplier in Johannesburg",
      images: [
        {
          url: "/images/projects/goldcloud-1.png",
          alt: "Gold Cloud Project"
        },
      ]
    },
    {
      title: "Garden Elegance",
      subtitle: "Wordpress • Elementor • WooCommerce",
      description: "Website design and WooCommerce online store integration for Perth retail garden centre.",
      imageUrl: "/images/projects/grain.png",
      images: [
        {
          url: "/images/projects/grain.png",
          alt: "Garden Elegance Project"
        },
      ]
    }
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl text-center font-bold mb-16 font-space dark:text-gray-100">
        Projects
      </h2>

      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
