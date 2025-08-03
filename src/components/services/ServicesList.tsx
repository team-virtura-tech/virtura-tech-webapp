import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  SiAndroid,
  SiFigma,
  SiMongodb,
  SiNextdotjs,
  SiSnyk,
} from '@icons-pack/react-simple-icons';
import { FaAws } from 'react-icons/fa';

const services = [
  {
    icon: SiNextdotjs,
    name: 'Web Development',
    description:
      'Custom web applications built with modern technologies like React, Next.js, and Node.js.',
    color: '#000000',
  },
  {
    icon: SiAndroid,
    name: 'Mobile Development',
    description:
      'Native and cross-platform mobile apps for iOS and Android using React Native and Flutter.',
    color: '#3DDC84',
  },
  {
    icon: FaAws,
    name: 'Cloud Solutions',
    description:
      'Cloud-native applications and infrastructure using AWS, Azure, and Google Cloud.',
    color: '#FF9900',
  },
  {
    icon: SiMongodb,
    name: 'Backend Development',
    description:
      'Scalable and secure backend systems with microservices architecture.',
    color: '#47A248',
  },
  {
    icon: SiFigma,
    name: 'UI/UX Design',
    description:
      'User-centered design solutions that enhance user experience and engagement.',
    color: '#F24E1E',
  },
  {
    icon: SiSnyk,
    name: 'Security & Testing',
    description:
      'Comprehensive security audits and automated testing solutions.',
    color: '#4C4A73',
  },
];

export default function ServicesList() {
  return (
    <section
      id="services"
      className="container mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Our Services
      </h2>
      <Separator className="mx-auto my-8 max-w-[100px]" />
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        We offer a comprehensive range of software development services to help
        your business succeed in the digital world.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.name} className="border-primary/20">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <service.icon
                className="h-12 w-12"
                style={{ color: service.color }}
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {service.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
