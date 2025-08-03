import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  SiFigma,
  SiGithubactions,
  SiJirasoftware,
  SiRocketdotchat,
} from '@icons-pack/react-simple-icons';

const process = [
  {
    icon: SiFigma,
    name: 'Discovery',
    description:
      'We start with understanding your business needs and project requirements.',
    color: '#1ABCFE',
  },
  {
    icon: SiJirasoftware,
    name: 'Planning',
    description:
      'Our team creates a detailed project plan and technical architecture.',
    color: '#0052CC',
  },
  {
    icon: SiGithubactions,
    name: 'Development',
    description:
      'We develop your solution using agile methodologies and best practices.',
    color: '#2088FF',
  },
  {
    icon: SiRocketdotchat,
    name: 'Launch',
    description:
      'We deploy your solution and provide ongoing support and maintenance.',
    color: '#F24E1E',
  },
];

export default function ProcessSection() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Our Process
      </h2>
      <Separator className="mx-auto my-8 max-w-[100px]" />
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        We follow a proven development process to ensure successful project
        delivery and exceed your expectations.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step) => (
          <Card key={step.name} className="border-primary/20">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <step.icon className="h-12 w-12" style={{ color: step.color }} />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {step.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
