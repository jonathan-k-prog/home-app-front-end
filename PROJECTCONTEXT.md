# Project Context

## Role

This repository is the Angular frontend for the Home App solution. Keep this file updated when the frontend structure, conventions, routes, state management, API clients, runtime configuration, build process, or authentication behavior changes.

## Current Stack

- Angular 21 standalone application.
- TypeScript 5.9.
- NgRx Store and Effects for feature state.
- PrimeNG 21 with Aura theme.
- Tailwind CSS 3.
- Font Awesome and PrimeIcons for icons.
- Chart.js for chart rendering.
- Vitest through Angular CLI for tests.
- Docker and Docker Compose files are present for containerized frontend usage.

## Application Bootstrap

- Entry point: `src/main.ts`.
- Root component: `src/app/app.ts`.
- Base application config: `src/app/app.config.ts`.
- Routes: `src/app/app.routes.ts`.
- Global reducers and effects: `src/app/app.store.ts`.

`src/main.ts` currently:

- Loads runtime config from `/assets/config.json`.
- Registers NgRx reducers and effects.
- Provides Angular Router.
- Provides HttpClient with Fetch support.
- Registers PrimeNG with the Aura theme.
- Registers `MessageService`.

## Runtime Configuration

Runtime config is handled by `src/app/core/config.ts`.

Config files:

- Template: `src/assets/config.template.json`.
- Local config: `src/assets/config.json`.

Known config keys:

- `redirectUri`
- `apiUrl`
- `appName`
- `version`

Current local API URL observed in `src/assets/config.json`:

- `http://192.168.1.12:8080`

Do not hardcode API hosts in feature code. Use `Config.apiUrl`.

## Routes

Current lazy-loaded standalone routes:

- `/home` -> `features/home/page/home`
- `/weather` -> `features/weather/page/weather`
- `/rooms-manager` -> `features/rooms-manager/page/rooms-manager`
- `/devices-manager` -> `features/devices-manager/page/devices-manager`
- `/device-tracker` -> `features/device-tracker/page/device-tracker`
- `/room-tracker` -> `features/room-tracker/page/room-tracker`

The empty path redirects to `/home`.

## Feature Structure

The project is organized by feature under `src/app/features`.

Current features:

- `home`
- `weather`
- `rooms-manager`
- `devices-manager`
- `device-tracker`
- `room-tracker`
- `common`

Common reusable UI currently lives under:

- `src/app/features/common/nav-bar`
- `src/app/features/common/modal`

Domain API clients and models currently live under `src/app/core`.

Current core domains:

- `src/app/core/room`
- `src/app/core/device`
- `src/app/core/date`
- `src/app/core/api-response`
- `src/app/core/config.ts`

## State Management

NgRx is organized per feature with this pattern:

- `<feature>.actions.ts`
- `<feature>.effects.ts`
- `<feature>.reducer.ts`
- `<feature>.selector.ts`
- `<feature>.state.ts`

Reducers and effects are registered centrally in `src/app/app.store.ts`.

When adding a new feature store:

- Add the store files inside the feature folder.
- Register the reducer in `rootReducers`.
- Register the effect in `rootEffects` if side effects are needed.

## API Clients

Current API clients:

- `RoomApi` in `src/app/core/room/room.api.ts`
- `DeviceApi` in `src/app/core/device/device.api.ts`

Both clients build URLs from:

- `Config.apiUrl`
- A local API path such as `/api/rooms` or `/api/devices`

Current backend response wrapper:

- `ApiResponse<T>` in `src/app/core/api-response/api-response.model.ts`

## Existing Entity Areas

Rooms:

- Management page.
- Tracker page.
- Add, update, delete modals.
- Core model and API client.

Devices:

- Management page.
- Tracker page.
- Add, update, delete, select modals.
- Core model and API client.
- Chart-related tracker component.

Weather:

- Weather page.
- Weather card on home.
- NgRx store.

Home:

- Dashboard-style page.
- Cards for weather, rooms, and devices.

## Local Instructions

`AGENTS.md` defines local generation rules:

- Feature requests should follow `ai/agents/creator/angular-feature-creator.md`.
- Component requests should follow `ai/agents/creator/angular-component-creator.md`.
- If a request is ambiguous between feature and component, ask for clarification before generating files.

## Commands

Common commands from `package.json`:

- `npm start` or `ng serve` for local development.
- `npm run build` or `ng build` for production build.
- `npm test` or `ng test` for tests.
- `npm run watch` for development build watch mode.

## Maintenance Rule

Update this file whenever:

- A route is added, removed, or renamed.
- A feature folder is added, removed, or significantly reorganized.
- NgRx registration changes.
- Runtime config keys change.
- API client conventions change.
- Authentication or authorization behavior is added.
- Build, test, Docker, or deployment behavior changes.
