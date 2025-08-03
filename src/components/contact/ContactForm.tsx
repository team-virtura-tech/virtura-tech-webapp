'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaPaperPlane } from 'react-icons/fa';

export function ContactForm() {
  return (
    <Card className="border-primary/20">
      <CardContent className="p-6">
        <div className="mb-8">
          <h2 className="text-foreground text-2xl font-bold">
            Send us a Message
          </h2>
          <p className="text-muted-foreground mt-2">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="text-foreground mb-2 block text-sm font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-foreground mb-2 block text-sm font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-foreground mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="text-foreground mb-2 block text-sm font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              placeholder="How can we help?"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-foreground mb-2 block text-sm font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              placeholder="Tell us about your project..."
              required
            ></textarea>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            <FaPaperPlane className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
