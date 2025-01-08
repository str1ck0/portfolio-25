import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Circles",
      subtitle: "Ruby on Rails • Bootstrap • Heroku",
      description: "Circles is a full-stack Ruby on Rails web app, event-centric social media platform that makes planning events with your friends easy.",
      imageUrl: "/images/projects/circles_home.png"
    },
    {
      title: "tempo libero",
      subtitle: "React • Node.js • MongoDB",
      description: "A brief description of the first project and its key features. This showcases the main accomplishments and technologies used.",
      imageUrl: "/images/projects/foolish-1.png"
    },
    {
      title: "Gold Cloud",
      subtitle: "RoR • Bootstrap • Store",
      description: "Description of the second project highlighting its unique aspects and the problems it solves.",
      imageUrl: "/images/projects/goldcloud-1.png"
    },
    {
      title: "Garden Elegance",
      subtitle: "Wordpress • Elementor • WooCommerce",
      description: "Overview of the third project explaining its purpose and impact.",
      imageUrl: "/images/projects/grain.png"
    }
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto py-16">
      <h2 className="text-4xl text-center font-bold mb-16 font-space">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full" style={{ height: '500px' }}>
              <img
                src={project.imageUrl}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 font-space dark:text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {projects.map((project, index) => (
          <div key={index} className="border-2 md:flex border-red-500">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full md:w-1/2"
            />
            <div className="">
              <h3 className="text-xl font-bold mb-2 font-space dark:text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
              <p className="text-gray-600">{project.description}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
