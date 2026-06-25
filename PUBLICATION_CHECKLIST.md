# ✅ Checklist de Publication - Parole & Vérité

## 🔍 Avant la Publication

### Configuration de l'Application
- [ ] Changez le mot de passe admin (actuellement: admin123)
- [ ] Mettez à jour `app.config.ts` avec les bonnes informations
- [ ] Vérifiez le numéro de version (actuellement: 1.0.0)
- [ ] Vérifiez le bundle ID (actuellement: space.manus.parole.verite)
- [ ] Mettez à jour les icônes et splash screens
- [ ] Vérifiez les permissions Android

### Contenu de l'Application
- [ ] Testez tous les écrans sur plusieurs appareils
- [ ] Testez la Bible complète (navigation, recherche)
- [ ] Testez tous les 10 quiz
- [ ] Testez le Chat IA
- [ ] Testez le système d'abonnement
- [ ] Testez le panneau admin
- [ ] Vérifiez les marque-pages et notes
- [ ] Testez les publicités AdMob

### Sécurité
- [ ] Vérifiez les permissions requises
- [ ] Testez la déconnexion admin
- [ ] Vérifiez la sauvegarde des données
- [ ] Testez la suppression des données
- [ ] Vérifiez la conformité RGPD

### Documentation
- [ ] Créez une politique de confidentialité
- [ ] Créez des conditions d'utilisation
- [ ] Préparez les captures d'écran (2-8)
- [ ] Écrivez la description Google Play
- [ ] Préparez les mots-clés

## 📦 Préparation du Build

### Clé de Signature
- [ ] Générez une clé de signature (keystore)
- [ ] Sauvegardez le mot de passe en sécurité
- [ ] Sauvegardez le fichier keystore

### Build APK (Tests)
```bash
# Exécutez ces commandes
cd /home/ubuntu/parole-verite
npm install
expo build:android -t apk
```
- [ ] Build APK réussi
- [ ] Téléchargez l'APK
- [ ] Testez sur au moins 2 appareils Android
- [ ] Vérifiez toutes les fonctionnalités

### Build AAB (Publication)
```bash
# Exécutez ces commandes
eas init
eas credentials
eas build --platform android --local
```
- [ ] Build AAB réussi
- [ ] Téléchargez l'AAB
- [ ] Vérifiez la taille du fichier

## 🎯 Informations Google Play

### Détails de l'Application
- [ ] Nom: Parole & Vérité
- [ ] Catégorie: Livres et Références
- [ ] Classification: Tous les publics (3+)
- [ ] Langue: Français

### Description
- [ ] Écrite et vérifiée
- [ ] Mentionne les fonctionnalités principales
- [ ] Inclut les avantages Premium
- [ ] Professionnelle et attrayante

### Captures d'écran
- [ ] 2-8 captures d'écran préparées
- [ ] Format: 1080 x 1920 pixels (9:16)
- [ ] Montrent les principales fonctionnalités
- [ ] Texte lisible et attrayant

### Icône
- [ ] PNG carré 512 x 512 pixels
- [ ] Pas de bordures arrondies
- [ ] Représente bien l'application
- [ ] Lisible à petite taille

### Vidéo Promo (Optionnel)
- [ ] Vidéo de présentation créée (30-60s)
- [ ] Montrant les fonctionnalités principales
- [ ] Qualité HD
- [ ] Sous-titres en français

## 💳 Configuration Google Play Console

### Compte Développeur
- [ ] Compte Google Play Developer créé
- [ ] Frais d'inscription payés (25€)
- [ ] Informations bancaires configurées
- [ ] Contrats signés

### Informations de Paiement
- [ ] Compte bancaire configuré
- [ ] Adresse de facturation vérifiée
- [ ] Informations de contact à jour

### Politique de Confidentialité
- [ ] Lien vers la politique de confidentialité
- [ ] Conforme au RGPD
- [ ] Explique la collecte de données
- [ ] Disponible en français

## 🚀 Publication

### Étapes de Publication
1. [ ] Connectez-vous à Google Play Console
2. [ ] Allez dans "Versions" → "Production"
3. [ ] Cliquez sur "Créer une version"
4. [ ] Téléchargez le fichier AAB
5. [ ] Remplissez toutes les informations requises
6. [ ] Téléchargez les captures d'écran
7. [ ] Téléchargez l'icône
8. [ ] Écrivez la description
9. [ ] Configurez les mots-clés
10. [ ] Configurez le contenu (classification)
11. [ ] Vérifiez tout
12. [ ] Cliquez sur "Envoyer pour examen"

### Après la Publication
- [ ] Attendez l'approbation (24-48h généralement)
- [ ] Vérifiez les avis utilisateurs
- [ ] Répondez aux commentaires
- [ ] Surveillez les crashs
- [ ] Analysez les téléchargements

## 📊 Suivi Post-Publication

### Monitoring
- [ ] Consultez Google Play Console quotidiennement
- [ ] Vérifiez les avis et évaluations
- [ ] Analysez les crashs et erreurs
- [ ] Suivez les téléchargements
- [ ] Suivez les installations actives

### Mises à Jour
- [ ] Planifiez les mises à jour régulières
- [ ] Corrigez les bugs signalés
- [ ] Ajoutez de nouvelles fonctionnalités
- [ ] Améliorez les performances
- [ ] Augmentez la version à chaque mise à jour

### Support Utilisateur
- [ ] Répondez aux avis
- [ ] Aidez les utilisateurs en difficulté
- [ ] Collectez les retours
- [ ] Améliorez basé sur les retours

## 🎉 Succès!

Une fois que vous avez coché tous les éléments, votre application est prête pour:
- ✅ Publication sur Google Play Store
- ✅ Distribution mondiale
- ✅ Monétisation via Premium
- ✅ Croissance utilisateurs

---

**Bonne chance pour la publication! 🚀**

**Besoin d'aide?**
- Consultez DEPLOYMENT.md pour les instructions détaillées
- Consultez DOCUMENTATION.md pour les fonctionnalités
- Contactez le support Manus: https://help.manus.im
