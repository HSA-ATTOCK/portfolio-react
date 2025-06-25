"use client";
import React, { useState } from "react";
import { PinContainer } from "./ui/3d-pin";

export const AnimatedPinDemo = ({
  title,
  description,
  image,
  githubLink,
  techStack,
  demo,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full flex items-center justify-center p-4">
      <PinContainer
        title={demo ? "Live Demo" : "View Details"}
        href={demo || "#"}
        containerClassName="w-full h-full"
      >
        <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-full h-full aspect-[1/1.2]">
          {/* Title */}
          <h3 className="!pb-2 !m-0 font-bold text-lg text-slate-100 line-clamp-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm !m-0 !p-0 font-normal text-slate-300 line-clamp-2">
            {description}
          </p>

          {/* Image container */}
          <div className="relative w-full mt-4 aspect-video rounded-lg overflow-hidden flex-1 min-h-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-lg"></div>
            )}
            <img
              src={image}
              alt={title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x400?text=Project+Image";
                setImageLoaded(true);
              }}
            />
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-3">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-black/50 text-white"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Code Button */}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-center"
            onClick={(e) => e.stopPropagation()}
          >
            View Code
          </a>
        </div>
      </PinContainer>
    </div>
  );
};
