'use client'

import { useState } from 'react'

export default function OpportunitePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const steps = [
    {
      number: '1',
      title: 'Le Signalement',
      icon: '📲',
      description:
        'Vous entendez parler d\'un projet de vente ou d\'achat ? Saisissez les coordonnées en 30 secondes sur l\'application dédiée.',
    },
    {
      number: '2',
      title: 'Le Suivi',
      icon: '📊',
      description:
        'Un agent de notre réseau partenaire (Leader français du secteur) prend le relais. Vous suivez l\'avancement du dossier en temps réel depuis votre mobile.',
    },
    {
      number: '3',
      title: "L'Encaissement",
      icon: '💰',
      description:
        'La vente est signée chez le notaire ? Vous recevez votre commission directement sur votre compte.',
    },
  ]

  const avantages = [
    {
      icon: '✨',
      title: 'Simplicité totale',
      description:
        "Aucune connaissance en immobilier n'est requise. Vous gérez la mise en relation, les pros gèrent la vente.",
    },
    {
      icon: '🔍',
      title: 'Transparence',
      description:
        'Une plateforme sécurisée pour suivre chaque étape du processus en temps réel.',
    },
    {
      icon: '🕊️',
      title: 'Liberté',
      description:
        "Pas de frais d'inscription, pas de quotas, pas de contraintes. Vous agissez quand vous voulez.",
    },
  ]

  const faqs = [
    {
      question: 'Est-ce légal ?',
      answer:
        "Oui, l'apport d'affaires est une activité déclarée et parfaitement encadrée par la loi.",
    },
    {
      question: 'Dois-je être agent immobilier ?',
      answer:
        "Absolument pas. Vous restez un indicateur, vous n'intervenez pas dans la transaction.",
    },
    {
      question: "L'application est-elle payante ?",
      answer:
        "Non, l'accès au réseau et l'utilisation de l'outil sont 100% gratuits pour nos apporteurs d'affaires.",
    },
  ]

  const ctaLink = 'https://propertips.com/signup.php?code_invitation=H4XQZP1163700&lang=en_EN'

  return (
    <main className="min-h-screen">
      {/* Section 1 : Hero / Accroche */}
      <section
        className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-marine-dark/80"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transformez votre réseau en revenus immobiliers.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Ne laissez plus passer les opportunités autour de vous. Devenez
            apporteur d&apos;affaires et touchez une commission sur chaque vente
            finalisée, sans changer de métier.
          </p>
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 inline-block"
          >
            Rejoindre l&apos;équipe gratuitement
          </a>
        </div>
      </section>

      {/* Section 2 : Le Concept en 3 Étapes */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-marine mb-4">
            Comment ça fonctionne ?
          </h2>
          <p className="text-center text-gray-500 mb-12 md:mb-16 text-lg">
            3 étapes simples pour générer des revenus
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-orange/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">{step.icon}</span>
                </div>
                <div className="inline-block bg-marine text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                  Étape {step.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-marine mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 : Pourquoi choisir ce modèle */}
      <section className="py-16 md:py-24 px-4 bg-marine text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 md:mb-16">
            Pourquoi choisir ce modèle ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avantages.map((avantage, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
              >
                <div className="text-5xl mb-6">{avantage.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  {avantage.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {avantage.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 inline-block"
            >
              Rejoindre l&apos;équipe gratuitement
            </a>
          </div>
        </div>
      </section>

      {/* Section 4 : Quel gain pour vous */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-marine mb-4">
            Quel gain pour vous ?
          </h2>
          <p className="text-gray-500 mb-10 text-lg">La réalité du terrain</p>

          <div className="card border-l-4 border-orange text-left mb-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Un complément de revenu concret.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Le montant de votre commission est lié à la finalisation de la
              vente chez le notaire. Bien qu&apos;il varie selon le prix du bien
              et les honoraires d&apos;agence, voici les chiffres constatés sur
              le réseau :
            </p>

            <div className="bg-orange/5 border border-orange/20 rounded-xl p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-orange mb-1">
                    ~500 €
                  </div>
                  <div className="text-gray-600 font-medium">
                    en moyenne par recommandation réussie
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              <strong className="text-marine">Simplicité :</strong> Un simple
              signalement de quelques minutes peut ainsi générer un gain
              significatif dès que la transaction est actée.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 : CTA Final */}
      <section className="py-16 md:py-24 px-4 bg-marine text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Prêt à monétiser votre carnet d&apos;adresses ?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
            Inscrivez-vous dès maintenant pour activer votre compte et commencer
            à signaler vos premiers projets.
          </p>
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange hover:bg-orange-dark text-white font-bold text-lg md:text-xl px-10 md:px-14 py-4 md:py-5 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            S&apos;inscrire sur ProperTips via Immo-Relais
          </a>
        </div>
      </section>

      {/* Section 6 : FAQ */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-marine mb-4">
            Questions fréquentes
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">
            Lever les derniers doutes
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-marine pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-orange flex-shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
