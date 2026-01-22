'use client'

import { useState } from 'react'

export default function Advantages() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const advantages = [
    {
      title: "Le 1er Réseau de Mandataires Immobiliers",
      shortDescription: "Leader français en nombre d'agents et chiffre d'affaires",
      description: "IAD est le leader français en nombre d'agents et en chiffre d'affaires. Cette puissance de réseau maximise vos chances de vendre rapidement ou de trouver le bien idéal !",
      icon: "🏆"
    },
    {
      title: "Agents Locaux Experts",
      shortDescription: "Agents certifiés connaissant parfaitement votre marché local",
      description: "Nous vous mettons en relation avec des agents immobiliers certifiés qui connaissent parfaitement votre marché local",
      icon: "📍"
    },
    {
      title: "100% Gratuit & Sans Engagement",
      shortDescription: "Mise en relation entièrement gratuite, sans frais cachés",
      description: "La mise en relation est entièrement gratuite pour vous. Aucun frais caché, aucune obligation",
      icon: "🔒"
    },
    {
      title: "Mise en Relation Rapide",
      shortDescription: "Contact rapide par un agent expert après votre demande",
      description: "Après votre demande, un agent immobilier expert vous contacte rapidement pour prendre le relais sur votre projet",
      icon: "⚡"
    },
    {
      title: "Agents Certifiés",
      shortDescription: "Tous nos agents sont certifiés et formés aux dernières réglementations",
      description: "Tous les agents immobiliers de notre réseau sont certifiés et formés aux dernières réglementations",
      icon: "💼"
    },
    {
      title: "Accompagnement Personnalisé",
      shortDescription: "Suivi dédié de A à Z pour votre projet",
      description: "L'agent immobilier qui vous est assigné vous accompagne de A à Z dans votre projet avec un suivi dédié",
      icon: "🤝"
    }
  ]

  const toggleCard = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-marine mb-6 md:mb-12">
          Pourquoi nous choisir ?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {advantages.map((advantage, index) => {
            const isOpen = openIndex === index
            return (
              <div 
                key={index}
                className="card bg-white border-l-4 border-orange p-4 md:p-6 cursor-pointer hover:shadow-xl transition-all duration-200"
                onClick={() => toggleCard(index)}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-2xl md:text-4xl flex-shrink-0">{advantage.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm md:text-xl font-bold text-marine leading-tight flex-1">
                        {advantage.title}
                      </h3>
                      <svg 
                        className={`w-4 h-4 md:w-5 md:h-5 text-orange flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed mt-2">
                      {advantage.shortDescription}
                    </p>
                  </div>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs md:text-base text-gray-600 leading-relaxed pt-2 border-t border-gray-200">
                    {advantage.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

