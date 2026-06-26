import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { TransitionProvider } from '@/providers/TransitionProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/shared/LoadingScreen'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SOLARIS — A Digital Museum of the Solar System',
  description:
    'An award-winning interactive journey through the eight worlds of our solar system. Immersive. Cinematic. Unforgettable.',
  keywords: ['solar system', 'planets', 'space', 'museum', 'interactive', 'SOLARIS'],
  openGraph: {
    title: 'SOLARIS — A Digital Museum of the Solar System',
    description:
      'An award-winning interactive journey through the eight worlds of our solar system.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          <TransitionProvider>
            <LoadingScreen />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </TransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
