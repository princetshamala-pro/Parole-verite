# Guide de Déploiement - Parole & Vérité

## 📱 Prérequis

- Android SDK 24+ (API Level 24)
- Java Development Kit (JDK) 11+
- Node.js 16+
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)

## 🔑 Configuration Google Play

### 1. Créer un compte Google Play Developer
- Accédez à [Google Play Console](https://play.google.com/console)
- Créez un compte développeur (frais uniques: 25€)
- Acceptez les conditions d'utilisation

### 2. Créer une application
- Cliquez sur "Créer une application"
- Nom: "Parole & Vérité"
- Sélectionnez la langue par défaut: Français
- Catégorie: Livres et Références
- Acceptez les déclarations de conformité

### 3. Générer une clé de signature
```bash
# Générer une clé de signature (à faire une seule fois)
keytool -genkey -v -keystore parole-verite.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias parole-verite

# Répondez aux questions:
# - Mot de passe du keystore: [votre mot de passe]
# - Prénom et nom: [votre nom]
# - Unité organisationnelle: [votre organisation]
# - Nom de l'organisation: [votre organisation]
# - Ville: [votre ville]
# - État/Province: [votre état]
# - Code pays: [votre code pays]
```

## 🏗️ Build APK (Tests)

### 1. Préparer le projet
```bash
cd /home/ubuntu/parole-verite
npm install
```

### 2. Générer APK
```bash
# Utiliser EAS Build (recommandé)
eas build --platform android --local

# Ou utiliser Expo CLI
expo build:android -t apk
```

### 3. Télécharger et tester
- Le fichier APK sera disponible après la compilation
- Transférez-le sur un appareil Android
- Installez et testez toutes les fonctionnalités

## 📦 Build AAB (Publication)

### 1. Configurer EAS
```bash
# Initialiser EAS
eas init

# Configurer la signature
eas credentials
```

### 2. Générer AAB
```bash
# Build AAB pour Google Play
eas build --platform android --local

# Ou avec Expo CLI
expo build:android -t app-bundle
```

### 3. Télécharger sur Google Play Console
- Allez dans "Versions" → "Production"
- Cliquez sur "Créer une version"
- Téléchargez le fichier AAB
- Remplissez les informations requises

## 📝 Informations Google Play

### Description
```
Parole & Vérité est une application biblique complète offrant:

✨ Bible complète (Louis Segond)
- Navigation intuitive par livre, chapitre, verset
- Recherche de versets
- Marque-pages et notes personnelles
- Taille de police ajustable

📚 Médiathèque
- 8 catégories de contenu biblique
- Prédications et enseignements
- Articles et ressources

🎯 Quiz Bibliques
- 10 quiz avec 10 questions chacun
- Chronomètre 20s par question
- Système de scoring
- Progression sauvegardée

🤖 Assistant IA
- Chat biblique avec réponses intelligentes
- 5 questions/jour (gratuit)
- Illimité pour les abonnés Premium

💎 Premium
- Pas de publicités
- IA illimitée
- Contenu exclusif
- Lecture hors-ligne

Gratuit avec options d'abonnement.
```

### Captures d'écran
- Téléchargez 2-8 captures d'écran de haute qualité
- Format: 1080 x 1920 pixels (9:16)
- Montrez les principales fonctionnalités

### Icône
- Format: PNG carré
- Taille: 512 x 512 pixels
- Pas de bordures arrondies

### Catégorie
- Livres et Références

### Classification
- Contenu: Tous les publics
- Âge: 3+

## 🔒 Sécurité

### Avant la publication
1. ✅ Changez le mot de passe admin (admin123)
2. ✅ Vérifiez les permissions Android
3. ✅ Testez sur plusieurs appareils
4. ✅ Vérifiez la conformité RGPD
5. ✅ Ajoutez une politique de confidentialité

### Permissions requises
```json
{
  "permissions": [
    "android.permission.INTERNET",
    "android.permission.ACCESS_NETWORK_STATE",
    "android.permission.READ_EXTERNAL_STORAGE",
    "android.permission.WRITE_EXTERNAL_STORAGE"
  ]
}
```

## 📊 Après la publication

### Monitoring
- Consultez Google Play Console régulièrement
- Vérifiez les avis utilisateurs
- Analysez les crashs et erreurs
- Suivez les téléchargements et installations

### Mises à jour
```bash
# Pour publier une mise à jour
# 1. Augmentez la version dans app.config.ts
# 2. Générez un nouvel AAB
# 3. Téléchargez sur Google Play Console
```

## 🆘 Dépannage

### Erreur: "Keystore not found"
```bash
# Assurez-vous que le fichier keystore existe
ls -la parole-verite.keystore
```

### Erreur: "Build failed"
```bash
# Nettoyez et réessayez
npm run clean
npm install
eas build --platform android --local
```

### Erreur: "Invalid package name"
- Vérifiez que le bundle ID suit le format: `space.manus.parole.verite`
- Modifiez dans `app.config.ts` si nécessaire

## 📞 Support

Pour toute question:
- Consultez la documentation Expo: https://docs.expo.dev
- Consultez la documentation Google Play: https://developer.android.com
- Contactez le support Manus: https://help.manus.im

---

**Bonne chance pour la publication! 🚀**
