import React from 'react';
import ProjectCard from '@/components/ProjectCard';


const Projects = () => {
  const projects = [
    {
      title: "Circles",
      description: {
        summary: "A full stack Ruby on Rails web app, Circles is an event-centric social media platform that makes planning events within your social circles easy.",
        paragraphs: [
          "I led a team of 4 developers to build Circles from scratch in 10 days as the final project for Le Wagon's Full Stack Web Development bootcamp.",
          "The feature-rich app allows users to create and invite others into circles, create public or private events and invite their friends or circles, chat live with action cable, share Spotify playlists and more."
        ],
        technologies: [
          "Ruby on Rails",
          "PostgreSQL",
          "Bootstrap",
          "Javascript",
          "Heroku",
          "Action Cable"
        ],
        features: [
          "Implementing real-time updates for event changes",
          "Managing complex user permissions"
        ],
        outcomes: [
          "Deployed to production on Heroku (no longer live)",
          "Demoed at Le Wagon's #989 Demo Day to a live audience"
        ],
        links: [
          {
            title: "Live Demo",
            url: "#"
          },
          {
            title: "GitHub",
            url: "https://github.com/ch0rizo/Circles"
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
      title: "Boro",
      description: {
        summary: "A p2p marketplace for the sharing economy. Borrow or lend any asset! Buy less, share more.",
        paragraphs: [
          "The idea for borrow came from a desire to fight rampant consumerism and over-production and instead share anything within local communities.",
        ],
        technologies: [
          "Figma",
          "Ruby on Rails",
          "Bootstrap",
          "PostgreSQL",
          "Heroku",
          "Adobe CC"
        ],
        features: [
          "Functioning Figma prototype & Rails MVP",
          "Brand identity and style guide"
        ],
        outcomes: [
          "Deployed to production on Heroku (no longer live)",
        ],
        links: [
          {
            title: "Figma",
            url: "https://www.figma.com/proto/xuUgQ7edNWQ1SqAg3FVjHF/BORO-2.0-(Copy)?node-id=524-245&t=V9HWhSd11W46CrNX-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1"
          },
          {
            title: "GitHub",
            url: "https://github.com/ch0rizo/BORO"
          }
        ]
      },
      images: [
        {
          url: "/images/projects/Boro/boro-splash.png",
          alt: "Boro Prototype",
          style: {
            objectFit: "cover",
            position: "left"
          }
        },
        {
          url: "/images/projects/Boro/boro-intro1.png",
          alt: "Boro Prototype"
        },
        {
          url: "/images/projects/Boro/boro-intro2.png",
          alt: "Boro Chats Interface"
        },
        {
          url: "/images/projects/Boro/boro-intro3.png",
          alt: "Boro Conversation View"
        },
        {
          url: "/images/projects/Boro/boro-intro4.png",
          alt: "Boro Explore Page"
        },
        {
          url: "/images/projects/Boro/boro-login.png",
          alt: "Boro Explore Page"
        },
        {
          url: "/images/projects/Boro/boro-home.png",
          alt: "Boro Home Page"
        },
        {
          url: "/images/projects/Boro/boro-item.png",
          alt: "Boro Introduction Screen"
        },
        {
          url: "/images/projects/Boro/boro-explore.png",
          alt: "Boro Kayaks Feature"
        },
        {
          url: "/images/projects/Boro/boro-search.png",
          alt: "Boro Lending Interface"
        },
        {
          url: "/images/projects/Boro/boro-lend.png",
          alt: "Boro Login Page"
        },
        {
          url: "/images/projects/Boro/boro-chats.png",
          alt: "Boro Login Page"
        },
        {
          url: "/images/projects/Boro/boro-chat.png",
          alt: "Boro Login Page"
        },
        {
          url: "/images/projects/Boro/boro-account.png",
          alt: "Boro Login Page"
        },
        {
          url: "/images/projects/Boro/boro-account2.png",
          alt: "Boro Login Page"
        },
        {
          url: "/images/projects/Boro/boro-account3.png",
          alt: "Boro Login Page"
        },
      ]
    },
    {
      title: "Foolish - Cartine di Qualità",
      description: {
        summary: "Rolling papers artwork, designed in collaboration with Foolish as part of a limited 'Leisure Time' product release.",
        paragraphs: [
        ],
        technologies: [
          "Adobe Illustrator",
          "Adobe Photoshop",
          "Ink on paper"
        ],
        features: [
          "Artwork and die-cut design for rolling papers packaging.",
        ],
        outcomes: [
          "Limited run of 500 packs manufactured and sold",
          "Featured in Foolish's online store"
        ],
        links: [
        ]
      },
      images: [
        {
          url: "/images/projects/foolish-1.png",
          alt: "Tempo project",
          style: {
            objectFit: "cover",
            position: "left"
          }
        },
        {
          url: "/images/projects/FoolishPapersFront.png",
          alt: "Tempo project",
          style: {
            objectFit: "cover",
            position: "left"
          }
        },
        {
          url: "/images/projects/FoolishPapersInner.png",
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
      description: {
        summary: "Custom built Ruby on Rails store for a premium medical cannabis supplier in Joburg.",
        paragraphs: [
        ],
        technologies: [
          "Ruby on Rails",
          "Bootstrap",
          "IHeroku"
        ],
        features: [
          "Complete store functionality with admin, driver and user account types.",
          "Product and package management, order tracking and delivery scheduling."
        ],
        outcomes: [
          "Increased sales and customer satisfaction for Gold Cloud",
        ],
        links: [
          {
            title: "GitHub",
            url: "https://github.com/ElonMuskOfficial-NotHugo/GoldCloud"
          }
        ]
      },
      images: [
        {
          url: "/images/projects/Goldcloud/cart-portrait.png",
          alt: "Gold Cloud Project",
          style: {
            objectFit: "cover",
            position: "top"
          }
        },
        {
          url: "/images/projects/Goldcloud/store-home-portrait.png",
          alt: "Gold Cloud Project",
          style: {
            objectFit: "none",
            position: "top"
          }
        },
        {
          url: "/images/projects/Goldcloud/product-show-portrait.png",
          alt: "Gold Cloud Project",
          style: {
            objectFit: "none",
            position: "top"
          }
        },
        {
          url: "/images/projects/Goldcloud/splash-portrait.png",
          alt: "Gold Cloud Project",
          style: {
            objectFit: "none",
            position: "top"
          }
        },
        {
          url: "/images/projects/Goldcloud/add_product-portrait.png",
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
      description: {
        summary: "WordPress website re-design and WooCommerce online store integration for Perth retail garden centre.",
        paragraphs: [
        ],
        technologies: [
          "WordPress",
          "Elementor",
          "WooCommerce",
          "Flywheel Local"
        ],
        features: [
          "Full WordPress website re-design and build using Elementor plugin.",
          "WooCommerce plugin integration with store inventory and POS system for online store."
        ],
        outcomes: [
          "Increased sales via new online store and customer engagement for Garden Elegance.",
        ],
      },
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
      description: {
        summary: "Illustrated t-shirt design for Le Wagon Cape Town 2025",
        paragraphs: [],
        technologies: [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        features: [
          "Custom drawn illustration for official Le Wagon Cape Town merchandise."
        ],
        outcomes: [
          "Design used on graduate and staff t-shirts.",
        ],
      },
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
