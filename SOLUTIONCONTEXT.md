# Solution Context

## Role

This file describes the complete Home App solution, not only the Angular frontend. Keep it updated when the frontend, Spring Boot API, PostgreSQL schema, authentication, deployment, or cross-service contracts change.

## Solution Overview

The solution is composed of:

- Frontend: Angular application in this repository.
- Backend API: Spring Boot application written in Kotlin.
- Database: PostgreSQL.

The frontend is responsible for the user interface and calls the backend through HTTP APIs. The Spring Boot Kotlin API owns business rules, persistence, and security decisions. PostgreSQL stores the application data.

## Frontend

Repository:

- `home-frontend`

Technology:

- Angular 21 standalone.
- NgRx for feature state and side effects.
- PrimeNG and Tailwind CSS for UI.

Runtime API location:

- Configured through `src/assets/config.json`.
- Read by `src/app/core/config.ts`.
- Used by API clients through `Config.apiUrl`.

Current frontend domains:

- Home dashboard.
- Weather.
- Rooms management.
- Rooms tracking.
- Devices management.
- Devices tracking.

## Backend

Backend technology:

- Spring Boot.
- Kotlin.

Expected backend responsibility:

- Expose REST endpoints used by Angular.
- Validate incoming requests.
- Apply authorization rules.
- Read and write data in PostgreSQL.
- Return consistent API responses compatible with the frontend `ApiResponse<T>` model.

Known endpoint families consumed by the frontend:

- `/api/rooms`
- `/api/devices`

Current frontend usage expects:

- `GET /api/rooms`
- `POST /api/rooms`
- `PUT /api/rooms/{id}`
- `DELETE /api/rooms/{id}`
- `GET /api/devices`
- `GET /api/devices/{id}`
- `POST /api/devices`
- `PUT /api/devices/{id}`
- `DELETE /api/devices/{id}`

## Database

Database technology:

- PostgreSQL.

Expected database responsibility:

- Persist rooms.
- Persist devices.
- Persist tracking/history data if the backend exposes it.
- Persist authentication or authorization configuration only if the backend design chooses database-managed access rules.

## Data Flow

Normal application flow:

1. Angular loads `/assets/config.json`.
2. Angular reads `apiUrl`.
3. A page or component dispatches NgRx actions or calls services.
4. NgRx effects call Angular API clients.
5. API clients call the Spring Boot Kotlin backend.
6. Backend validates and processes the request.
7. Backend reads or writes PostgreSQL.
8. Backend returns an `ApiResponse<T>`.
9. Angular updates state and renders the UI.

## Authentication Direction

Planned authentication direction:

- Google sign-in for user identity.
- Email whitelist for access control.

Recommended ownership:

- Frontend starts the Google sign-in flow and stores only the minimum auth state needed for UI behavior.
- Backend validates Google identity tokens or session tokens.
- Backend applies the whitelist before returning protected data.
- PostgreSQL can store the whitelist if dynamic management is needed.

Do not rely on a frontend-only whitelist for real protection. Frontend checks can improve UX, but backend authorization must be the source of truth.

## Google Auth With Whitelist Target Flow

Target flow:

1. User signs in with Google from Angular.
2. Angular receives an identity credential or redirects through the selected auth flow.
3. Angular sends the credential/token to the backend, or calls protected APIs with an authorization token.
4. Spring Boot verifies the token with Google.
5. Spring Boot extracts the verified email.
6. Spring Boot checks the email against the whitelist.
7. If the email is allowed, backend returns success or protected data.
8. If the email is not allowed, backend returns `401` or `403`.
9. Angular routes allowed users into the app and shows an access-denied state for rejected users.

## Authorization Source Options

Static whitelist:

- Store allowed emails in backend configuration.
- Simple and appropriate for a small private app.
- Requires backend config change or redeploy when access changes.

Database whitelist:

- Store allowed emails in PostgreSQL.
- Better when access should be managed without redeploying.
- Requires admin flow or database maintenance process.

Hybrid whitelist:

- Start with backend config.
- Move to PostgreSQL when the access list needs to change often.

Recommended starting point:

- Backend-enforced static whitelist, unless the app needs frequent access changes.

## Cross-Service Contract Rules

When changing API contracts:

- Update backend DTOs and controllers.
- Update frontend models in `src/app/core`.
- Update frontend API clients.
- Update NgRx effects and selectors if data shape changes.
- Update this file and `PROJECTCONTEXT.md`.

When changing authentication:

- Define the token/session contract first.
- Implement backend validation and whitelist checks.
- Add frontend login/logout state.
- Protect Angular routes for UX.
- Keep backend authorization mandatory on protected endpoints.

## Maintenance Rule

Update this file whenever:

- Backend endpoint paths or payloads change.
- Database entities or ownership boundaries change.
- Authentication or authorization strategy changes.
- Deployment topology changes.
- New services are added to the solution.
- The frontend starts depending on new backend capabilities.
