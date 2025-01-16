import React from 'react';
import ProjectCard from '@/components/ProjectCard';


const Projects = () => {
  const projects = [
    {
      title: "Circles",
    subtitle: "Ruby on Rails • Bootstrap • Heroku",
    description: {
      summary: "A full stack Ruby on Rails web app, Circles is an event-centric social media platform that makes planning events with your friends easy.",
      paragraphs: [
        "Built with Ruby on Rails and modern frontend technologies, Circles streamlines the event planning process.",
        "Implemented real-time notifications and updates using Action Cable."
      ],
      technologies: [
        "Ruby on Rails",
        "PostgreSQL",
        "Bootstrap",
        "Heroku",
        "Action Cable"
      ],
      challenges: [
        "Implementing real-time updates for event changes",
        "Managing complex user permissions"
      ],
      outcomes: [
        "Successfully deployed to production",
        "Positive user feedback on interface"
      ],
      links: [
        {
          title: "Live Demo",
          url: "https://circles-app.herokuapp.com"
        },
        {
          title: "GitHub",
          url: "https://github.com/str1ck0/circles"
        }
      ]
    },
      images: [
        {
          url: "/images/projects/circles_home.png",
          alt: "Circles project",
          style: {
            objectFit: "cover",
            position: "left"
          }

        },
        {
          url: "/images/projects/circles_event.png",
          alt: "Circles project"
        },
      ]
    },
    {
      title: "Tempo Libero",
      subtitle: "Photoshop • Illustrator • Creative Design",
      imageStyle: "object-cover", // shows full image, may leave empty space
      description: "Rolling papers artwork, designed in collaboration with Foolish as part of a limited product release.",
      images: [
        {
          url: "/images/projects/foolish-1.png",
          alt: "Tempo project",
          style: {
            objectFit: "cover",
            position: "left"
          }
        },
      ]
    },
    {
      title: "Gold Cloud",
      subtitle: "Ruby on Rails • Bootstrap • Heroku",
      description: "Custom built Ruby on Rails store for a premium medical cannabis supplier in Joburg.",
      images: [
        {
          url: "/images/projects/gc-cart.png",
          alt: "Gold Cloud Project",
          style: {
            objectFit: "cover",
            position: "top"
          }
        },{
          url: "/images/projects/gc-home.png",
          alt: "Gold Cloud Project",
          style: {
            objectFit: "none",
            position: "top"
          }
        },
      ]
    },
    {
      title: "Garden Elegance",
      subtitle: "Wordpress • Elementor • WooCommerce",
      description: "Website design and WooCommerce online store integration for Perth retail garden centre.",
      imageStyle: "object-cover",
      images: [
        {
          url: "/images/projects/ge-home.png",
          alt: "Garden Elegance Project",
          style: {
            objectFit: "cover",
            position: "left"
          }
        },
        {
          url: "/images/projects/ge-about.png",
          alt: "Garden Elegance Project about"
        }
      ]
    },
    {
      title: "Le Wagon Tee Design",
      subtitle: "Illustrator • Photoshop",
      description: "Illustrated design for Le Wagon Cape Town 2025",
      images: [
        {
          url: "/images/projects/lewagon-tee.png",
          alt: "Le Wagon Tee",
          style: {
            objectFit: "cover",
            position: "bottom"
          }
        }
      ]
    }
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-16 font-space dark:text-gray-100">
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
