# Documentation Complète - Parole & Vérité

## 📱 Vue d'ensemble

**Parole & Vérité** est une application mobile biblique complète offrant une expérience spirituelle enrichie avec:
- Bible complète (Louis Segond)
- Médiathèque avec 8 catégories
- 10 quiz bibliques interactifs
- Assistant IA pour questions bibliques
- Système d'abonnement Premium
- Panneau d'administration

## 🎯 Fonctionnalités Principales

### 1. 📖 Bible Complète
- **66 livres bibliques** (Ancien + Nouveau Testament)
- **Navigation intuitive**: Livre → Chapitre → Verset
- **Recherche de versets** par texte
- **Marque-pages** pour sauvegarder les versets favoris
- **Notes personnelles** attachées aux versets
- **Taille de police ajustable** (A-, A+)
- **Partage de versets** facile

### 2. 📚 Médiathèque
8 catégories principales:
1. **Jésus-Christ** - Contenu sur la vie de Jésus
2. **Écriture** - Bible complète intégrée
3. **Référence de la Bible** - Dictionnaire biblique
4. **Enseignement** - Articles d'enseignement
5. **Musique Méditation** - Musique et méditations
6. **Principes** - Principes bibliques
7. **Histoires** - Histoires bibliques
8. **Étude de la Bible** - Ressources d'étude

### 3. 🎯 Quiz Bibliques
**10 quiz disponibles:**
1. Vie de Jésus
2. Ancien Testament
3. Prophètes
4. Psaumes
5. Miracles
6. Paraboles
7. Apôtres
8. Création
9. Noël
10. Pâques

**Caractéristiques:**
- 10 questions par quiz
- Chronomètre 20s par question
- Réponses multiples (4 options)
- Feedback immédiat (correct/incorrect)
- Système de scoring
- Sauvegarde des scores

### 4. 🤖 Assistant IA
- **Chat biblique** - Posez des questions sur la Bible
- **Réponses intelligentes** - Explications bibliques
- **Limitation 5 questions/jour** (gratuit)
- **Illimité pour Premium** - Abonnés sans limite
- **Historique** - Conserve la conversation
- **Effacer l'historique** - Option disponible

### 5. 💎 Système d'Abonnement
**Plan Premium (3,99€/mois):**
- ✅ Pas de publicités
- ✅ IA illimitée
- ✅ Contenu exclusif
- ✅ Lecture hors-ligne
- ✅ Priorité support
- ✅ Synchronisation multi-appareils

### 6. 🔐 Panneau d'Administration
**Authentification:**
- Connexion par mot de passe (admin123)
- Session persistante

**Gestion du contenu:**
- Ajouter/modifier/supprimer prédications
- Ajouter/modifier/supprimer enseignements
- Gérer les quiz
- Créer des annonces
- Voir les statistiques utilisateurs

## 🎨 Design & Couleurs

| Élément | Couleur | Code |
|---------|---------|------|
| Primaire | Bordeaux profond | #6B1D2B |
| Secondaire | Or doré | #C9A84C |
| Fond | Blanc cassé | #F5F0E8 |
| Texte | Gris foncé | #2C2C2C |
| Bordures | Gris clair | #E0D5C7 |

## 📱 Navigation

### Onglets Principaux (3)
1. **Accueil 🏠**
   - Méditation du jour
   - Annonce du jour
   - Barre de recherche
   - Boutons rapides (Marque-pages, Chat IA)
   - Quiz du jour en vedette
   - Contenu populaire

2. **Médiathèque 📚**
   - Verset du jour (dégradé Bordeaux→Or)
   - Grille 2x4 (8 catégories)
   - Images bibliques pour chaque catégorie

3. **Écrans 🖥️**
   - Historique des pages consultées
   - Titre + date/heure
   - Bouton "Effacer l'historique"

## 🔧 Configuration Technique

### Stack Technologique
- **Framework**: React Native avec Expo SDK 54
- **Langage**: TypeScript 5.9
- **Styling**: NativeWind (Tailwind CSS)
- **État**: React Context + AsyncStorage
- **Navigation**: Expo Router
- **Base de données**: AsyncStorage (local)

### Fichiers Clés
```
app/
├── (tabs)/
│   ├── index.tsx          # Accueil
│   ├── library.tsx        # Médiathèque
│   └── screens.tsx        # Écrans/Historique
├── scripture.tsx          # Écran Bible
├── quiz-list.tsx          # Liste des quiz
├── quiz-play.tsx          # Jeu du quiz
├── quiz-results.tsx       # Résultats
├── ai-chat.tsx            # Chat IA
├── bookmarks.tsx          # Marque-pages
├── subscription.tsx       # Abonnement
├── admin-login.tsx        # Connexion admin
├── admin-dashboard.tsx    # Tableau de bord
└── admin-sermons.tsx      # Gestion prédications

lib/
├── bible-context.tsx      # Contexte Bible
├── quiz-context.tsx       # Contexte Quiz
├── bookmarks-context.tsx  # Contexte Marque-pages
├── ai-chat-context.tsx    # Contexte Chat IA
├── subscription-context.tsx # Contexte Abonnement
└── admin-context.tsx      # Contexte Admin
```

## 🚀 Démarrage Rapide

### Installation
```bash
cd /home/ubuntu/parole-verite
npm install
```

### Développement
```bash
npm run dev
```

### Tests
```bash
npm test
```

### Build
```bash
# APK (tests)
expo build:android -t apk

# AAB (publication)
expo build:android -t app-bundle
```

## 🔐 Sécurité

### Authentification Admin
- Mot de passe: `admin123` (À CHANGER EN PRODUCTION)
- Session sauvegardée localement
- Déconnexion disponible

### Données Utilisateur
- Sauvegarde locale via AsyncStorage
- Pas de données sensibles stockées
- Marque-pages et notes privés

### Permissions Android
- `INTERNET` - Pour l'IA et les mises à jour
- `READ_EXTERNAL_STORAGE` - Pour les fichiers
- `WRITE_EXTERNAL_STORAGE` - Pour les téléchargements

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| Écrans | 15+ |
| Contextes | 6 |
| Livres bibliques | 66 |
| Quiz | 10 |
| Questions | 100 |
| Catégories | 8 |
| Couleurs thème | 5 |

## 🎓 Guides d'Utilisation

### Pour les Utilisateurs
1. **Lire la Bible**: Accédez à Médiathèque → Écriture
2. **Faire un Quiz**: Cliquez sur "Quiz du Jour" ou allez à Médiathèque
3. **Poser une Question IA**: Accédez à "Chat IA" depuis l'Accueil
4. **Sauvegarder un Verset**: Cliquez sur le cœur dans la Bible
5. **S'abonner**: Cliquez sur "Passer à Premium"

### Pour les Administrateurs
1. **Se connecter**: Cliquez sur "Admin" depuis l'Accueil
2. **Ajouter une Prédication**: Admin → Prédications → Ajouter
3. **Modifier un Quiz**: Admin → Quiz → Éditer
4. **Créer une Annonce**: Admin → Annonces → Créer
5. **Voir les Stats**: Admin → Tableau de bord

## 🐛 Dépannage

### L'app ne démarre pas
```bash
npm install
npm run dev
```

### Les données ne se sauvegardent pas
- Vérifiez que AsyncStorage est disponible
- Vérifiez les permissions du téléphone

### Le Chat IA ne répond pas
- Vérifiez la connexion Internet
- Vérifiez que vous n'avez pas dépassé la limite (5/jour)

## 📞 Support

- **Documentation Expo**: https://docs.expo.dev
- **Support Manus**: https://help.manus.im
- **Issues GitHub**: [Créer une issue]

## 📝 Licence

© 2026 Parole & Vérité. Tous droits réservés.

---

**Version**: 1.0.0
**Dernière mise à jour**: 25 juin 2026
**Statut**: Production Ready ✅
