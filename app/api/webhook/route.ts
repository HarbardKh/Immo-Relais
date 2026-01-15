import { NextRequest, NextResponse } from 'next/server'

// Fonctions de validation
const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim()) && email.length <= 255
}

const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false
  // Accepte les numéros français (10 chiffres, avec ou sans espaces/tirets)
  const phoneRegex = /^[0-9\s\-+()]{10,15}$/
  const digitsOnly = phone.replace(/\D/g, '')
  return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15
}

const sanitizeString = (str: string, maxLength: number = 1000): string => {
  if (!str || typeof str !== 'string') return ''
  return str.trim().slice(0, maxLength)
}

const validatePayload = (data: any): { valid: boolean; error?: string } => {
  // Vérifier que data est un objet
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Données invalides' }
  }

  // Validation des champs obligatoires
  if (!data.contact_email || !validateEmail(data.contact_email)) {
    return { valid: false, error: 'Email invalide' }
  }

  if (!data.contact_tel || !validatePhone(data.contact_tel)) {
    return { valid: false, error: 'Téléphone invalide' }
  }

  // Validation des longueurs
  const maxLengths = {
    contact_nom: 100,
    contact_prenom: 100,
    bien_localisation: 200,
    bien_description: 2000,
  }

  for (const [field, maxLength] of Object.entries(maxLengths)) {
    if (data[field] && typeof data[field] === 'string' && data[field].length > maxLength) {
      return { valid: false, error: `Le champ ${field} est trop long` }
    }
  }

  // Limiter la taille totale du payload (10KB)
  const payloadSize = JSON.stringify(data).length
  if (payloadSize > 10000) {
    return { valid: false, error: 'Payload trop volumineux' }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  // Désactiver cette route en production (utilisée uniquement pour le développement)
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Cette route n\'est pas disponible en production' },
      { status: 404 }
    )
  }

  try {
    const data = await request.json()
    
    // Validation des données
    const validation = validatePayload(data)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    // Sanitization des données
    const sanitizedData = {
      ...data,
      contact_email: data.contact_email.trim().toLowerCase(),
      contact_tel: data.contact_tel.replace(/\s/g, ''),
      contact_nom: sanitizeString(data.contact_nom, 100),
      contact_prenom: sanitizeString(data.contact_prenom, 100),
      bien_localisation: sanitizeString(data.bien_localisation, 200),
      bien_description: sanitizeString(data.bien_description, 2000),
    }
    
    // Log des données reçues (uniquement en développement)
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Données reçues:', JSON.stringify(sanitizedData, null, 2))
    }
    
    // Ici vous pouvez ajouter votre logique :
    // - Sauvegarder dans une base de données
    // - Envoyer un email
    // - Logger dans un fichier
    // etc.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Données reçues avec succès',
      data: sanitizedData
    }, { status: 200 })
  } catch (error) {
    // Log minimal en production
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Erreur API:', error)
    } else {
      console.error('❌ Erreur API')
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur lors du traitement des données' 
    }, { status: 500 })
  }
}

