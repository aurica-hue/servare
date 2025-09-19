'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Section from './Section'
import Layout from './Layout'
import { sections } from './constants/sections'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'


export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.floor(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }

    // Listen for Instagram-specific scroll updates
    const handleInstagramScroll = (event: any) => {
      setActiveSection(event.detail.activeSection)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    // Add Instagram scroll listener
    document.addEventListener('instagram-scroll-update', handleInstagramScroll)

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
      document.removeEventListener('instagram-scroll-update', handleInstagramScroll)
    }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Layout>
      {/* Login Button */}
      <motion.div
        className="fixed top-6 right-6 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="outline"
          size="sm"
          className="text-white border-white hover:bg-white hover:text-black text-xs sm:text-sm"
          onClick={() => router.push('/login')}
        >
          <LogIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Login</span>
          <span className="sm:hidden">Login</span>
        </Button>
      </motion.div>

      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`w-3 h-3 rounded-full my-2 transition-all ${
              index === activeSection ? 'bg-white scale-150' : 'bg-gray-600'
            }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-30"
        style={{ scaleX }}
      />
      <div 
        ref={containerRef} 
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
          />
        ))}
      </div>
    </Layout>
  )
}
