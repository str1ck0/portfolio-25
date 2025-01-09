import React from 'react';
import Image from "next/image";

const ProjectCard = ({ project }) => (
  <div className="group flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-900 transition-all duration-300">
    <div className="relative w-full md:w-3/5 aspect-[24/14] overflow-hidden rounded-xl">
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        quality={100}
        className="object-cover transition-transform duration-300 group-hover:scale-105 ease-in-out"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>

    <div className="flex flex-col w-full md:w-2/5">
      <h3 className="text-2xl font-bold mb-2 font-space text-gray-900 dark:text-gray-100">
        {project.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
        {project.subtitle}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        {project.description}
      </p>
    </div>
  </div>
)

export default ProjectCard;
