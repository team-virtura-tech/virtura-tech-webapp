import { SiAndroid, SiReact } from '@icons-pack/react-simple-icons';
import { FaCode } from 'react-icons/fa';

const ServicesPreviewSection = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Our Expertise
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            We specialize in cutting-edge technologies to bring your ideas to
            life
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Web Development */}
            <div className="group bg-card relative rounded-2xl p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <SiReact className="text-primary-foreground h-6 w-6" />
              </div>
              <h3 className="text-card-foreground mb-4 text-xl font-semibold">
                Web Applications
              </h3>
              <p className="text-muted-foreground">
                Modern, responsive web applications built with React, Next.js,
                and the latest technologies.
              </p>
            </div>

            {/* Mobile Development */}
            <div className="group bg-card relative rounded-2xl p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <SiAndroid className="text-primary-foreground h-6 w-6" />
              </div>
              <h3 className="text-card-foreground mb-4 text-xl font-semibold">
                Mobile Apps
              </h3>
              <p className="text-muted-foreground">
                Native and cross-platform mobile applications for iOS and
                Android using React Native and Flutter.
              </p>
            </div>

            {/* Custom Software */}
            <div className="group bg-card relative rounded-2xl p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <FaCode className="text-primary-foreground h-6 w-6" />
              </div>
              <h3 className="text-card-foreground mb-4 text-xl font-semibold">
                Custom Software
              </h3>
              <p className="text-muted-foreground">
                Tailored software solutions designed specifically for your
                business needs and requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
