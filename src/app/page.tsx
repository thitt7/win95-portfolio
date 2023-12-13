import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windows 95 - A portfolio for Tristan Hitt',
  description: 'Check out my portfolio in a nostalgic nod to Windows 95. Relive the original modern desktop experience while learning a bit about me!',

  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Sachse', 'Sachse, Texas'],
  authors: [{ name: 'Tristan Hitt', url: 'https://tristanhitt.com' }],
  colorScheme: 'dark',
  creator: 'Tristan Hitt',
  publisher: 'Tristan Hitt',
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
    title: 'Windows 95 - A portfolio for Tristan Hitt',
    description: 'Check out my portfolio in a nostalgic nod to Windows 95. Relive the original modern desktop experience while learning a bit about me!',
    url: `https://tristanhitt.com`,
    publishedTime: new Date().toISOString(),
    authors: ['Tristan Hitt'],
    siteName: 'tristanhitt.com',
    images: [
      {
        url: '',
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
    title: 'Windows 95 - A portfolio for Tristan Hitt',
    description: 'Check out my portfolio in a nostalgic nod to Windows 95. Relive the original modern desktop experience while learning a bit about me!',
    siteId: '',
    creator: '',
    creatorId: '',
    images: '',
  },
}

export default function Home() {
  return (
    <main>
      
    </main>
  )
}
