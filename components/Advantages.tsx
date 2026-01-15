'use client'

export default function Advantages() {
  const advantages = [
    {
      title: "Le 1er Réseau de Mandataires Immobiliers",
      description: "IAD est le leader français en nombre d'agents et en chiffre d'affaires. Cette puissance de réseau maximise vos chances de vendre rapidement ou de trouver le bien idéal !",
      icon: "🏆"
    },
    {
      title: "Agents Locaux Experts",
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

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-marine mb-12">
          Pourquoi nous choisir ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="card bg-white border-l-4 border-orange"
            >
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold text-marine mb-2">
                {advantage.title}
              </h3>
              <p className="text-gray-600">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

