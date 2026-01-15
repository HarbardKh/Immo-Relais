'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Quiz from '@/components/Quiz'
import Hero from '@/components/Hero'
import Advantages from '@/components/Advantages'
import TrustSection from '@/components/TrustSection'

export default function Home() {
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

