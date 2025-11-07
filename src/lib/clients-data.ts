export type ClientData = {
  id: string;
  name: string;
  url?: string;
  images: {
    desktop: string;
    mobile: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
};

export const clientsData: ClientData[] = [
  {
    id: 'mail-all-center',
    name: 'Mail All Center',
    url: 'https://www.mailallcenter.com/',
    images: {
      desktop: '/images/mailAllCenter/desktop.jpg',
      mobile: '/images/mailAllCenter/mobile.jpg',
    },
    testimonial: undefined, // Empty for now
  },
  {
    id: 'easy-california-drivers-ed',
    name: 'Easy California Drivers Ed',
    url: undefined, // No prod URL yet
    images: {
      desktop: '/images/easyCaDriversEd/desktop.jpg',
      mobile: '/images/easyCaDriversEd/mobile.jpg',
    },
    testimonial: undefined, // Empty for now
  },
  {
    id: 'alliance-medical-supply',
    name: 'Alliance Medical Supply & Rental',
    url: undefined, // No prod URL yet
    images: {
      desktop: '/images/allianceMedSupply/desktop.jpg',
      mobile: '/images/allianceMedSupply/mobile.jpg',
    },
    testimonial: undefined, // Empty for now
  },
];

// Helper functions for easy access
export const getClientById = (id: string): ClientData | undefined => {
  return clientsData.find((client) => client.id === id);
};

export const getClientByName = (name: string): ClientData | undefined => {
  return clientsData.find(
    (client) => client.name.toLowerCase() === name.toLowerCase()
  );
};

export const getClientsWithUrls = (): ClientData[] => {
  return clientsData.filter((client) => client.url);
};

export const getClientsWithTestimonials = (): ClientData[] => {
  return clientsData.filter((client) => client.testimonial);
};
