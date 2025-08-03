import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SiFigma, SiNodedotjs, SiReact } from '@icons-pack/react-simple-icons';

const technologies = [
  {
    icon: SiReact,
    name: 'Frontend Development',
    description: 'React, Next.js, TypeScript, Tailwind CSS',
    color: '#61DAFB', // React blue
  },
  {
    icon: SiNodedotjs,
    name: 'Backend Development',
    description: 'Node.js, Python, PostgreSQL, MongoDB',
    color: '#339933', // Node.js green
  },
  {
    icon: SiFigma,
    name: 'UI/UX Design',
    description: 'Figma, Adobe XD, User-Centered Design',
    color: '#F24E1E', // Figma orange
  },
];

export default function TechStackSection() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Our Technology Stack
      </h2>
      <Separator className="mx-auto my-8 max-w-[100px]" />
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <Card key={tech.name} className="border-primary/20">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <tech.icon className="h-12 w-12" style={{ color: tech.color }} />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {tech.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {tech.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
