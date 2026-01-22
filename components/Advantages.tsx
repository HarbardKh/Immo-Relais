'use client'

import { useState } from 'react'

export default function Advantages() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  const advantages = [
    {
      title: "1er Réseau immobilier Français",
      description: "IAD est le leader français en nombre d'agents et en chiffre d'affaires. Cette puissance de réseau maximise vos chances de vendre rapidement ou de trouver le bien idéal !",
      icon: "🏆"
    },
    {
      title: "Équipe d'agents locaux expert",
      description: "Nous vous mettons en relation avec des agents immobiliers certifiés qui connaissent parfaitement votre marché local",
      icon: "📍"
    },
    {
      title: "100% Gratuit & Sans Engagement",
      description: "La mise en relation est entièrement gratuite pour vous. Aucun frais caché, aucune obligation",
      icon: "🔒"
    },
    {
      title: "Mise en Relation Rapide",
      description: "Après votre demande, un agent immobilier expert vous contacte rapidement pour prendre le relais sur votre projet",
      icon: "⚡"
    },
    {
      title: "Agents Certifiés",
      description: "Tous les agents immobiliers de notre réseau sont certifiés et formés aux dernières réglementations",
      icon: "💼"
    },
    {
      title: "Accompagnement Personnalisé",
      description: "L'agent immobilier qui vous est assigné vous accompagne de A à Z dans votre projet avec un suivi dédié",
      icon: "🤝"
    }
  ]

  const toggleCard = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-marine mb-6 md:mb-12">
          Pourquoi nous choisir ?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-start">
          {advantages.map((advantage, index) => {
            const isOpen = openIndices.has(index)
            return (
              <div 
                key={index}
                className={`card bg-white border-l-4 border-orange py-1.5 px-2 md:p-6 cursor-pointer hover:shadow-xl transition-all duration-200 flex flex-col items-center text-center ${
                  isOpen ? 'h-auto md:h-[320px]' : 'h-[75px] md:min-h-[160px]'
                } ${!isOpen ? 'justify-center' : ''}`}
                onClick={(e) => toggleCard(index, e)}
              >
                <div className="w-full flex flex-col items-center">
                  <div className="text-2xl md:text-5xl leading-none">{advantage.icon}</div>
                  <h3 className="text-[12px] md:text-xl font-bold text-marine leading-tight px-1 my-0.5">
                    {advantage.title}
                  </h3>
                  <svg 
                    className={`w-3 h-3 md:w-5 md:h-5 text-orange transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isOpen && (
                    <div className="w-full mt-1">
                      <p className="text-[11px] leading-[1.3] md:text-base text-gray-600 md:leading-relaxed text-center">
                        {advantage.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

