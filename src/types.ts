export interface CatalogPage {
  id: number;
  pageNumber: string; // e.g. "01 / 11"
  type: 'cover' | 'manifesto' | 'category' | 'product' | 'guide' | 'backcover';
  category?: string;
  categoryNumber?: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  detailedSpecs?: {
    label: string;
    value: string;
    icon?: string;
  }[];
  price?: string;
  priceNumber?: number;
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  whatsappMessage?: string;
  bgColor: string; // e.g. '#F7F5F0', '#EAE4DC', '#1E2022'
  textColor?: string;
  accentColor?: string;
  customizationNotes?: string;
  highlightTag?: string;
}

export interface CustomizerState {
  productType: 'keychain' | 'pen' | 'agenda' | 'duo' | 'box';
  initialLetter: string;
  customName: string;
  specialDate?: string;
  basePigment: string;
  encapsulated: string[];
  hardwareColor: 'gold' | 'silver' | 'rosegold';
  hasCharm: boolean;
  notes: string;
}

export type ViewMode = 'magazine' | 'spread' | 'grid';
