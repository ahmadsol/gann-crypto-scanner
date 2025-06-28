import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gann Crypto Scanner',
  description: 'Professional cryptocurrency analysis using W.D. Gann trading methods',
  keywords: 'cryptocurrency, trading, Gann, technical analysis, crypto scanner',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gann-dark via-slate-800 to-gann-dark">
          {children}
        </div>
      </body>
    </html>
  )
}
