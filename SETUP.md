# 🚀 Guide de Configuration

## Configuration du Webhook Make.com

### Étape 1 : Créer un scénario Make.com

1. Connectez-vous à [Make.com](https://www.make.com)
2. Créez un nouveau scénario
3. Ajoutez un module **Webhooks** > **Custom webhook**
4. Choisissez "Instant" pour recevoir les données en temps réel
5. Copiez l'URL du webhook générée (format : `https://hook.us1.make.com/xxxxx`)

### Étape 2 : Configurer l'environnement

1. Créez un fichier `.env.local` à la racine du projet :
```bash
cp env.example .env.local
```

2. Éditez `.env.local` et ajoutez votre URL de webhook :
```env
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.us1.make.com/votre-webhook-id
```

3. Redémarrez le serveur de développement :
```bash
npm run dev
```

### Étape 3 : Tester

1. Remplissez le formulaire sur `http://localhost:3000`
2. Vérifiez dans Make.com que les données arrivent bien
3. Configurez votre scénario Make.com pour :
   - Stocker dans Google Sheets
   - Envoyer une notification à l'ambassadeur
   - etc.

> 💡 **Besoin d'aide pour créer le webhook ?** Consultez le fichier `GUIDE_WEBHOOK.md` pour un guide pas à pas avec captures d'écran.

## Test Local (Sans Make.com)

Si vous voulez tester sans configurer Make.com :

1. Ne créez **pas** de fichier `.env.local` (ou laissez `NEXT_PUBLIC_MAKE_WEBHOOK_URL` vide)
2. Les données seront envoyées à l'API locale (`/api/webhook`)
3. Ouvrez la console du terminal où tourne `npm run dev` pour voir les données reçues

## Format des Données Reçues

Make.com recevra un JSON avec cette structure :

```json
{
  "Date": "2024-01-15T10:30:00.000Z",
  "source_ref": "ID_AMBASSADEUR",
  "source_region": "default",
  "projet_type": "Vendre",
  "bien_type": "Maison",
  "bien_localisation": "Nantes 44000",
  "bien_surface": "95",
  "bien_description": "Description du bien...",
  "projet_delai": "Moins de 3 mois",
  "contact_nom": "Dupont",
  "contact_prenom": "Jean",
  "contact_email": "jean@mail.com",
  "contact_tel": "0601020304"
}
```

## Prochaines Étapes dans Make.com

Une fois les données reçues, vous pouvez :

1. **Stocker dans Google Sheets** : Module Google Sheets > Add a row
2. **Notifier l'ambassadeur** : Module Email/SMS avec le `source_ref`
3. **Routage automatique** : Utiliser `source_region` pour router vers le bon agent
4. **Intégration ProperTips** : Envoyer les données à l'API ProperTips

