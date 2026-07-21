# OEM Product Catalog Frontend

Next.js 15 application for the OEM product catalog (public) and admin inventory console.

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS
- **Data:** TanStack Query, Axios
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest (unit), Playwright (E2E)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public catalog.  
Admin console: [http://localhost:3000/console](http://localhost:3000/console) (redirects to login if not authenticated).

### Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_USE_MOCK_DATA=true
AUTH_SECRET=dev-only-auth-secret-change-me
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_USE_MOCK_DATA` | Set to `true` for local dev with mock data; set to `false` for production |
| `AUTH_SECRET` | Secret used to sign and verify admin session JWTs. **Must be changed in production.** |

**Mock admin credentials** (when `NEXT_PUBLIC_USE_MOCK_DATA=true`):

- Email: `admin@oem.com`
- Password: `password123`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run E2E tests (Playwright) |

## Project Structure

```
src/
├── app/
│   ├── (admin)/          # Protected admin routes (console)
│   ├── (public)/         # Public catalog routes
│   ├── admin-login/      # Admin login (outside protected layout)
│   └── not-found.tsx     # Custom 404 page
├── components/           # Shared UI and layout components
├── features/             # Feature modules (auth, products)
├── config/               # App configuration
├── mocks/                # Mock API data for development
├── store/                # Zustand global state
├── utils/                # API client
├── lib/auth/             # JWT signing, session cookies
└── middleware.ts         # Server-side JWT validation
```

## Authentication

### Public vs admin

- **Public site** (`/`, `/products/[id]`): No login required. No token is stored or sent.
- **Admin console** (`/console`): Requires authentication.

### How admin auth works

Admin auth uses a **signed httpOnly JWT cookie** set by the server.

| Component | Role |
|-----------|------|
| `POST /api/auth/login` | Validates credentials, signs a JWT, sets httpOnly cookie |
| `POST /api/auth/logout` | Clears session cookie (and calls backend logout when not in mock mode) |
| `middleware.ts` | Verifies JWT signature + expiry + `isAdmin` claim before `/console` loads |
| `/api/admin/*` | Proxies admin API calls server-side using the backend token embedded in the JWT |

The session cookie (`oem-admin-token`) is **httpOnly** — JavaScript cannot read it. The public site never sets or reads this cookie.

### Token storage and security

- **No token in localStorage** — only UI preferences (`region`, `language`) are persisted in Zustand.
- **httpOnly cookie** — protects against XSS token theft from client-side scripts.
- **JWT validation in middleware** — fake cookies with random values are rejected (signature + expiry checked).
- **Backend API token** — stored inside the signed JWT payload server-side only; used by the admin proxy when `NEXT_PUBLIC_USE_MOCK_DATA=false`.

## Security Headers

Configured in `next.config.ts` for all routes:

- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

## Testing

```bash
# Unit tests
npm test

# E2E (starts production server automatically)
npm run test:e2e
```
