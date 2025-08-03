import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Vishal Patel',
    role: 'Founder & CEO',
    image: '/team/vishal-patel.jpg', // Add team member images to public/team/
  },
  {
    name: 'Jainil Chauhan',
    role: 'Founder & CEO',
    image: '/team/vishal-patel.jpg',
  },
  {
    name: 'Pritesh Patel',
    role: 'Founder & CEO',
    image: '/team/vishal-patel.jpg',
  },
];

export default function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Meet Our Team
      </h2>
      <Separator className="mx-auto my-8 max-w-[100px]" />
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        Our talented team of professionals is dedicated to delivering
        exceptional results and pushing the boundaries of what&apos;s possible
        in software development.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.name} className="overflow-hidden">
            <div className="relative h-[300px] w-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {member.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {member.role}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
