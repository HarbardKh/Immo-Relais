'use client'

export default function Hero() {
  return (
    <section 
      className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)` }}
    >
      <div className="absolute inset-0 bg-marine-dark/70"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Vendez ou achetez votre bien immobilier
        </h1>
        <p className="text-xl md:text-2xl text-gray-100">
          Expertise immobilière et accompagnement personnalisé partout en France
        </p>
      </div>
    </section>
  )
}

