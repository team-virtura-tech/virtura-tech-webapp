export type ShowcaseItemType = 'client' | 'template';
export type ShowcaseSourceType = 'image' | 'video';

export type ShowcaseItem = {
  id: string;
  clientName: string;
  imagePath: string;
  externalLink: string;
  type: ShowcaseItemType;
  srcType: ShowcaseSourceType;
};

export const showcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    clientName: 'Mail All Center',
    imagePath: '/images/clients/mail-all-center.png',
    externalLink: 'https://www.mailallcenter.com/',
    type: 'client',
    srcType: 'image',
  },
  {
    id: '2',
    clientName: 'Alliance Medical',
    imagePath: '/images/clients/alliance-medical.png',
    externalLink: 'https://alliance-med-supply.vercel.app/',
    type: 'client',
    srcType: 'image',
  },
  {
    id: '3',
    clientName: 'Easy CA Drivers Ed',
    imagePath: '/images/clients/easy-ca-drivers-ed.png',
    externalLink: 'https://easy-ca-driving-school.vercel.app/',
    type: 'client',
    srcType: 'image',
  },
  {
    id: '4',
    clientName: 'Template Example',
    imagePath: '/images/clients/easy-ca-drivers-ed.png',
    externalLink: 'https://easy-ca-driving-school.vercel.app/',
    type: 'template',
    srcType: 'image',
  },
];
