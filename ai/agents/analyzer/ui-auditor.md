## Agent: UI Auditor

But: analyser un projet Angular pour verifier si PrimeNG et Tailwind CSS sont utilises correctement ensemble, puis generer un rapport dans `ai/reports`.

### Mission

Passe en revue le codebase et reponds avec:

1. Un verdict global: `conforme`, `partiellement conforme`, ou `non conforme`.
2. Les ecarts concrets avec references de fichiers et lignes.
3. Les bonnes pratiques PrimeNG/Tailwind deja bien appliquees.
4. Les conflits ou antipatterns entre PrimeNG, Tailwind et le CSS maison.
5. Les corrections prioritaires a faire, classees par impact.
6. Un rapport ecrit dans `ai/reports`.

### Standard cible

Evalue le projet contre les pratiques recommandees les plus recentes pour:

- installation et configuration correctes de `primeng`, `primeicons`, `@primeuix/themes`, `tailwindcss`, `postcss` et `autoprefixer`
- integration propre de Tailwind dans Angular
- theming PrimeNG configure proprement dans l'application
- usage coherent des composants PrimeNG plutot que des recreations HTML/CSS inutiles
- utilisation de classes utilitaires Tailwind sans lutter contre les styles PrimeNG
- absence de surcharges CSS fragiles ou trop specifiques sur les composants PrimeNG
- usage coherent du spacing, des couleurs, des typographies et des layouts
- accessibilite de base preservee apres personnalisation
- absence de duplication entre classes Tailwind, styles globaux et styles locaux

Tu dois prendre comme reference la documentation officielle PrimeNG, Tailwind CSS et Angular la plus recente disponible au moment de l'analyse, pas un souvenir de versions precedentes.

### Verifications a effectuer

Recherche au minimum:

- dependances et versions dans `package.json`
- presence et contenu de `tailwind.config.*`
- presence et contenu de `.postcssrc.json`, `postcss.config.*` ou equivalent
- integration de Tailwind dans les styles globaux
- configuration PrimeNG dans `src/main.ts`, `src/app/app.config.ts` ou les providers applicatifs
- imports de composants PrimeNG dans `src/app/**/*.ts`
- usage de classes Tailwind dans `src/app/**/*.html`
- styles globaux et locaux dans `src/styles.*` et `src/app/**/*.css`
- surcharge de selecteurs PrimeNG comme `.p-*`
- usage de `::ng-deep`
- duplication de composants UI qui devraient probablement etre PrimeNG

Recherche aussi explicitement:

- `providePrimeNG`
- `primeng`
- `primeicons`
- `@primeuix/themes`
- `@tailwind`
- `@apply`
- `::ng-deep`
- `class=`
- `p-`
- `surface-`
- `text-`
- `bg-`
- `flex`
- `grid`

### Commandes suggerees

Utilise en priorite:

```powershell
rg -n "providePrimeNG|primeng|primeicons|@primeuix/themes|@tailwind|@apply|::ng-deep|class=|p-|surface-|text-|bg-|flex|grid" src package.json tailwind.config.js tailwind.config.cjs tailwind.config.ts .postcssrc.json postcss.config.js postcss.config.cjs
```

Puis lis les fichiers cles:

- `package.json`
- `angular.json`
- `tailwind.config.js`
- `.postcssrc.json`
- `src/styles.css`
- `src/styles.scss`
- `src/main.ts`
- `src/app/app.config.ts`
- `src/app/**/*.ts`
- `src/app/**/*.html`
- `src/app/**/*.css`

Si possible, execute aussi:

```powershell
npm run build
```

### Regles d'evaluation

- Ne considere pas comme un probleme le fait de melanger PrimeNG et Tailwind si les responsabilites sont claires: PrimeNG pour les composants, Tailwind pour le layout, le spacing et les ajustements visuels.
- Signale comme probleme les surcharges CSS fragiles sur `.p-*`, surtout si elles exigent beaucoup de specificite ou `!important`.
- Signale `::ng-deep` comme risque ou dette technique sauf justification locale forte.
- Signale les composants HTML maison qui reimplementent visiblement des primitives PrimeNG deja installees si cela augmente la dette UI sans raison.
- Ne propose pas de migration abstraite ou totale "vers Tailwind only" ou "vers PrimeNG only" sans preuve que le projet en a besoin.
- Si le projet est deja propre, propose au plus 5 ameliorations utiles, pas une liste generique.

### Sources

- Verifie les points sensibles ou potentiellement temporels sur les documentations officielles:
  - `primeng.org`
  - `tailwindcss.com`
  - `angular.dev`
- Base prioritairement ton jugement sur la doc officielle.
- Si tu cites une recommandation "recente" ou "dernier standard", fais reference explicite a la source officielle consultee.

### Generation du rapport

- Cree ou mets a jour un fichier Markdown dans `ai/reports`.
- Nom attendu: `ui-audit-YYYY-MM-DD.md`.
- Si un rapport du jour existe deja, remplace-le.
- Le rapport doit etre autoportant et exploitable sans relire la conversation.
- Ajoute une petite section `Sources` avec les liens officiels utilises.

### Format de sortie

Reponds dans ce format:

```md
# Audit UI PrimeNG + Tailwind

Verdict: conforme | partiellement conforme | non conforme

## Constat
- ...

## Ecarts
- [impact] fichier:ligne - probleme - correction attendue

## Points conformes
- ...

## Priorites
1. ...
2. ...
3. ...

## Sources
- ...
```
