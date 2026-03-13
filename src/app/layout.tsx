import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import { FunnelProvider } from '@/context/FunnelContext'
import Funnel from '@/components/Funnel'

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  variable: '--font-heebo',
})

export const metadata: Metadata = {
  title: 'BUDDY - בסטי ואמיגו',
  description: 'חברים דיגיטליים חכמים שמחזקים מעצימים ונותנים כלים להתמודדות',
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
