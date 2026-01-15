# Immo-relais

Plateforme de génération de leads immobiliers avec système de parrainage et adaptation régionale dynamique.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (déploiement)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

1. Cloner le projet
2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env.local
```

Puis éditer `.env.local` et ajouter votre URL de webhook Make.com :
```
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.us1.make.com/votre-webhook-id
```

## 🏃 Développement

Lancer le serveur de développement :
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📦 Build

```bash
npm run build
npm start
```

## 🎯 Fonctionnalités

- **Adaptation régionale dynamique** : La landing page s'adapte selon le paramètre `region` dans l'URL
- **Système de parrainage** : Tracking des ambassadeurs via le paramètre `ref`
- **Quiz de qualification** : Tunnel en 6 étapes pour capturer les leads
- **Intégration Make.com** : Envoi automatique des données vers le webhook configuré

## 🔗 Paramètres URL

- `?ref=AMBASSADEUR_ID` : Identifiant de l'ambassadeur
- `?region=REGION_ID` : Identifiant de la région (ex: nantes, lyon, bordeaux)

Exemple : `https://votre-site.com/?ref=AMB123&region=nantes`

## 📁 Structure

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil avec logique de routing
│   └── globals.css         # Styles globaux
├── components/
│   ├── Hero.tsx            # Section hero avec image de fond
│   ├── Advantages.tsx     # Section avantages (Bento Grid)
│   └── Quiz.tsx            # Composant quiz multi-étapes
├── config/
│   └── regions.json        # Configuration des régions
└── public/                 # Assets statiques
```

## 🎨 Design

- **Couleurs** : Bleu Marine (#1e3a5f) et Orange (#ff6b35)
- **Style** : Clean, professionnel, rassurant
- **Layout** : Bento Grid pour les avantages

## 📝 Format des données envoyées au webhook

```json
{
  "Date": "2024-01-15T10:30:00.000Z",
  "source_ref": "ID_AMBASSADEUR",
  "source_region": "default",
  "projet_type": "Vendre",
  "bien_type": "Maison",
  "bien_localisation": "Nantes 44000",
  "bien_surface": "95",
  "bien_description": "Maison avec jardin, rénovée...",
  "projet_delai": "Moins de 3 mois",
  "contact_nom": "Dupont",
  "contact_prenom": "Jean",
  "contact_email": "jean@mail.com",
  "contact_tel": "0601020304"
}
```

## 🧪 Test du formulaire

En mode développement, les données du formulaire sont loggées dans la console du navigateur pour faciliter le débogage.

Pour tester sans webhook Make.com, vous pouvez :
1. Ouvrir la console du navigateur (F12)
2. Remplir le formulaire
3. Vérifier les logs dans la console avant l'envoi

