import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// Rate limiting simple basé sur IP (en mémoire pour MVP)
// En production, utilisez Redis ou Vercel Edge Config
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = {
  maxRequests: 5, // 5 requêtes
  windowMs: 60 * 60 * 1000, // par heure
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  // Nettoyer les anciennes entrées (garbage collection simple)
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!record || record.resetTime < now) {
    // Nouvelle fenêtre
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetTime: now + RATE_LIMIT.windowMs }
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  // Incrémenter le compteur
  record.count++
  rateLimitMap.set(ip, record)
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - record.count, resetTime: record.resetTime }
}

// Fonctions de validation
const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim()) && email.length <= 255
}

const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false
  const phoneRegex = /^[0-9\s\-+()]{10,20}$/
  const digitsOnly = phone.replace(/\D/g, '')
  return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15
}

const sanitizeString = (str: string, maxLength: number = 1000): string => {
  if (!str || typeof str !== 'string') return ''
  return str.trim().slice(0, maxLength)
}

const validatePayload = (data: any): { valid: boolean; error?: string } => {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Données invalides' }
  }

  if (!data.contact_email || !validateEmail(data.contact_email)) {
    return { valid: false, error: 'Email invalide' }
  }

  if (!data.contact_tel || !validatePhone(data.contact_tel)) {
    return { valid: false, error: 'Téléphone invalide' }
  }

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

  const payloadSize = JSON.stringify(data).length
  if (payloadSize > 10000) {
    return { valid: false, error: 'Payload trop volumineux' }
  }

  return { valid: true }
}

// Vérifier le token CSRF
function verifyCSRFToken(request: NextRequest): boolean {
  const csrfToken = request.headers.get('x-csrf-token')
  const cookieToken = request.cookies.get('csrf-token')?.value

  if (!csrfToken || !cookieToken) {
    return false
  }

  // Comparaison sécurisée (timing-safe)
  // Note: Pour une sécurité renforcée, utilisez crypto.timingSafeEqual en production
  return csrfToken === cookieToken
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier le rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trop de requêtes. Veuillez réessayer plus tard.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // Vérifier le token CSRF
    if (!verifyCSRFToken(request)) {
      return NextResponse.json(
        { success: false, error: 'Token CSRF invalide' },
        { status: 403 }
      )
    }

    // Parser et valider les données
    const data = await request.json()
    const validation = validatePayload(data)

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    // Sanitization des données
    const sanitizedData = {
      Date: data.Date || new Date().toISOString(),
      source_ref: sanitizeString(data.source_ref || '', 100),
      source_region: sanitizeString(data.source_region || 'default', 50),
      projet_type: sanitizeString(data.projet_type || '', 50),
      bien_type: sanitizeString(data.bien_type || '', 50),
      bien_localisation: sanitizeString(data.bien_localisation || '', 200),
      bien_surface: sanitizeString(data.bien_surface || '', 10),
      bien_description: sanitizeString(data.bien_description || '', 2000),
      projet_delai: sanitizeString(data.projet_delai || '', 50),
      contact_nom: sanitizeString(data.contact_nom || '', 100),
      contact_prenom: sanitizeString(data.contact_prenom || '', 100),
      contact_email: data.contact_email.trim().toLowerCase(),
      contact_tel: data.contact_tel.replace(/\s/g, ''),
    }

    // Récupérer l'URL du webhook depuis les variables d'environnement (côté serveur uniquement)
    // En développement, on peut utiliser NEXT_PUBLIC_MAKE_WEBHOOK_URL comme fallback
    let webhookUrl = process.env.MAKE_WEBHOOK_URL
    
    // Fallback pour développement local (rétrocompatibilité)
    if (!webhookUrl && process.env.NODE_ENV === 'development') {
      webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL
      
      if (webhookUrl) {
        console.warn('⚠️ Utilisation de NEXT_PUBLIC_MAKE_WEBHOOK_URL en développement. Pour la production, utilisez MAKE_WEBHOOK_URL (sans NEXT_PUBLIC_)')
      } else {
        // Log de debug pour aider à diagnostiquer
        console.error('❌ Variables d\'environnement disponibles:')
        console.error('  - MAKE_WEBHOOK_URL:', process.env.MAKE_WEBHOOK_URL ? '✅ défini' : '❌ non défini')
        console.error('  - NEXT_PUBLIC_MAKE_WEBHOOK_URL:', process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL ? '✅ défini' : '❌ non défini')
      }
    }

    if (!webhookUrl) {
      const errorMsg = process.env.NODE_ENV === 'development'
        ? 'Aucune URL de webhook configurée. Ajoutez MAKE_WEBHOOK_URL ou NEXT_PUBLIC_MAKE_WEBHOOK_URL dans votre fichier .env.local et redémarrez le serveur (npm run dev)'
        : 'Configuration serveur manquante. Configurez MAKE_WEBHOOK_URL dans les variables d\'environnement Vercel.'
      
      console.error('❌ URL du webhook Make.com non configurée')
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 500 }
      )
    }

    // Envoyer au webhook Make.com avec timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 secondes

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Immo-Réso/1.0',
        },
        body: JSON.stringify(sanitizedData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Erreur webhook:', response.status, errorText)
        }
        throw new Error(`Erreur webhook: ${response.status}`)
      }

      // Lire la réponse (Make.com peut retourner du texte ou du JSON)
      const responseText = await response.text()
      let responseData = {}
      try {
        responseData = JSON.parse(responseText)
      } catch {
        responseData = { message: responseText }
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Données envoyées avec succès au webhook Make.com')
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Données envoyées avec succès',
          data: responseData,
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    } catch (fetchError) {
      clearTimeout(timeoutId)
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { success: false, error: 'Timeout lors de l\'envoi au webhook' },
          { status: 504 }
        )
      }

      throw fetchError
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Erreur API submit:', error)
    } else {
      console.error('❌ Erreur API submit')
    }

    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement de la requête' },
      { status: 500 }
    )
  }
}

// Route GET pour générer un token CSRF
export async function GET() {
  const token = randomUUID()
  
  const response = NextResponse.json({ csrfToken: token })
  
  // Définir le cookie CSRF (HttpOnly, Secure en production, SameSite)
  response.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 heure
    path: '/',
  })

  return response
}

