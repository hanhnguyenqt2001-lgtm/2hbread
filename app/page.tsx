import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProducts from '@/components/FeaturedProducts'
import Testimonials from '@/components/Testimonials'
import SocialSection from '@/components/SocialSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProducts />
      <Testimonials />
      <SocialSection />
      <Footer />
    </>
  )
}
