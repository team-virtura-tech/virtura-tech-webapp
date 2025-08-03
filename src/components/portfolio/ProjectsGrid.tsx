import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'E-commerce Platform',
    description:
      'A modern e-commerce solution built with Next.js and Stripe integration.',
    image: '/portfolio/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'TailwindCSS'],
    link: '#',
  },
  {
    title: 'Healthcare App',
    description:
      'Mobile application for healthcare providers with real-time patient monitoring.',
    image: '/portfolio/healthcare.jpg',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'WebSocket'],
    link: '#',
  },
  {
    title: 'AI-Powered Analytics',
    description:
      'Business analytics platform with machine learning capabilities.',
    image: '/portfolio/analytics.jpg',
    technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
    link: '#',
  },
  {
    title: 'Real Estate Platform',
    description: 'Property management system with virtual tour capabilities.',
    image: '/portfolio/real-estate.jpg',
    technologies: ['Vue.js', 'Django', 'PostgreSQL', 'ThreeJS'],
    link: '#',
  },
  {
    title: 'Social Media Dashboard',
    description:
      'Unified dashboard for managing multiple social media accounts.',
    image: '/portfolio/social-dashboard.jpg',
    technologies: ['React', 'Redux', 'Node.js', 'GraphQL'],
    link: '#',
  },
  {
    title: 'Educational Platform',
    description:
      'Online learning platform with video streaming and interactive assessments.',
    image: '/portfolio/education.jpg',
    technologies: ['Next.js', 'AWS', 'PostgreSQL', 'WebRTC'],
    link: '#',
  },
];

export default function ProjectsGrid() {
  return (
    <section
      id="projects"
      className="container mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Featured Projects
      </h2>
      <Separator className="mx-auto my-8 max-w-[100px]" />
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        Take a look at some of our proudest achievements and successful project
        deliveries.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={project.link} key={project.title}>
            <Card className="group overflow-hidden transition-all duration-300 hover:border-primary">
              <div className="relative h-[200px] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
