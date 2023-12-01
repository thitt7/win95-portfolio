import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windows 95',
  description: 'Discover the community site for Sachse, Texas. The go-to source for the latest news, events, job opportunities, and up-to-date resources.',

  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Sachse', 'Sachse, Texas'],
  authors: [{ name: 'Tristan Hitt', url: 'https://tristanhitt.com' }],
  colorScheme: 'dark',
  creator: 'Tristan Hitt',
  publisher: 'Sachse Community Site',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: `https://tristanhitt.com`
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Sachse Community Site - Sachse, Texas Updates & More',
    description: 'Discover the community site for Sachse, Texas. The go-to source for the latest news, events, job opportunities, and up-to-date resources.',
    url: `https://sachse.city`,
    publishedTime: new Date().toISOString(),
    authors: ['Tristan Hitt'],
    siteName: 'sachse.city',
    images: [
      {
        url: '/banner-full.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'article',
  },

  twitter: {
    card: 'summary_large_image',
    site: '',
    title: 'Sachse Community Site - Sachse, Texas Updates & More',
    description: 'Discover the community site for Sachse, Texas. The go-to source for the latest news, events, job opportunities, and up-to-date resources.',
    siteId: '',
    creator: '',
    creatorId: '',
    images: '/banner-full.jpg',
  },
}

export default function Home() {
  return (
    <main>
      
    </main>
  )
}
