# 📡 Guide : Créer un Webhook Make.com

## Qu'est-ce qu'un webhook ?

Un webhook est une URL unique que Make.com vous donne. Quand votre site envoie des données à cette URL, Make.com les reçoit automatiquement et peut les traiter (stocker dans Google Sheets, envoyer un email, etc.).

## 🎯 Étapes pour créer un webhook dans Make.com

### Étape 1 : Se connecter à Make.com

1. Allez sur [https://www.make.com](https://www.make.com)
2. Connectez-vous ou créez un compte (gratuit avec limitations)

### Étape 2 : Créer un nouveau scénario

1. Cliquez sur **"Create a new scenario"** (Créer un nouveau scénario)
2. Donnez un nom à votre scénario, par exemple : "Immo-relais - Réception des leads"

### Étape 3 : Ajouter le module Webhook

1. Dans la barre de recherche de modules, tapez **"webhook"**
2. Sélectionnez **"Webhooks"** > **"Custom webhook"**
3. Cliquez sur le module pour l'ajouter

### Étape 4 : Configurer le webhook

1. Cliquez sur le module webhook que vous venez d'ajouter
2. Vous verrez une fenêtre de configuration. **Laissez les paramètres par défaut** :
   - Le webhook est automatiquement en mode "Instant" (réception immédiate)
   - Pas besoin de modifier "Data structure" dans Advanced settings (c'est optionnel)

3. Cliquez simplement sur **"Save"** (Sauvegarder) en bas de la fenêtre

### Étape 5 : Récupérer l'URL du webhook

1. Une fois le module sauvegardé, **l'URL du webhook s'affiche directement** dans le module
2. Vous verrez une URL qui ressemble à :
   ```
   https://hook.us1.make.com/xxxxxxxxxxxxx
   ```
   ou
   ```
   https://hook.eu1.make.com/xxxxxxxxxxxxx
   ```

3. **Cliquez sur l'URL** ou **copiez-la** - c'est votre webhook !

💡 **Astuce** : L'URL est généralement visible juste en dessous du titre du module webhook, ou dans un champ "Webhook URL"

### Étape 6 : Activer le scénario

1. Cliquez sur le bouton **"Run once"** ou **"Turn on"** en haut à droite
2. Le scénario est maintenant actif et prêt à recevoir des données

### Étape 7 : Configurer votre site

1. Créez un fichier `.env.local` à la racine de votre projet
2. Ajoutez cette ligne (remplacez par votre URL) :
   ```env
   NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.us1.make.com/votre-url-ici
   ```

3. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

## ✅ Tester le webhook

1. Remplissez le formulaire sur votre site
2. Dans Make.com, allez dans votre scénario
3. Cliquez sur **"Execution history"** (Historique d'exécution)
4. Vous devriez voir les données reçues !

## 🔄 Prochaines étapes dans Make.com

Une fois que vous recevez les données, vous pouvez ajouter d'autres modules :

1. **Google Sheets** : Stocker les données dans une feuille
2. **Email** : Envoyer une notification à l'ambassadeur
3. **Filter** : Filtrer selon le `source_ref` pour router vers le bon ambassadeur
4. **ProperTips API** : Envoyer les données à ProperTips

## 💡 Astuce

Pour tester sans Make.com, vous pouvez utiliser l'API locale (`/api/webhook`) qui log les données dans la console de votre terminal.

