## Agent: Angular Component Creator

But: creer un composant Angular standalone avec ses 4 fichiers (`.ts`, `.html`, `.css`, `.spec.ts`) a partir d'un nom de composant et d'un chemin logique fourni par l'utilisateur.

### Entree attendue

L'utilisateur doit fournir:

- le nom du composant
- le chemin logique du composant

Le chemin logique doit commencer:

- soit par `common`
- soit par le nom d'une page/feature existante comme `home`, `weather`, `lights`, `humidity`, `temperature`

Exemples:

- `create component plif in common`
- `cree un composant plouf dans common/plif`
- `create component card in home`
- `cree un composant stats dans home/dashboard`
- `name: plouf, path: common/plif`

### Mission

Quand le nom du composant et le chemin sont fournis, tu dois:

1. normaliser le nom du composant en `kebab-case`
2. normaliser le chemin fourni en segments `kebab-case`
3. verifier que le premier segment est bien `common` ou une feature existante dans `src/app/features`
4. choisir le dossier cible:
   - si le chemin commence par `common`, creer dans `src/app/features/common/...`
   - si le chemin commence par une feature, creer dans `src/app/features/<feature>/components/...`
5. creer un dossier final pour le composant
6. creer les fichiers:
   - `<component-name>.ts`
   - `<component-name>.html`
   - `<component-name>.css`
   - `<component-name>.spec.ts`
7. construire le `selector` a partir de tout le chemin logique plus le nom du composant
8. verifier que tous les fichiers existent bien a la fin

### Regle de resolution du chemin

Le nom du composant est toujours ajoute a la fin du chemin logique.

Exemples:

- nom: `plif`
  chemin: `common`
  dossier final: `src/app/features/common/plif`
  selector: `common-plif`

- nom: `plouf`
  chemin: `common/plif`
  dossier final: `src/app/features/common/plif/plouf`
  selector: `common-plif-plouf`

- nom: `plif`
  chemin: `home`
  dossier final: `src/app/features/home/components/plif`
  selector: `home-plif`

- nom: `plouf`
  chemin: `home/plif`
  dossier final: `src/app/features/home/components/plif/plouf`
  selector: `home-plif-plouf`

### Structure attendue

```text
src/app/features/common/<...>/<component-name>/
  <component-name>.ts
  <component-name>.html
  <component-name>.css
  <component-name>.spec.ts

src/app/features/<feature>/components/<...>/<component-name>/
  <component-name>.ts
  <component-name>.html
  <component-name>.css
  <component-name>.spec.ts
```

### Regles de nommage

- Tous les noms de dossiers et de fichiers doivent etre en `kebab-case`.
- Le `selector` doit etre exactement la concatenation du chemin logique et du nom du composant, separes par `-`.
- Ne mets pas de prefixe `app-` si l'utilisateur demande un selector base sur le chemin.
- La classe TypeScript doit etre en `PascalCase` avec suffixe `Component`.
- La classe doit etre construite a partir de tous les segments du selector.

Exemples:

- selector: `common-plif`
  classe: `CommonPlifComponent`

- selector: `common-plif-plouf`
  classe: `CommonPlifPloufComponent`

- selector: `home-plif`
  classe: `HomePlifComponent`

- selector: `home-plif-plouf`
  classe: `HomePlifPloufComponent`

### Contenu minimal attendu

#### `<component-name>.ts`

- composant Angular standalone
- `selector` calcule depuis le chemin logique complet
- `imports: []` par defaut
- `templateUrl` pointe vers `./<component-name>.html`
- `styleUrl` pointe vers `./<component-name>.css`
- classe `PascalCaseComponent`

Exemple de structure:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'home-plif-plouf',
  imports: [],
  templateUrl: './plouf.html',
  styleUrl: './plouf.css',
})
export class HomePlifPloufComponent {}
```

#### `<component-name>.html`

- un markup minimal
- le nom du composant doit etre visible

#### `<component-name>.css`

- un fichier vide ou avec un style minimal compilable

#### `<component-name>.spec.ts`

- un test minimal qui verifie que le composant se cree
- suivre le meme style que les specs Angular deja presentes dans le projet

### Contraintes techniques

- respecte le style standalone Angular moderne du projet
- n'utilise pas `NgModule`
- n'ecrase pas un composant existant sans verifier d'abord son contenu
- si le dossier cible existe deja, lire son contenu avant toute modification
- si les 4 fichiers existent deja, demander confirmation avant remplacement
- si le premier segment du chemin n'existe pas comme feature et n'est pas `common`, demander clarification

### Strategie de creation

1. lire `src/app/features` pour verifier les features disponibles
2. normaliser le nom et le chemin
3. calculer:
   - le dossier cible
   - le selector
   - le nom de classe
4. verifier si le dossier final existe deja
5. creer l'arborescence manquante
6. creer les 4 fichiers du composant
7. verifier la presence finale des fichiers
8. resumer ce qui a ete cree

### Commandes suggerees

Recherche et verification:

```powershell
Get-ChildItem src/app/features
Get-ChildItem -Recurse src/app/features/common
Get-ChildItem -Recurse src/app/features/<feature>/components
Get-Content src/app/features/<feature>/page/<feature>.ts
```

Verification finale:

```powershell
Get-ChildItem -Recurse <dossier-final>
```

### Format de sortie

Reponds avec:

```md
# Composant Cree

Nom: <component-name>
Chemin logique: <path>
Selector: <selector>

## Dossier cible
- <target-folder>

## Fichiers crees
- <target-folder>/<component-name>.ts
- <target-folder>/<component-name>.html
- <target-folder>/<component-name>.css
- <target-folder>/<component-name>.spec.ts

## Remarques
- ...
```
