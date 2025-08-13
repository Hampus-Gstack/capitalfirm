import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Calendar from '@/components/Calendar'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen mobile-safe-area">
      <Header />
      <Hero />
      <Services />
      <Calendar />
      <About />
      <Contact />
      <Footer />
    </main>
  )
} 