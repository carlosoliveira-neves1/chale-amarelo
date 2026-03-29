import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chalé Amarelo - Casa de Temporada em Itanhaém',
  description: 'Casa de temporada com piscina privativa, área gourmet e quartos climatizados em Itanhaém, SP. Seu refúgio pé na praia.',
  keywords: 'chalé, temporada, Itanhaém, piscina, praia, aluguel, casa de praia',
  openGraph: {
    title: 'Chalé Amarelo - Casa de Temporada em Itanhaém',
    description: 'Casa de temporada com piscina privativa, área gourmet e quartos climatizados.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
