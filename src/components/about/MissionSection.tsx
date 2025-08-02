import { Separator } from '@/components/ui/separator';

export default function MissionSection() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Our Mission
          </h2>
          <Separator className="my-4" />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            At VirturaTech, we are dedicated to transforming businesses through
            innovative software solutions. Our mission is to deliver excellence
            in every project, combining cutting-edge technology with exceptional
            user experience.
          </p>
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Innovation
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We stay at the forefront of technology to deliver modern,
                scalable solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Quality
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We maintain high standards in our code and deliverables to
                ensure long-term success.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Collaboration
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We work closely with our clients to understand their needs and
                exceed expectations.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary text-6xl font-bold">VT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
