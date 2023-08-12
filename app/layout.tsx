import Container from './components/Container'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin']
})

export const metadata = {
  title: 'Bebras Web',
  description: 'Web platform indexing bebras tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={nunito.className}>

        <Navbar/>

        <div className="pb-20 pt-28">
          {children}
        </div>
        
      </body>
    </html>
  )
}
