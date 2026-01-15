'use client'

import { useState, useEffect } from 'react'

interface QuizProps {
  sourceRef: string
}

type ProjetType = 'Vendre' | 'Acheter' | ''
type BienType = 'Maison' | 'Appartement' | ''
type ProjetDelai = 'Moins de 3 mois' | 'D\'ici 6 mois' | 'Simple estimation' | ''

interface QuizData {
  projet_type: ProjetType
  bien_type: BienType
  bien_localisation: string
  bien_surface: string
  bien_description: string
  projet_delai: ProjetDelai
  contact_nom: string
  contact_prenom: string
  contact_email: string
  contact_tel: string
  rgpd_consent: boolean
}

const INITIAL_DATA: QuizData = {
  projet_type: '',
  bien_type: '',
  bien_localisation: '',
  bien_surface: '',
  bien_description: '',
  projet_delai: '',
  contact_nom: '',
  contact_prenom: '',
  contact_email: '',
  contact_tel: '',
  rgpd_consent: false,
}

export default function Quiz({ sourceRef }: QuizProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<QuizData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Récupérer le token CSRF au chargement
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/submit')
        if (response.ok) {
          const data = await response.json()
          setCsrfToken(data.csrfToken)
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Erreur lors de la récupération du token CSRF:', error)
        }
      }
    }
    fetchCSRFToken()
  }, [])

  const updateData = (field: keyof QuizData, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 7) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Fonctions de validation
  const validateEmail = (email: string): boolean => {
    if (!email || typeof email !== 'string') return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim()) && email.length <= 255
  }

  const validatePhone = (phone: string): boolean => {
    if (!phone || typeof phone !== 'string') return false
    // Accepte les numéros français (10-15 chiffres, avec ou sans espaces/tirets)
    const phoneRegex = /^[0-9\s\-+()]{10,20}$/
    const digitsOnly = phone.replace(/\D/g, '')
    return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.projet_type !== ''
      case 2:
        return data.bien_type !== ''
      case 3:
        return data.bien_localisation.trim() !== '' && data.bien_localisation.trim().length <= 200
      case 4:
        const surface = Number(data.bien_surface)
        return data.bien_surface.trim() !== '' && !isNaN(surface) && surface > 0 && surface <= 10000
      case 5:
        return data.bien_description.length <= 2000 // Description est optionnelle mais limitée
      case 6:
        return data.projet_delai !== ''
      case 7:
        return (
          data.contact_nom.trim() !== '' &&
          data.contact_nom.trim().length <= 100 &&
          data.contact_prenom.trim() !== '' &&
          data.contact_prenom.trim().length <= 100 &&
          validateEmail(data.contact_email) &&
          validatePhone(data.contact_tel) &&
          data.rgpd_consent
        )
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return

    // Vérifier que le token CSRF est disponible
    if (!csrfToken) {
      setErrorMessage('Erreur de sécurité. Veuillez recharger la page.')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const payload = {
      Date: new Date().toISOString(),
      source_ref: sourceRef,
      source_region: 'default',
      projet_type: data.projet_type,
      bien_type: data.bien_type,
      bien_localisation: data.bien_localisation,
      bien_surface: data.bien_surface,
      bien_description: data.bien_description,
      projet_delai: data.projet_delai,
      contact_nom: data.contact_nom,
      contact_prenom: data.contact_prenom,
      contact_email: data.contact_email,
      contact_tel: data.contact_tel,
    }

    // Log des données en développement uniquement
    if (process.env.NODE_ENV === 'development') {
      console.log('📋 Données du formulaire:', payload)
    }

    try {
      // En développement, on peut aussi envoyer à l'API locale pour tester
      const isDevelopment = process.env.NODE_ENV === 'development'
      const useLocalApi = isDevelopment && !process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL
      
      // Si pas de webhook configuré, utiliser l'API locale en développement
      if (useLocalApi) {
        console.warn('⚠️ Webhook Make.com non configuré, utilisation de l\'API locale')
        const localResponse = await fetch('/api/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        
        if (!localResponse.ok) {
          throw new Error('Erreur lors de l\'envoi à l\'API locale')
        }
        
        const localData = await localResponse.json()
        console.log('✅ Données envoyées à l\'API locale:', localData)
        setSubmitStatus('success')
        setData(INITIAL_DATA)
        setStep(1)
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
        return
      }

      // Utiliser la route API proxy sécurisée
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(payload),
      })

      if (isDevelopment) {
        console.log('📡 Réponse reçue - Status:', response.status, response.statusText)
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
        
        // Gérer le rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After')
          const retrySeconds = retryAfter ? parseInt(retryAfter, 10) : 3600
          const retryMinutes = Math.ceil(retrySeconds / 60)
          setErrorMessage(`Trop de tentatives. Veuillez réessayer dans ${retryMinutes} minute${retryMinutes > 1 ? 's' : ''}.`)
        } else {
          setErrorMessage(errorData.error || `Erreur ${response.status}`)
        }
        
        if (isDevelopment) {
          console.error('❌ Erreur HTTP:', response.status)
          console.error('❌ Détails:', errorData)
        }
        
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`)
      }

      const responseData = await response.json()
      
      if (isDevelopment) {
        console.log('✅ Réponse du serveur:', responseData)
        console.log('✅ Données envoyées avec succès')
      }

      setSubmitStatus('success')
      setData(INITIAL_DATA)
      setStep(1)
      // Réinitialiser après 3 secondes pour permettre de voir le message de succès
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      // Log détaillé uniquement en développement
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Erreur lors de l\'envoi:', error)
        console.error('❌ Type d\'erreur:', error instanceof Error ? error.message : String(error))
        // Utiliser alert uniquement en développement pour le débogage
        if (error instanceof Error && error.name === 'AbortError') {
          alert('La requête a pris trop de temps. Veuillez réessayer.')
        } else if (!errorMessage) {
          alert(`Erreur: ${error instanceof Error ? error.message : String(error)}\n\nVérifiez la console pour plus de détails.`)
        }
      } else {
        // En production, log minimal pour ne pas exposer de détails
        console.error('❌ Erreur lors de l\'envoi du formulaire')
        // Ne jamais utiliser alert() en production
      }
      
      if (!errorMessage) {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.')
      }
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-marine mb-2">
              Obtenez une estimation gratuite
            </h2>
            <p className="text-gray-600">
              Répondez à quelques questions pour recevoir une estimation personnalisée
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Étape {step} sur 7
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round((step / 7) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Merci ! Votre demande a été envoyée avec succès. Un conseiller vous contactera sous peu.
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">
                ❌ {errorMessage || 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'}
              </p>
            </div>
          )}

          {/* Step 1: Vendre ou Acheter */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-marine">
                Quelle est la nature de votre projet ?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    updateData('projet_type', 'Vendre')
                    setTimeout(nextStep, 300)
                  }}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    data.projet_type === 'Vendre'
                      ? 'border-orange bg-orange/10'
                      : 'border-gray-300 hover:border-orange/50'
                  }`}
                >
                  <div className="text-4xl mb-2">💰</div>
                  <div className="font-semibold text-marine">Vendre</div>
                </button>
                <button
                  onClick={() => {
                    updateData('projet_type', 'Acheter')
                    setTimeout(nextStep, 300)
                  }}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    data.projet_type === 'Acheter'
                      ? 'border-orange bg-orange/10'
                      : 'border-gray-300 hover:border-orange/50'
                  }`}
                >
                  <div className="text-4xl mb-2">🔑</div>
                  <div className="font-semibold text-marine">Acheter</div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Type de bien */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-marine">
                Quel type de bien {data.projet_type === 'Vendre' ? 'souhaitez-vous vendre' : 'recherchez-vous'} ?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    updateData('bien_type', 'Maison')
                    setTimeout(nextStep, 300)
                  }}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    data.bien_type === 'Maison'
                      ? 'border-orange bg-orange/10'
                      : 'border-gray-300 hover:border-orange/50'
                  }`}
                >
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="font-semibold text-marine">Maison</div>
                </button>
                <button
                  onClick={() => {
                    updateData('bien_type', 'Appartement')
                    setTimeout(nextStep, 300)
                  }}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    data.bien_type === 'Appartement'
                      ? 'border-orange bg-orange/10'
                      : 'border-gray-300 hover:border-orange/50'
                  }`}
                >
                  <div className="text-4xl mb-2">🏢</div>
                  <div className="font-semibold text-marine">Appartement</div>
                </button>
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-outline">
                  Précédent
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Localisation */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-marine">
                Où se situe votre bien ?
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville et Code Postal
                </label>
                <input
                  type="text"
                  value={data.bien_localisation}
                  onChange={(e) => updateData('bien_localisation', e.target.value)}
                  placeholder="Ex: Nantes 44000"
                  className="input-field"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-outline">
                  Précédent
                </button>
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Surface */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-marine">
                Quelle est la surface approximative de votre bien ?
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface (m²)
                </label>
                <input
                  type="number"
                  value={data.bien_surface}
                  onChange={(e) => updateData('bien_surface', e.target.value)}
                  placeholder="Ex: 95"
                  min="0"
                  className="input-field"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-outline">
                  Précédent
                </button>
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Description */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-marine">
                {data.projet_type === 'Vendre' 
                  ? 'Décrivez votre bien au maximum' 
                  : 'Décrivez le bien que vous recherchez'}
              </h3>
              <p className="text-gray-600 text-sm">
                {data.projet_type === 'Vendre'
                  ? 'Plus vous nous donnez de détails (nombre de pièces, état, équipements, jardin, parking, etc.), plus nous pourrons vous donner une estimation précise.'
                  : 'Décrivez vos critères de recherche : nombre de pièces souhaité, budget, quartier préféré, équipements désirés, etc.'}
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description {data.projet_type === 'Vendre' ? 'du bien' : 'recherchée'} (optionnel)
                </label>
                <textarea
                  value={data.bien_description}
                  onChange={(e) => updateData('bien_description', e.target.value)}
                  placeholder={data.projet_type === 'Vendre'
                    ? 'Ex: Maison de 95m² avec 4 pièces, jardin de 200m², garage, rénovée en 2020, proche des écoles...'
                    : 'Ex: Recherche appartement 3-4 pièces, budget 250k€, proche centre-ville, avec balcon ou terrasse...'}
                  rows={6}
                  className="input-field resize-none"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-outline">
                  Précédent
                </button>
                <button
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Urgence */}
          {step === 6 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-marine">
                Quel est le délai de votre projet ?
              </h3>
              <div className="space-y-3">
                {(['Moins de 3 mois', 'D\'ici 6 mois', 'Simple estimation'] as ProjetDelai[]).map((delai) => (
                  <button
                    key={delai}
                    onClick={() => {
                      updateData('projet_delai', delai)
                      setTimeout(nextStep, 300)
                    }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      data.projet_delai === delai
                        ? 'border-orange bg-orange/10'
                        : 'border-gray-300 hover:border-orange/50'
                    }`}
                  >
                    <span className="font-medium text-marine">{delai}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-outline">
                  Précédent
                </button>
              </div>
            </div>
          )}

          {/* Step 7: Coordonnées */}
          {step === 7 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-marine">
                Vos coordonnées
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={data.contact_nom}
                    onChange={(e) => updateData('contact_nom', e.target.value)}
                    placeholder="Dupont"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={data.contact_prenom}
                    onChange={(e) => updateData('contact_prenom', e.target.value)}
                    placeholder="Jean"
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={data.contact_email}
                  onChange={(e) => updateData('contact_email', e.target.value)}
                  placeholder="jean@mail.com"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={data.contact_tel}
                  onChange={(e) => updateData('contact_tel', e.target.value)}
                  placeholder="0601020304"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="rgpd"
                  checked={data.rgpd_consent}
                  onChange={(e) => updateData('rgpd_consent', e.target.checked)}
                  className="mt-1 mr-2"
                  required
                />
                <label htmlFor="rgpd" className="text-sm text-gray-600">
                  J'accepte que mes données soient utilisées pour être contacté par un conseiller immobilier. 
                  Les données sont conservées pendant 3 ans maximum. 
                  <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline ml-1">
                    En savoir plus
                  </a>
                  {' '}*
                </label>
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-outline">
                  Précédent
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

