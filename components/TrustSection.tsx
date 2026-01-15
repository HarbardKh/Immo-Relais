'use client'

export default function TrustSection() {
  return (
    <section className="py-16 px-4 bg-marine text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Nous mettons en relation vendeurs, acheteurs et agents immobiliers experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4">Notre Rôle</h3>
            <p className="text-gray-200 leading-relaxed">
              Nous vous mettons en relation avec des agents immobiliers certifiés et expérimentés, 
              spécialisés dans votre région, pour vous accompagner dans votre projet.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-4">Le Réseau IAD</h3>
            <p className="text-gray-200 leading-relaxed">
              <strong className="text-orange">IAD est le 1er réseau de mandataires immobiliers français</strong> 
              en nombre d'agents et en chiffre d'affaires. Cette force de réseau est un atout majeur 
              pour réussir votre vente ou trouver le bien recherché !
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">100%</div>
            <div className="text-gray-200">Gratuit pour vous</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">0</div>
            <div className="text-gray-200">Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">24h</div>
            <div className="text-gray-200">Mise en relation</div>
          </div>
        </div>
      </div>
    </section>
  )
}

