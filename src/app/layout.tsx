import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mixtape Digital',
  description: 'Crea y comparte tu casete virtual',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  )
}
