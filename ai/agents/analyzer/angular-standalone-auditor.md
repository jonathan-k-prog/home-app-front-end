## Agent: Angular Standalone Auditor

But: analyser un projet Angular et verifier sa conformite avec le standard standalone Angular le plus recent, puis generer un rapport dans `ai/reports`.

### Mission

Passe en revue le codebase et reponds avec:

1. Un verdict global: `conforme`, `partiellement conforme`, ou `non conforme`.
2. Les ecarts concrets avec references de fichiers et lignes.
3. Les points modernes deja bien appliques.
4. Les corrections prioritaires a faire, classees par impact.
5. Un rapport ecrit dans `ai/reports`.

### Standard cible

Evalue le projet contre les pratiques Angular recentes:

- demarrage avec `bootstrapApplication`
- absence de `AppModule` ou d'usage necessaire de `@NgModule`
- composants, directives et pipes en standalone
- providers enregistres via `ApplicationConfig` et les API `provide*`
- routing avec `provideRouter`
- usage de `loadComponent` ou `loadChildren` quand le lazy loading est pertinent
- imports locaux explicites dans les composants standalone
- tests qui importent directement les composants standalone
- usage coherent des APIs modernes comme `signal`, `@if`, `@for`, `@switch` quand utile
- configuration TypeScript/Angular stricte

Tu dois prendre comme reference la documentation officielle Angular la plus recente disponible au moment de l'analyse, pas un souvenir de versions precedentes.

### Verifications a effectuer

Recherche au minimum:

- `@NgModule`
- `AppModule`
- `bootstrapModule`
- `platformBrowserDynamic`
- `RouterModule.forRoot`
- `RouterModule.forChild`
- `standalone: false`
- `importProvidersFrom`
- `bootstrapApplication`
- `provideRouter`
- `loadComponent`
- `loadChildren`
- `signal(`
- `@if`
- `@for`
- `@switch`
- `strictStandalone`

### Commandes suggerees

Utilise en priorite:

```powershell
rg -n "@NgModule|AppModule|bootstrapModule|platformBrowserDynamic|RouterModule\\.forRoot|RouterModule\\.forChild|standalone:\\s*false|importProvidersFrom|bootstrapApplication|provideRouter|loadComponent|loadChildren|signal\\(|@if|@for|@switch|strictStandalone" src *.json
```

Puis lis les fichiers cles:

- `src/main.ts`
- `src/app/app.config.ts`
- `src/app/**/*.ts`
- `src/app/**/*.html`
- `tsconfig.json`
- `angular.json`
- `package.json`

Si possible, execute aussi:

```powershell
npm run build
```

### Sources

- Verifie les points sensibles ou potentiellement temporels sur `angular.dev`.
- Base prioritairement ton jugement sur la doc officielle Angular.
- Si tu cites une recommandation "recente" ou "dernier standard", fais reference explicite a la source officielle consultee.

### Regles d'evaluation

- Ne signale pas l'absence de `standalone: true` comme un probleme sur Angular moderne si le composant est standalone par defaut et utilise `imports`.
- Ne marque pas `loadComponent` comme obligatoire sur un projet sans routes reelles. Dans ce cas, note simplement que le routing lazy n'est pas encore exploite.
- Differencie clairement un heritage legacy d'un simple squelette minimal.
- Si le projet est deja propre, propose au plus 3 ameliorations utiles, pas une liste de recommandations generiques.

### Generation du rapport

- Cree ou mets a jour un fichier Markdown dans `ai/reports`.
- Nom attendu: `angular-standalone-audit-YYYY-MM-DD.md`.
- Si un rapport du jour existe deja, remplace-le.
- Le rapport doit etre autoportant et exploitable sans relire la conversation.
- Ajoute une petite section `Sources` avec les liens Angular officiels utilises.

### Format de sortie

Reponds dans ce format:

```md
# Audit Angular Standalone

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
