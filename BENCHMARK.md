# Benchmark public — GPT‑5.6 et GPT‑6

Démo GPT‑6 : https://0x-gpt-6-test.vercel.app

Le dépôt GPT‑5.6 est désormais privé. Les mesures comparatives sont conservées. Cette édition retire les journaux bruts, informations personnelles et références internes ; le code généré et le build GPT‑6 sont inchangés.

![Comparaison](benchmark/comparison-desktop.png)

## Mesures réelles de génération

| Mesure | GPT‑5.6 Sol | GPT‑6 Astra |
|---|---:|---:|
| Modèle rapporté par Hermes/Codex | `gpt-5.6-sol` | `gpt-6-astra` |
| Temps chronométré CLI | 556,025 s — **9 min 16 s** | 702,655 s — **11 min 43 s** |
| Appels API | 20 | 30 |
| Tokens d'entrée hors cache | 215 519 | 76 541 |
| Tokens lus en cache | 1 235 072 | 1 319 424 |
| Tokens de sortie | 22 085 | 17 469 |
| Tokens totaux rapportés | **1 472 676** | **1 413 434** |
| Statut de coût natif | `included` | `included` |
| Fin de l'invocation | code 0, completed=true | code 0, completed=true |

Le chronomètre inclut création, installations, build, essais et corrections du modèle. Il exclut la préparation commune, la QA du coordinateur, GitHub et Vercel. GPT‑6 a notamment dû résoudre un problème de bibliothèques Chromium dans son conteneur ; ce temps n'a pas été retiré.

Les tokens sont cumulés sur les appels, y compris les relectures de contexte en cache ; ce ne sont pas des mots uniques produits. Sur ce runtime, le total vérifié correspond à entrée hors cache + cache lu + cache écrit + sortie. Le cache écrit est nul pour les deux. Les tokens de raisonnement ne sont pas rajoutés au total. `included` décrit l'accès par abonnement : ce n'est ni zéro consommation de quota, ni une facture de l'ensemble des outils et du temps de coordination.

Skills chargés via `skill_view` : **5.6 : Impeccable, Claude Design, Humanizer ; 6 : Impeccable**. La même bibliothèque était accessible et leur sélection était libre. Les différences d'usage du contexte ne peuvent donc pas être attribuées à la seule efficacité intrinsèque du modèle.

## Contrôles indépendants

Même Chromium Linux, même script Playwright et axe, mêmes tailles **1440 × 900 et 390 × 900**. Les résultats bruts sont dans `benchmark/evidence/independent/audit.json` et `interactions.json`.

| Contrôle | GPT‑5.6 | GPT‑6 |
|---|---:|---:|
| Page servie localement | HTTP 200 | HTTP 200 |
| Débordement horizontal, état initial et démo ouverte | aucun observé | aucun observé |
| Erreurs JavaScript dans le parcours | 0 | 0 |
| Requêtes externes dans le parcours | 0 | 0 |
| Ancres internes cassées | 0 | 0 |
| Violations axe automatisées observées | 0 | 0 |
| Audit npm du lockfile, total signalé | 0 | 0 |
| Parcours commun de 12 contrôles — desktop | **10/12** | **12/12** |
| Même parcours — mobile | **10/12** | **12/12** |

Les deux échecs de 5.6 sont des contrôles de robustesse, pas des fonctionnalités imposées mot pour mot dans le brief. Les douze vérifications détaillées ont été opérationnalisées après lecture des livrables ; ce n'est pas un score pré-enregistré. Le résultat mobile répète les mêmes cas : ne pas le compter comme douze observations indépendantes supplémentaires.

### Différences fonctionnelles reproduites

**GPT‑5.6**
1. Ouvrir la démo, préparer les propositions, vider le texte : « Marquer comme relu » reste utilisable. Preuve : `finding-empty-text.png` et script `capture-findings.mjs`.
2. Marquer une proposition comme relue, changer de réseau puis revenir : le statut est perdu. Les modifications textuelles, elles, sont conservées. Preuves avant/après : `finding-review-before.png`, `finding-review-after.png`.
3. Inspection DOM complémentaire : trois onglets inactifs référencent des ID de panneaux absents via `aria-controls`. Axe ne le signale pas sur cet état ; cela reste une fragilité sémantique, pas une preuve mesurée d'échec avec un lecteur d'écran.

**GPT‑6**
- Texte vide : validation désactivée.
- Statut de validation conservé en changeant de réseau ; éditer le texte révoque la validation dans le code.
- Contrôle supplémentaire réellement exercé : Instagram se bloque sans image et se réactive quand l'image est rétablie.
- Les cinq questions de FAQ s'ouvrent ; tous les contrôles de la démo restent locaux.

### Empreinte du build

| Fichiers compilés, octets bruts | GPT‑5.6 | GPT‑6 |
|---|---:|---:|
| HTML | 13 589 | 10 960 |
| JavaScript | 6 697 | 6 275 |
| CSS | 33 088 | 21 660 |
| Fontes WOFF2 présentes dans le build | 320 044 | 196 496 |

Les deux utilisent Vite, du JavaScript sans framework applicatif et des fontes locales. Ces tailles sont celles des fichiers, pas les octets réseau effectivement transférés : toutes les fontes du build ne sont pas nécessairement chargées. Aucun score Lighthouse ni gain de vitesse utilisateur n'est inventé.

## Débrief visuel et wording

| Dimension | GPT‑5.6 | GPT‑6 |
|---|---|---|
| Hero | « Chaque article. Le bon ton. Sur chaque réseau. » : fonction directement lisible. | « Vos articles, au-delà de la une. » : plus éditorial et évocateur ; le paragraphe explique la fonction. |
| Illustration | Flux article → réseaux simple à suivre ; montre surtout les destinations. | Journal et cartes sociales avec exemples d'accroches : matérialise davantage le résultat. |
| Démo à l'arrivée | État vide, puis bouton de préparation avant de voir une proposition. | Article et proposition déjà visibles face à face ; résultat immédiatement compréhensible. |
| Identité | Palette et typographies cohérentes, composition marquée. | Même identité respectée, composition plus illustrée. |
| Réserves | Grands espaces et titres répétés ; prudence rédactionnelle parfois redondante. | Superpositions partiellement masquées dans le hero ; petites annotations ; « Corrigez le préalable » maladroit. |
| Mobile | Lisible et correctement empilé ; navigation secondaire retirée. | Navigation textuelle conservée ; démo lisible ; FAQ parfois trop espacée. |

Mon choix pour poursuivre le prototype serait **GPT‑6**, pour la preuve produit immédiate et les états de démo mieux traités. Ce n'est pas un verdict de conversion. GPT‑5.6 reste une base crédible, plus rapide sur ce passage, et son accroche est plus directement descriptive.

La revue visuelle est qualitative et non aveugle. Les captures ne remplacent pas les tests de fonctionnement.


## Limites

Un essai par modèle, ordre fixe, même prompt utilisateur et ressources disponibles ; contexte système complet non certifié identique. Choix de skills différents. Raisonnement high demandé, application non prouvée. Contrôles définis après livraison. Aucune retouche du code généré. Chromium Linux ne valide pas iOS. Aucun test de conversion. Les mesures sont les valeurs historiques conservées, pas un nouveau benchmark. Les journaux internes ont été retirés de cette version publique.
