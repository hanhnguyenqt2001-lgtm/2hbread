import Hero from '@/components/home/Hero'
import MenuSection from '@/components/home/MenuSection'
import HowToOrder from '@/components/home/HowToOrder'
import StoryTeaser from '@/components/home/StoryTeaser'
import VisitSection from '@/components/home/VisitSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MenuSection />
      <HowToOrder />
      <VisitSection />
      <StoryTeaser />
    </>
  )
}
