import type { Metadata } from 'next'
import { FlickerProvider } from '@/lib/flicker-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'HAIM — Hallucinations of AI Models Symposium',
  description:
    'A working symposium on hallucinations, confabulations, and fabrications in AI models. Nov 06–07, 2026. 50 researchers, practitioners, and students.',
  keywords: ['HAIM', 'AI hallucinations', 'symposium', 'machine learning', 'NSF'],
  openGraph: {
    title: 'HAIM Symposium 2026',
    description: 'Nov 06–07 · 50 minds · Hallucinations of AI Models',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><FlickerProvider>{children}</FlickerProvider></body>
    </html>
  )
}
