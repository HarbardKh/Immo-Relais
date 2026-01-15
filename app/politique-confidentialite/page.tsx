import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Immo-Réso',
  description: 'Politique de confidentialité et protection des données personnelles',
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-marine mb-8">
            Politique de Confidentialité
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">1. Collecte des Données</h2>
              <p className="text-gray-700 mb-4">
                Dans le cadre de notre service de mise en relation avec des conseillers immobiliers, 
                nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Informations relatives à votre projet immobilier (type de bien, localisation, surface, etc.)</li>
                <li>Données de navigation (via cookies techniques)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">2. Finalité du Traitement</h2>
              <p className="text-gray-700 mb-4">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Mise en relation avec un conseiller immobilier certifié</li>
                <li>Traitement de votre demande d'estimation immobilière</li>
                <li>Amélioration de nos services</li>
                <li>Respect de nos obligations légales et réglementaires</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">3. Base Légale</h2>
              <p className="text-gray-700 mb-4">
                Le traitement de vos données personnelles est fondé sur :
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Votre consentement explicite (case cochée lors de la soumission du formulaire)</li>
                <li>L'exécution d'une mission d'intérêt public (mise en relation avec des professionnels certifiés)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">4. Conservation des Données</h2>
              <p className="text-gray-700 mb-4">
                Vos données personnelles sont conservées pendant une durée maximale de <strong>3 ans</strong> 
                à compter de la dernière interaction, sauf obligation légale contraire.
              </p>
              <p className="text-gray-700 mb-4">
                Passé ce délai, vos données sont supprimées de manière sécurisée.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">5. Destinataires des Données</h2>
              <p className="text-gray-700 mb-4">
                Vos données personnelles sont transmises aux destinataires suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Les conseillers immobiliers certifiés du réseau IAD pour le traitement de votre demande</li>
                <li>Nos prestataires techniques (hébergement, outils de traitement) dans le cadre strict de leurs missions</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Nous ne vendons jamais vos données à des tiers.</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">6. Vos Droits</h2>
              <p className="text-gray-700 mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Droit d'accès :</strong> Vous pouvez obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> Vous pouvez corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> Vous pouvez demander la limitation du traitement</li>
                <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré</li>
                <li><strong>Droit de retrait du consentement :</strong> Vous pouvez retirer votre consentement à tout moment</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : 
                <a href="mailto:contact@immo-reso.fr" className="text-orange hover:underline ml-1">
                  contact@immo-reso.fr
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">7. Sécurité des Données</h2>
              <p className="text-gray-700 mb-4">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou altération.
              </p>
              <p className="text-gray-700 mb-4">
                Ces mesures incluent notamment :
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Chiffrement des données en transit (HTTPS)</li>
                <li>Validation et sanitization des données d'entrée</li>
                <li>Rate limiting pour prévenir les abus</li>
                <li>Protection CSRF contre les attaques</li>
                <li>Accès restreint aux données personnelles</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">8. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Notre site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement du service. 
                Aucun cookie de suivi ou de publicité n'est utilisé.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">9. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, 
                vous pouvez nous contacter :
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email :</strong>{' '}
                <a href="mailto:contact@immo-reso.fr" className="text-orange hover:underline">
                  contact@immo-reso.fr
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-marine mb-4">10. Réclamation</h2>
              <p className="text-gray-700 mb-4">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation 
                auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <p className="text-gray-700 mb-4">
                <strong>CNIL</strong><br />
                3 Place de Fontenoy - TSA 80715<br />
                75334 PARIS CEDEX 07<br />
                Téléphone : 01 53 73 22 22<br />
                Site web :{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                  www.cnil.fr
                </a>
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href="/" 
                className="text-orange hover:underline font-medium"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

