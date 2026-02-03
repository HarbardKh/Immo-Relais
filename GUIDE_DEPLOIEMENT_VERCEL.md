# 🚀 Guide de Déploiement Vercel

Guide complet pour déployer votre landing page Immo-Relais sur Vercel.

---

## 📋 Prérequis

- ✅ Repo GitHub créé et code pushé
- ✅ Compte Vercel (gratuit) : [vercel.com](https://vercel.com)
- ✅ URL du webhook Make.com

---

## 🎯 Étape 1 : Connecter le Repo à Vercel

### Option A : Via l'Interface Vercel (Recommandé)

1. **Aller sur Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub

2. **Importer le projet** :
   - Cliquez sur **"Add New..."** → **"Project"**
   - Sélectionnez le repo **"HarbardKh/Immo-Relais"**
   - Cliquez sur **"Import"**

3. **Configuration du projet** :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)
   - **Install Command** : `npm install` (par défaut)

4. **Variables d'environnement** (⚠️ IMPORTANT) :
   - Cliquez sur **"Environment Variables"**
   - Ajoutez la variable suivante :
     ```
     Nom : MAKE_WEBHOOK_URL
     Valeur : https://hook.us1.make.com/votre-webhook-id
     ```
   - ⚠️ **Ne cochez PAS** "Expose to Browser" (elle doit rester côté serveur)
   - Cliquez sur **"Save"**

5. **Déployer** :
   - Cliquez sur **"Deploy"**
   - Attendez la fin du build (2-3 minutes)

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd /Users/nr23/Immo-Relais
vercel

# Suivre les instructions
# Quand demandé, ajoutez la variable d'environnement :
# MAKE_WEBHOOK_URL=https://hook.us1.make.com/votre-webhook-id
```

---

## ⚙️ Étape 2 : Configuration des Variables d'Environnement

### Variables Requises

| Variable | Description | Exemple | Côté Serveur |
|----------|-------------|---------|--------------|
| `MAKE_WEBHOOK_URL` | URL du webhook Make.com | `https://hook.us1.make.com/xxxxx` | ✅ Oui |

### ⚠️ Important

- **Utilisez `MAKE_WEBHOOK_URL`** (sans `NEXT_PUBLIC_`)
- **Ne cochez PAS** "Expose to Browser"
- L'URL restera secrète côté serveur

### Comment Ajouter dans Vercel

1. Allez dans votre projet Vercel
2. **Settings** → **Environment Variables**
3. Cliquez sur **"Add New"**
4. Remplissez :
   - **Name** : `MAKE_WEBHOOK_URL`
   - **Value** : Votre URL de webhook Make.com
   - **Environment** : Production, Preview, Development (cochez les 3)
   - **Expose to Browser** : ❌ **DÉCOCHÉ**
5. Cliquez sur **"Save"**
6. **Redéployez** le projet pour que les variables prennent effet

---

## 🔄 Étape 3 : Redéploiement après Ajout de Variables

Après avoir ajouté les variables d'environnement :

1. Allez dans **"Deployments"**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **"Redeploy"**
4. Confirmez

Ou simplement :
- Faites un nouveau push sur GitHub
- Vercel redéploiera automatiquement

---

## ✅ Étape 4 : Vérification Post-Déploiement

### 1. Vérifier que le site fonctionne

- Ouvrez l'URL fournie par Vercel (ex: `immo-relais.vercel.app`)
- Vérifiez que la page s'affiche correctement

### 2. Tester le formulaire

1. Remplissez le formulaire sur votre site en production
2. Vérifiez dans Make.com que les données arrivent bien
3. Vérifiez les logs Vercel pour détecter d'éventuelles erreurs

### 3. Vérifier les logs

Dans Vercel :
- **Deployments** → Cliquez sur le dernier déploiement
- **Functions** → Vérifiez les logs des routes API
- **Logs** → Vérifiez qu'il n'y a pas d'erreurs

### 4. Tester la page de politique de confidentialité

- Vérifiez que `/politique-confidentialite` est accessible
- Vérifiez que le lien fonctionne depuis le formulaire

---

## 🔧 Configuration Avancée

### Domaine Personnalisé (Optionnel)

1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions DNS

### Variables d'Environnement par Environnement

Vous pouvez avoir des valeurs différentes selon l'environnement :
- **Production** : Webhook de production
- **Preview** : Webhook de test
- **Development** : Webhook de développement

---

## 🐛 Dépannage

### Le formulaire ne fonctionne pas

1. **Vérifier les variables d'environnement** :
   - `MAKE_WEBHOOK_URL` est bien définie
   - "Expose to Browser" est décoché

2. **Vérifier les logs Vercel** :
   - Allez dans **Deployments** → **Functions** → `/api/submit`
   - Regardez les erreurs éventuelles

3. **Vérifier le webhook Make.com** :
   - Le scénario Make.com est bien activé
   - L'URL du webhook est correcte

### Erreur 500 sur `/api/submit`

- Vérifiez que `MAKE_WEBHOOK_URL` est bien configurée
- Vérifiez les logs Vercel pour plus de détails
- Vérifiez que le webhook Make.com est actif

### Les données n'arrivent pas dans Make.com

1. Vérifiez l'URL du webhook dans Vercel
2. Testez le webhook directement avec curl :
   ```bash
   curl -X POST https://hook.us1.make.com/votre-webhook-id \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```
3. Vérifiez que le scénario Make.com est activé

---

## 📊 Monitoring

### Vercel Analytics (Optionnel)

1. Allez dans **Settings** → **Analytics**
2. Activez Vercel Analytics (gratuit)
3. Suivez les performances de votre site

### Logs en Temps Réel

- **Deployments** → Cliquez sur un déploiement
- **Functions** → Voir les logs en temps réel
- **Logs** → Voir tous les logs

---

## ✅ Checklist de Déploiement

- [ ] Repo GitHub connecté à Vercel
- [ ] Variable `MAKE_WEBHOOK_URL` configurée
- [ ] "Expose to Browser" décoché pour `MAKE_WEBHOOK_URL`
- [ ] Déploiement réussi
- [ ] Site accessible
- [ ] Formulaire testé et fonctionnel
- [ ] Données reçues dans Make.com
- [ ] Page de politique de confidentialité accessible
- [ ] Logs vérifiés (pas d'erreurs)

---

## 🎉 Félicitations !

Votre landing page est maintenant déployée sur Vercel et prête à recevoir des leads !

**Prochaines étapes** :
- Configurer votre scénario Make.com pour traiter les leads
- Ajouter un domaine personnalisé (optionnel)
- Monitorer les performances

---

**Besoin d'aide ?** Consultez la [documentation Vercel](https://vercel.com/docs)

