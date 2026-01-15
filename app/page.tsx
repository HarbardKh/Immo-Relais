'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Quiz from '@/components/Quiz'
import Hero from '@/components/Hero'
import Advantages from '@/components/Advantages'
import TrustSection from '@/components/TrustSection'

function HomeContent() {
  const searchParams = useSearchParams()
  const [sourceRef, setSourceRef] = useState<string>('')

  useEffect(() => {
    const ref = searchParams.get('ref') || ''
    setSourceRef(ref)
  }, [searchParams])

  return (
    <main className="min-h-screen">
      <Hero />
      <Advantages />
      <TrustSection />
      <Quiz sourceRef={sourceRef} />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <Hero />
        <Advantages />
        <TrustSection />
        <Quiz sourceRef="" />
      </main>
    }>
      <HomeContent />
    </Suspense>
  )
}

