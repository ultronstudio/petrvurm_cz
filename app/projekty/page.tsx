"use client";

import React, { useState, useEffect } from "react";
import {
  HTML5Icon,
  CSS3Icon,
  JavaScriptIcon,
  TypeScriptIcon,
  ReactIcon,
  NextJsIcon,
  NodeJsIcon,
  LaravelIcon,
  LaravelLivewireIcon,
  MariaDbIcon,
  GitIcon,
  SassIcon,
} from "@/Icons/Icons";
import Link from "next/link";
import { Card } from "@radix-ui/themes";

const projects = [
  {
    title: "FakeTube",
    description: "Česká sociální síť pro sdílení videí.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Laravel",
      "Laravel Livewire",
      "MariaDB",
      "Git",
    ],
    slug: "faketube",
  },
];

const technologies = [
  { name: "HTML5", icon: HTML5Icon, color: "#e34c26", textColor: "#ffffff" },
  { name: "CSS3", icon: CSS3Icon, color: "#264de4", textColor: "#ffffff" },
  { name: "Sass", icon: SassIcon, color: "#cc6699", textColor: "#ffffff" },
  {
    name: "JavaScript",
    icon: JavaScriptIcon,
    color: "#f0db4f",
    textColor: "#323330",
  },
  {
    name: "TypeScript",
    icon: TypeScriptIcon,
    color: "#007acc",
    textColor: "#ffffff",
  },
  { name: "React", icon: ReactIcon, color: "#61dafb", textColor: "#323330" },
  { name: "Next.js", icon: NextJsIcon, color: "#ffffff", textColor: "#000000" },
  { name: "Node.js", icon: NodeJsIcon, color: "#339933", textColor: "#ffffff" },
  {
    name: "Laravel",
    icon: LaravelIcon,
    color: "#F05340",
    textColor: "#ffffff",
  },
  {
    name: "Laravel Livewire",
    icon: LaravelLivewireIcon,
    color: "#FB70A9",
    textColor: "#ffffff",
  },
  {
    name: "MariaDB",
    icon: MariaDbIcon,
    color: "#00758f",
    textColor: "#ffffff",
  },
  {
    name: "Git",
    icon: GitIcon,
    color: "#F1502F",
    textColor: "#ffffff",
  },
];

export default function Projekty() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  // Create a map of technology names to their color and text color
  const techMap = new Map<string, { color: string; textColor: string }>(
    technologies.map((tech) => [
      tech.name,
      { color: tech.color, textColor: tech.textColor },
    ])
  );

  const filteredProjects =
    selectedTechs.length > 0
      ? projects.filter((project) =>
          selectedTechs.every((tech) => project.technologies.includes(tech))
        )
      : projects;

  useEffect(() => {
    if (selectedTechs.length > 0 && filteredProjects.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [selectedTechs, filteredProjects]);

  const handleTechClick = (techName: string) => {
    setSelectedTechs((prevSelectedTechs) =>
      prevSelectedTechs.includes(techName)
        ? prevSelectedTechs.filter((tech) => tech !== techName)
        : [...prevSelectedTechs, techName]
    );
  };

  // Function to format the tech list
  const formatTechList = (techs: string[]) => {
    if (techs.length === 0) return "";
    if (techs.length === 1) return techs[0];
    if (techs.length === 2) return `${techs[0]} a ${techs[1]}`;
    return `${techs.slice(0, -1).join(", ")} a ${techs[techs.length - 1]}`;
  };

  const formatAdditionalTechs = (count: number) => {
    if (count === 1) return "+ 1 další technologie";
    if (count === 2) return "+ 2 další technologie";
    if (count === 3) return "+ 3 další technologie";
    return `+ ${count} dalších technologií`;
  };

  const alertMessage = `Neexistuje žádný projekt, ve kterém bych využíval ${formatTechList(
    selectedTechs
  )}.`;

  return (
    <section id="services" className="py-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Projekty
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className={`cursor-pointer p-2 rounded-md flex gap-1 items-center ${
                selectedTechs.includes(tech.name)
                  ? "outline outline-offset-2 outline-2"
                  : ""
              }`}
              style={{
                backgroundColor: tech.color,
                color: tech.textColor || "white",
                outlineColor: selectedTechs.includes(tech.name)
                  ? tech.textColor || "white"
                  : "",
              }}
              onClick={() => handleTechClick(tech.name)}
            >
              <tech.icon className="w-5 h-5 fill-current" />
              <p>{tech.name}</p>
            </div>
          ))}
        </div>

        {showAlert ? (
          <div className="p-4 mb-6 bg-red-200 text-red-800 border border-red-400 rounded">
            <p>{alertMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const techs = project.technologies;
              const visibleTechs = techs.slice(0, 4);
              const extraTechCount = techs.length - visibleTechs.length;

              return (
                <Link key={project.title} href={`/projekty/${project.slug}`}>
                  <Card
                    className="p-4 border rounded-lg shadow hover:bg-card-hover cursor-pointer"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p>{project.description}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {visibleTechs.map((tech) => {
                        const techDetails = techMap.get(tech);
                        return techDetails ? (
                          <span
                            key={tech}
                            className="text-sm px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: techDetails.color,
                              color: techDetails.textColor,
                            }}
                          >
                            {tech}
                          </span>
                        ) : null;
                      })}
                      {extraTechCount > 0 && (
                        <span className="text-sm px-2 py-1 rounded-full bg-gray-200 text-gray-800">
                          {formatAdditionalTechs(extraTechCount)}
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
