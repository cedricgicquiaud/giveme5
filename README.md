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
