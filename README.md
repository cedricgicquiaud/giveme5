# GM5 Landing — GiveMe5

Landing page de vente des plaques NFC / QR code GiveMe5 (collecte d'avis Google en boutique).

## Pages

| URL | Fichier | Rôle |
|---|---|---|
| `/` | `index.html` | Landing complète (hero vidéo, stats, calculateur, témoignages, FAQ) |
| `/commande/` | `commande/index.html` | Tunnel court post-appel (SMS CP3) — plaque à 49 € |
| `/mentions-legales.html` | `mentions-legales.html` | Mentions légales |

## Stack

Site 100 % statique : HTML/CSS/JS vanilla, aucun build, aucune dépendance externe
(hors Google Fonts et Stripe). Tous les assets (images, vidéos) sont auto-hébergés dans `assets/`.

## Déploiement

- Hébergé via **Coolify** (Build Pack *Static*, nginx) sur `https://hello.giveme5xxxxx.fr`
- **Auto-deploy** : chaque push sur `main` déclenche un déploiement (webhook GitHub → Coolify)
- Workflow : branche feature → PR → merge sur `main` → déploiement automatique

## Paiement

CTA « Commander » → lien de paiement Stripe (paiement unique, 49 €).

## Suivi des affiliés et parrains

Script : `assets/js/ref.js`, chargé par `index.html` et `commande/index.html`.

- Un lien `https://hello.giveme5xxxxx.fr/?ref=marie` (ou `/commande/?ref=marie`) retient l'identifiant `marie` pendant 60 jours dans le navigateur du visiteur.
- Le script l'ajoute à tous les liens de paiement Stripe sous la forme `client_reference_id=marie`.
- Dernier clic gagnant : un nouveau `?ref=` remplace l'ancien.
- Identifiant accepté : lettres, chiffres, tirets et traits de soulignement (60 caractères max). Tout autre valeur est ignorée et le paiement fonctionne normalement.
- Pour retrouver les ventes d'un affilié : Stripe → Paiements → filtrer ou exporter sur « Client reference ID ».
