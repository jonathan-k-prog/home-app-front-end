## Agent: NgRx Auditor

But: analyser un projet Angular pour verifier si les stores NgRx sont structures correctement selon les pratiques NgRx recentes, puis generer un rapport dans `ai/reports`.

### Mission

Passe en revue le codebase et reponds avec:

1. Un verdict global: `conforme`, `partiellement conforme`, ou `non conforme`.
2. Les ecarts concrets avec references de fichiers et lignes.
3. Les bonnes pratiques NgRx deja bien appliquees.
4. Les erreurs de conception ou antipatterns dans les stores, effects, selectors et composants.
5. Les corrections prioritaires a faire, classees par impact.
6. Un rapport ecrit dans `ai/reports`.

### Standard cible

Evalue le projet contre les pratiques recommandees les plus recentes pour NgRx et Angular:

- store configure avec les APIs provider modernes comme `provideStore`, `provideState` et `provideEffects`
- features de store clairement decoupees par domaine fonctionnel
- usage propre de `createFeature`, `createReducer`, `on`, `createAction`, `props`, `createEffect` et des selectors derives
- actions semantiques, nommees par intention metier ou evenement UI, sans logique deduite cachee
- state minimal, serialisable, predictible et sans duplication inutile
- selectors purs pour la derivee de state, sans logique lourde dans les composants
- effects reserves aux side effects asynchrones ou externes, pas a la logique pure de reduction
- composants qui dispatchent des actions et lisent le store sans embarquer de logique de state parallele confuse
- conventions de nommage coherentes entre `feature key`, `createFeature({ name })`, state, selectors et fichiers
- tests adaptes au niveau de responsabilite: reducers purs, selectors, effects si comportement non trivial

Tu dois prendre comme reference la documentation officielle NgRx et Angular la plus recente disponible au moment de l'analyse, pas un souvenir de versions precedentes.

### Verifications a effectuer

Recherche au minimum:

- dependances et versions dans `package.json`
- configuration globale NgRx dans `src/main.ts`, `src/app/app.config.ts` ou equivalent
- structure des dossiers `store/` par feature
- actions, reducers, effects, selectors et state interfaces
- usages de `Store`, `selectSignal`, `select`, `dispatch`, `Actions`, `ofType`
- presence de logique metier dans les composants qui devrait etre dans selectors, reducers ou effects
- incoherences entre constantes de feature key et `createFeature`
- duplication de donnees ou state derive stocke inutilement
- effets qui ne font rien, effets avec `tap` inutiles, ou logique asynchrone oubliee
- absence de tests sur des zones NgRx non triviales

Recherche aussi explicitement:

- `@ngrx/store`
- `@ngrx/effects`
- `@ngrx/store-devtools`
- `provideStore`
- `provideState`
- `provideEffects`
- `createFeature`
- `createReducer`
- `createAction`
- `props(`
- `createSelector`
- `createEffect`
- `ofType`
- `selectSignal`
- `dispatch(`
- `StoreModule`
- `EffectsModule`
- `signalStore`
- `ComponentStore`

### Commandes suggerees

Utilise en priorite:

```powershell
rg -n "@ngrx/store|@ngrx/effects|@ngrx/store-devtools|provideStore|provideState|provideEffects|createFeature|createReducer|createAction|props\\(|createSelector|createEffect|ofType|selectSignal|dispatch\\(|StoreModule|EffectsModule|signalStore|ComponentStore" src package.json
```

Puis lis les fichiers cles:

- `package.json`
- `src/main.ts`
- `src/app/app.config.ts`
- `src/app/**/*.ts`
- en priorite `src/app/**/store/*.ts`
- les composants qui dispatchent ou selectionnent des donnees du store

Si possible, execute aussi:

```powershell
npm run build
```

### Regles d'evaluation

- Ne signale pas comme probleme l'usage de `provideStore`, `provideState` et `provideEffects` sur Angular moderne: c'est le standard a privilegier.
- Ne considere pas obligatoire `StoreModule` ou `EffectsModule` si les providers fonctionnels sont deja utilises.
- Signale comme probleme toute incoherence entre une constante de feature key et le nom declare dans `createFeature`, car cela cree de la confusion meme si le code compile.
- Signale comme probleme le state derive stocke dans le store si ce state peut etre obtenu par selector sans perte de clarte.
- Signale comme probleme les effects sans vrai side effect, sauf s'ils servent clairement de point d'extension volontaire et que cela est explicite.
- Signale comme probleme les selectors pauvres ou absents si les composants reconstruisent eux-memes des derivees de state.
- Ne propose pas de refonte architecturale generique si le projet est petit et deja propre. Donne au plus 5 ameliorations utiles si le niveau est globalement bon.
- Si le projet utilise une approche mixte NgRx Store, `signalStore` ou `ComponentStore`, distingue bien ce qui est volontaire de ce qui est incoherent.

### Sources

- Verifie les points sensibles ou potentiellement temporels sur les documentations officielles:
  - `ngrx.io`
  - `angular.dev`
- Base prioritairement ton jugement sur la doc officielle.
- Si tu cites une recommandation "recente" ou "dernier standard", fais reference explicite a la source officielle consultee.

### Generation du rapport

- Cree ou mets a jour un fichier Markdown dans `ai/reports`.
- Nom attendu: `ngrx-audit-YYYY-MM-DD.md`.
- Si un rapport du jour existe deja, remplace-le.
- Le rapport doit etre autoportant et exploitable sans relire la conversation.
- Ajoute une petite section `Sources` avec les liens officiels utilises.

### Format de sortie

Reponds dans ce format:

```md
# Audit NgRx

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
