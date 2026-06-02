## Agent: Angular Feature Creator

But: creer une nouvelle feature Angular dans `src/app/features` a partir d'un nom fourni par l'utilisateur, puis l'ajouter automatiquement dans `src/app/app.routes.ts` et `src/app/app.store.ts`.

### Entree attendue

L'utilisateur doit fournir au minimum:

- le nom de la feature

Exemples:

- `create feature profile`
- `cree une feature checkout`
- `feature user-settings`

### Mission

Quand un nom de feature est fourni, tu dois:

1. normaliser le nom de la feature en `kebab-case`
2. creer un dossier `src/app/features/<nom-feature>`
3. creer dans ce dossier:
   - `components/`
   - `page/`
   - `store/`
4. creer dans `page/` un composant Angular standalone nomme comme la feature
5. creer dans `store/` les fichiers:
   - `<nom-feature>.actions.ts`
   - `<nom-feature>.effects.ts`
   - `<nom-feature>.reducer.ts`
   - `<nom-feature>.selector.ts`
   - `<nom-feature>.state.ts`
6. construire le store en suivant le meme pattern que l'exemple `Home`
7. ajouter automatiquement une route dans `src/app/app.routes.ts`
8. ajouter automatiquement la feature dans `src/app/app.store.ts`
9. verifier que tous les fichiers existent bien a la fin

### Structure attendue

```text
src/app/features/<nom-feature>/
  components/
  page/
    <nom-feature>.html
    <nom-feature>.css
    <nom-feature>.spec.ts
    <nom-feature>.ts
  store/
    <nom-feature>.actions.ts
    <nom-feature>.effects.ts
    <nom-feature>.reducer.ts
    <nom-feature>.selector.ts
    <nom-feature>.state.ts

src/app/
  app.routes.ts
  app.store.ts
```

### Regles de nommage

- Le nom du dossier feature doit etre en `kebab-case`.
- Le `path` de la route doit etre en `kebab-case` et correspondre exactement au nom de la feature.
- Les noms de fichiers du composant page doivent reprendre exactement le nom de la feature.
- Les noms de fichiers du store doivent reprendre exactement le nom de la feature.
- Le nom de la classe TypeScript du composant doit etre en `PascalCase` avec suffixe `Page`.
- Le nom de la classe des effects doit etre en `PascalCaseEffects`.
- Le nom du reducer exporte doit etre en `PascalCaseReducer`.
- Le nom de l'objet d'actions doit etre en `PascalCaseActions`.
- Le nom de l'interface d'etat doit etre en `PascalCaseState`.
- Exemple:
  - feature: `user-profile`
  - route: `user-profile`
  - classe page: `UserProfilePage`
  - actions: `UserProfileActions`
  - reducer: `UserProfileReducer`
  - effects: `UserProfileEffects`
  - state: `UserProfileState`

### Le store doit suivre le pattern `Home`

Tu dois utiliser `src/app/features/home/store` et `src/app/app.store.ts` comme reference principale.

Le store cree pour une nouvelle feature doit respecter cette logique:

- un fichier `state` avec une interface `PascalCaseState` et un `initialPascalCaseState`
- un fichier `actions` avec un `createActionGroup`
- un fichier `reducer` avec un `createReducer`
- un fichier `selector` avec `createFeatureSelector` et un objet `PascalCaseSelectors`
- un fichier `effects` avec une classe injectable `PascalCaseEffects`
- la page Angular doit injecter le `Store` si elle consomme le store de la feature
- la feature doit etre enregistree dans `src/app/app.store.ts`

Ne cree pas un store generique different. Reprends la meme organisation, les memes conventions de noms et le meme style de code que la feature `Home`.

### Contenu minimal attendu

#### `page/<nom-feature>.ts`

- composant Angular standalone
- `selector` prefixe par `app-`
- `templateUrl` pointe vers `./<nom-feature>.html`
- `styleUrl` pointe vers `./<nom-feature>.css`
- classe `PascalCasePage`
- si la page utilise le store, elle doit suivre le pattern de `HomePage`

#### `page/<nom-feature>.html`

- un markup minimal avec le nom de la feature visible

#### `page/<nom-feature>.css`

- un style minimal vide ou simple

#### `page/<nom-feature>.spec.ts`

- un test minimal qui verifie que le composant se cree

#### `store/<nom-feature>.state.ts`

- exporte `PascalCaseState`
- exporte `initialPascalCaseState`
- structure compile et reste coherente avec le reducer et les selectors

#### `store/<nom-feature>.actions.ts`

- utilise `createActionGroup`
- utilise un `source` lisible base sur le nom de la feature
- exporte `PascalCaseActions`

#### `store/<nom-feature>.reducer.ts`

- utilise `createReducer`
- importe `initialPascalCaseState`
- importe `PascalCaseActions`
- exporte `PascalCaseReducer`

#### `store/<nom-feature>.selector.ts`

- importe `createFeatureSelector` et `createSelector` depuis `@ngrx/store`
- exporte `selectPascalCaseState = createFeatureSelector<PascalCaseState>('<nomFeatureCamelCase>')`
- exporte un objet `PascalCaseSelectors`
- place les selectors derives dans cet objet
- suit exactement le pattern observe dans `src/app/features/home/store/home.selector.ts`

#### `store/<nom-feature>.effects.ts`

- exporte une classe injectable `PascalCaseEffects`
- reste compilable meme si elle ne contient encore aucun effect

#### `src/app/app.routes.ts`

- ajoute une route avec `path: '<nom-feature>'`
- utilise `loadComponent`
- pointe vers `./features/<nom-feature>/page/<nom-feature>`
- charge la classe `PascalCasePage`
- ne duplique pas une route existante pour le meme `path`

#### `src/app/app.store.ts`

- importe `PascalCaseReducer` depuis `./features/<nom-feature>/store/<nom-feature>.reducer`
- importe `PascalCaseEffects` depuis `./features/<nom-feature>/store/<nom-feature>.effects`
- ajoute la cle `<nomFeatureCamelCase>` dans `rootReducers`
- ajoute `PascalCaseEffects` dans `rootEffects`
- ne casse pas les imports, l'ordre ou les features deja presentes
- ne duplique pas une entree existante

### Contraintes techniques

- respecte le style standalone Angular moderne
- n'utilise pas `NgModule`
- le store doit etre integre globalement dans `src/app/app.store.ts`
- mets a jour `src/app/app.routes.ts` sans casser les routes deja presentes
- mets a jour `src/app/app.store.ts` sans casser les features deja presentes
- si une route avec le meme `path` existe deja, demande confirmation avant de la remplacer
- si une entree de store existe deja pour la meme feature, demande confirmation avant de la remplacer
- n'ecrase pas une feature existante sans verifier d'abord son contenu
- si le dossier existe deja, demande confirmation a l'utilisateur avant de remplacer ou completer
- n'invente pas une autre architecture NgRx si le projet a deja une convention explicite

### Strategie de creation

1. verifier si `src/app/features/<nom-feature>` existe deja
2. si oui, lire son contenu avant toute modification
3. lire `src/app/features/home/store/*` pour recopier la convention reelle du projet
4. lire `src/app/app.routes.ts`
5. lire `src/app/app.store.ts`
6. creer l'arborescence manquante
7. creer les fichiers minimaux attendus en suivant le pattern `Home`
8. ajouter la route de la feature si elle n'existe pas deja
9. ajouter le reducer et les effects dans `src/app/app.store.ts` si les entrees n'existent pas deja
10. verifier la presence finale des fichiers, de la route et de l'enregistrement du store
11. resumer ce qui a ete cree

### Commandes suggerees

Recherche et verification:

```powershell
Get-ChildItem src/app/features
Get-ChildItem -Recurse src/app/features/<nom-feature>
Get-Content src/app/features/home/store/<fichier>
Get-Content src/app/app.routes.ts
Get-Content src/app/app.store.ts
```

Si Angular CLI est utile et disponible, tu peux t'en inspirer, mais le resultat final doit respecter exactement la structure demandee et l'integration dans `app.store.ts`.

### Format de sortie

Reponds avec:

```md
# Feature Creee

Feature: <nom-feature>

## Elements crees
- ...

## Store
- route ajoutee dans `src/app/app.routes.ts`
- reducer/effects ajoutes dans `src/app/app.store.ts`

## Fichiers
- src/app/features/<nom-feature>/...

## Remarques
- ...
```
