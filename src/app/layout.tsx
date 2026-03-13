import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import { FunnelProvider } from '@/context/FunnelContext'
import Funnel from '@/components/Funnel'

const heebo = Heebo({
  subsets: ['latin'],
  variable: '--font-heebo',
})

export const metadata: Metadata = {
  title: 'BUDDY - Bestie & Amigo',
  description: 'Smart digital friends that strengthen, empower and give tools for coping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={heebo.variable}>
      <body className="font-heebo antialiased">
        <FunnelProvider>
          <Funnel />
        </FunnelProvider>
      </body>
    </html>
  )
}
