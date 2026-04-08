# React + Vite + iTowns

Projet d'exemple illustrant l'intégration d'[iTowns](https://www.itowns-project.org/) dans une application **React 19** construite avec **Vite**.

L'exemple charge et affiche un nuage de points au format **Potree 2.0** (le lion de la Fontaine des Lions) dans une vue iTowns pilotée par des contrôles planaires.

---

## Stack technique

| Outil / Bibliothèque | Version | Rôle |
|---|---|---|
| [Vite](https://vite.dev/) | 8 | Bundler / serveur de dev |
| [React](https://react.dev/) | 19 | UI |
| [iTowns](https://github.com/iTowns/itowns) | 2.46.1-next | Moteur de visualisation géospatiale 3D |
| [Three.js](https://threejs.org/) | 0.182 | Rendu WebGL (peer dep d'iTowns) |
| [postprocessing](https://github.com/pmndrs/postprocessing) | 6.38 | Post-traitements (peer dep d'iTowns) |
| TypeScript | 6 | Typage statique |

---

## Fonctionnalités démontrées

- **Initialisation d'une `View` iTowns** dans un composant React via `useEffect`.
- **Chargement d'un nuage de points Potree 2.0** (`Potree2Layer` + `Potree2Source`).
- **Zoom automatique** sur le layer au chargement en calculant la distance caméra à partir de l'OBB du layer.
- **Contrôles planaires** (`PlanarControls`) pour naviguer dans la scène.
- **Plugin Vite custom** (`itownsWorkers.plugin.ts`) pour gérer les web workers pré-compilés d'iTowns en mode dev et en production.

---

## Prérequis

- [Node.js](https://nodejs.org/) ≥ 20
- npm ≥ 10 (ou pnpm / yarn)

---

## Installation

```bash
npm install
```

---

## Développement

```bash
npm run dev
```

Ouvre l'application sur [http://localhost:5173](http://localhost:5173).

---

## Build de production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`. Les workers iTowns pré-compilés sont automatiquement copiés dans `dist/workers/` par le plugin Vite.

### Prévisualiser le build

```bash
npm run preview
```

---

## Lint

```bash
npm run lint
```

---

## Architecture du projet

```
.
├── index.html
├── vite.config.ts              # Config Vite + plugin iTowns workers
├── itownsWorkers.plugin.ts     # Plugin Vite pour les workers iTowns
├── tsconfig.json
├── eslint.config.js
└── src/
    ├── main.tsx                # Point d'entrée React
    ├── App.tsx                 # Composant principal : initialisation iTowns
    └── App.css
```

---

## Le plugin `itownsWorkers`

iTowns embarque ses workers sous forme de **bundles webpack pré-compilés** (`dist/itowns_lasworker.js`, `dist/itowns_potree2worker.js`). Vite ne peut pas les re-bundler correctement car les sources utilisent `threads/worker`.

Le plugin `itownsWorkers.plugin.ts` gère cette contrainte sur deux plans :

| Mode | Stratégie |
|---|---|
| **Dev** | `resolveId` redirige la résolution de module vers les fichiers pré-compilés ; un middleware serveur intercepte les requêtes HTTP (y compris la variante `?worker_file&type=module` ajoutée par Vite) et sert le bundle directement. |
| **Prod** | `transform` réécrit l'expression `new Worker(new URL(...))` dans les parsers iTowns pour utiliser une URL statique ; `generateBundle` émet les fichiers workers comme assets statiques dans `dist/workers/`. |
