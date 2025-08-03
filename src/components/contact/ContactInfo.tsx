'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const contactDetails = [
  {
    icon: FaMapMarkerAlt,
    title: 'Visit Us',
    details: [
      '123 Innovation Street',
      'Tech District',
      'San Francisco, CA 94105',
    ],
  },
  {
    icon: FaPhone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', 'Mon-Fri: 9:00 AM - 6:00 PM PST'],
  },
  {
    icon: FaEnvelope,
    title: 'Email Us',
    details: ['team.virturatech@gmail.com', 'support@virtura.tech'],
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground text-2xl font-bold">
          Contact Information
        </h2>
        <p className="text-muted-foreground mt-2">
          Reach out to us through any of these channels. We&apos;re here to
          help!
        </p>
      </div>
      <div className="space-y-4">
        {contactDetails.map((item) => (
          <Card key={item.title} className="border-primary/20">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
                <item.icon className="text-primary-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-semibold">
                  {item.title}
                </h3>
                {item.details.map((detail) => (
                  <p key={detail} className="text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
