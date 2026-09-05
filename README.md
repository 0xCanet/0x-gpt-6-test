# EditoRelay — prototype GPT‑6

Démo : https://0x-gpt-6-test.vercel.app

Prototype statique de comparaison, distinct du site officiel. Articles et propositions fictifs préécrits ; aucune génération distante, publication sociale ni collecte.

## Exécution

Node.js 20.19+ ou 22.12+. Depuis la racine :

```sh
npm ci
npm run dev
npm run build
npm run preview -- --port 4173
```

Build statique dans `dist/`. Tests navigateur : installer Chromium Playwright, démarrer la preview puis `npm test`. Dépendances système Chromium nécessaires.

## Benchmark

[Rapport et limites](BENCHMARK.md). Mesures dans `benchmark/summary.json`, usage GPT‑6 expurgé dans `benchmark/evidence/usage.json`, captures et contrôles dans `benchmark/evidence/independent/`.

Le code et le build d’origine sont conservés. Les logs internes et anciennes métadonnées personnelles ont été retirés de l’historique publié.

## Actifs

Logo fourni pour le prototype. Illustration CSS et exemples fictifs. Fontes locales Bricolage Grotesque, Plus Jakarta Sans, Geist Mono via Fontsource ; licences dans leurs paquets.
