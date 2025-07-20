import { Code2, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background/80 border-t backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <Link
                href="/"
                className="text-foreground flex items-center space-x-2 text-xl font-bold"
              >
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <Code2 className="text-primary-foreground h-5 w-5" />
                </div>
                <span>VirturaTech</span>
              </Link>
              <p className="text-muted-foreground mt-4 max-w-md">
                We create stunning web applications, mobile apps, and custom
                software solutions that drive your business forward.
              </p>
              <div className="mt-6 flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-foreground text-sm font-semibold">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-foreground text-sm font-semibold">
                Services
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/services/web"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mobile"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/custom"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Custom Software
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/consulting"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Consulting
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-muted-foreground text-sm">
                © 2025 VirturaTech. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
