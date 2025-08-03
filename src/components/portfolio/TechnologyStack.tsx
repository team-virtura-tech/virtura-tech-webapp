import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  SiDocker,
  SiGithub,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons';
import { FaAws } from 'react-icons/fa';

const technologies = [
  {
    category: 'Frontend',
    techs: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Backend',
    techs: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    techs: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
    ],
  },
];

export default function TechnologyStack() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Technologies We Use
      </h2>
      <Separator className="mx-auto my-8 max-w-[100px]" />
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        We use cutting-edge technologies to build modern, scalable, and
        maintainable solutions.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((category) => (
          <Card key={category.category} className="border-primary/20">
            <CardContent className="p-6">
              <h3 className="mb-4 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <tech.icon
                      className="h-12 w-12"
                      style={{ color: tech.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
