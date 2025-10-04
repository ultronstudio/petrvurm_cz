"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, XCircle, AlertCircle, ArrowRight } from "lucide-react";
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
  PHPIcon,
  ApiIcon,
  CSharpIcon,
  TailwindIcon,
} from "@/Icons/Icons";

// --- data ---
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
  {
    title: "BressKamp",
    description: "Prezentace německé společnosti BressKamp.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "Git"],
    slug: "bresskamp",
  },
  {
    title: "HopHub",
    description: "Rozšíření pro internetový prohlížeč.",
    technologies: ["HTML5", "CSS3", "Sass", "JavaScript", "Git"],
    slug: "hophub",
  },
  {
    title: "Petr Vurm",
    description: "Profesní webové portfolio.",
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Git"],
    slug: "petrvurm",
  },
  {
    title: "Twitch Game: Red Light, Green Light",
    description:
      "Twitch chatbot, který umožňuje divákům hrát Red Light, Green Light přímo v chatu.",
    technologies: ["JavaScript", "Node.js", "Git", "API"],
    slug: "twitch-chatbot-red-light-green-light",
  },
  {
    title: "Ivan",
    description:
      "Nástroj pro tvorbu zasedacích pořádků celo­státní matematické soutěže.",
    technologies: ["C#", "Git", "API", "MariaDB", ".NET"],
    slug: "sspt-ivan",
  },
  {
    title: "Gomegle",
    description: "Webová aplikace pro náhodný živý chat s uživateli.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Laravel",
      "Laravel Livewire",
      "MariaDB",
      "Node.js",
      "Git",
      "Tailwind CSS",
    ],
    slug: "gomegle",
  },
];

const technologies = [
  { name: "HTML5", icon: HTML5Icon, color: "#e34c26", text: "#ffffff" },
  { name: "CSS3", icon: CSS3Icon, color: "#264de4", text: "#ffffff" },
  { name: "Sass", icon: SassIcon, color: "#cc6699", text: "#ffffff" },
  { name: "JavaScript", icon: JavaScriptIcon, color: "#f0db4f", text: "#323330" },
  { name: "TypeScript", icon: TypeScriptIcon, color: "#007acc", text: "#ffffff" },
  { name: "PHP", icon: PHPIcon, color: "#777bb4", text: "#ffffff" },
  { name: "React", icon: ReactIcon, color: "#61dafb", text: "#1a1a1a" },
  { name: "Next.js", icon: NextJsIcon, color: "#ffffff", text: "#000000" },
  { name: "Node.js", icon: NodeJsIcon, color: "#339933", text: "#ffffff" },
  { name: "Laravel", icon: LaravelIcon, color: "#F05340", text: "#ffffff" },
  { name: "Laravel Livewire", icon: LaravelLivewireIcon, color: "#FB70A9", text: "#ffffff" },
  { name: "MariaDB", icon: MariaDbIcon, color: "#00758f", text: "#ffffff" },
  { name: "Git", icon: GitIcon, color: "#F1502F", text: "#ffffff" },
  { name: "API", icon: ApiIcon, color: "#2f2f2f", text: "#ffffff" },
  { name: "C#", icon: CSharpIcon, color: "#239120", text: "#ffffff" },
  { name: ".NET", color: "#512bd4", text: "#ffffff" },
  { name: "Tailwind CSS", icon: TailwindIcon, color: "#44a8b3", text: "#ffffff" },
];

export default function Projekty() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const techMap = useMemo(
    () =>
      new Map<string, { color: string; textColor: string }>(
        technologies.map((t) => [t.name, { color: t.color, textColor: t.text }])
      ),
    []
  );

  const filteredProjects = useMemo(
    () =>
      selectedTechs.length > 0
        ? projects.filter((p) => selectedTechs.every((t) => p.technologies.includes(t)))
        : projects,
    [selectedTechs]
  );

  useEffect(() => {
    setShowAlert(selectedTechs.length > 0 && filteredProjects.length === 0);
  }, [selectedTechs, filteredProjects]);

  const toggleTech = (name: string) => {
    setSelectedTechs((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const resetFilters = () => setSelectedTechs([]);

  const formatTechList = (techs: string[]) => {
    if (techs.length === 0) return "";
    if (techs.length === 1) return techs[0];
    if (techs.length === 2) return `${techs[0]} a ${techs[1]}`;
    return `${techs.slice(0, -1).join(", ")} a ${techs[techs.length - 1]}`;
  };

  const alertMessage = `Nebyly nalezeny projekty odpovídající filt­rům: ${formatTechList(selectedTechs)}.`;

  return (
    <section className="relative py-12">
      {/* gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Projekty</h1>
            <p className="mt-2 max-w-3xl text-white/80 text-sm md:text-base">
              Níže naleznete výběr realizací napříč webovými aplikacemi, integracemi a
              automatizacemi. Filtry vám umožní zobrazit projekty podle použitých technologií.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-white/50" />
            <span className="text-xs text-white/60">Kliknutím na technologii filtrujete projekty</span>
          </div>
        </div>

        {/* filters */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
          {technologies.map((tech) => (
            <button
              key={tech.name}
              type="button"
              aria-pressed={selectedTechs.includes(tech.name)}
              onClick={() => toggleTech(tech.name)}
              className={`group inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium ring-1 ring-inset transition ${
                selectedTechs.includes(tech.name)
                  ? "ring-white/60 shadow-[inset_0_0_0_9999px_rgba(255,255,255,0.18)]"
                  : "ring-white/20 hover:ring-white/40"
              }`}
              style={{ backgroundColor: tech.color, color: tech.text }}
            >
              {tech.icon ? <tech.icon className="h-4 w-4" style={{ fill: tech.text }} /> : null}
              <span>{tech.name}</span>
            </button>
          ))}

          <AnimatePresence>
            {selectedTechs.length > 0 && (
              <motion.button
                type="button"
                onClick={resetFilters}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-auto inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/20 hover:bg-white/15"
              >
                <XCircle className="h-4 w-4" /> Zrušit filtry
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* grid / empty state */}
        <div className="mt-8 min-h-[200px]">
          <AnimatePresence mode="popLayout">
            {showAlert ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 rounded-xl border border-amber-300/30 bg-amber-200/10 p-4 text-amber-200"
              >
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{alertMessage}</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project, idx) => {
                  const techs = project.technologies;
                  const visible = techs.slice(0, 4);
                  const extra = techs.length - visible.length;

                  return (
                    <motion.article
                      key={project.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.35, delay: idx * 0.03 }}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                    >
                      <Link href={`/projekty/${project.slug}`} className="block group" prefetch={false}>
                        <div className="p-5">
                          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/80">
                            {project.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {visible.map((t) => {
                              const d = techMap.get(t);
                              if (!d) return null;
                              return (
                                <span
                                  key={t}
                                  className="rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-white/20"
                                  style={{ backgroundColor: d.color, color: d.textColor }}
                                >
                                  {t}
                                </span>
                              );
                            })}
                            {extra > 0 && (
                              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20">
                                + {extra} dalších
                              </span>
                            )}
                          </div>
                          <div className="mt-4 inline-flex items-center gap-1 text-primary">
                            Zobrazit detail <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
