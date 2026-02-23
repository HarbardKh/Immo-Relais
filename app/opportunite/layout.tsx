import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opportunité - Immo-Relais',
  description:
    'Devenez apporteur d\'affaires immobilier et touchez une commission sur chaque vente finalisée.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OpportuniteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
