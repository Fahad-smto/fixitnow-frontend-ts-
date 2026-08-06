# FixItNow Frontend 🔧

A Next.js (App Router + TypeScript + Tailwind) frontend for the FixItNow home services marketplace, connected to your FixItNow backend API.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (custom CSS variables for the color theme — see `app/globals.css`)
- **State:** Zustand (auth/session state, persisted to localStorage + cookies)
- **HTTP client:** Axios (with an interceptor that auto-attaches the JWT token)
- **Notifications:** react-hot-toast
- **Icons:** lucide-react
- **Route protection:** Next.js Proxy (`proxy.ts`, formerly "middleware")

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Point it at your backend

Edit `.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Change this to your deployed backend URL when you go live (e.g. `https://fixitnow-ts.vercel.app/api`).

### 3. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000`.

### 4. Build for production

```bash
npm run build
npm start
```

## How auth + route protection works (beginner explanation)

1. When you register/login, the backend returns a JWT `token` and the `user` object.
2. `lib/auth-store.ts` (Zustand) saves both to **localStorage** (so the app remembers you after a refresh) **and** to **cookies** (`fixitnow_token`, `fixitnow_role`).
3. `proxy.ts` runs on the server before any `/dashboard/*` page loads. It reads those cookies:
   - No token -> redirect to `/auth/login`
   - Wrong role for that dashboard (e.g. a customer opening `/dashboard/admin`) -> redirect to `/`
4. `lib/api.ts` is a shared Axios instance. Every request automatically attaches
   `Authorization: Bearer <token>` from the Zustand store -- no need to add it manually
   in every page.

## Folder structure

```
app/
|-- page.tsx                     Home page
|-- services/                    Browse & filter services
|-- technicians/[id]/            Technician profile + booking form
|-- auth/register, auth/login/   Auth forms
|-- payment/success, /cancel/    Stripe redirect landing pages
`-- dashboard/
    |-- customer/                Bookings, pay, review
    |-- technician/              Profile, services, availability, bookings
    `-- admin/                   Users, categories

lib/
|-- api.ts          Axios instance (auto-attaches JWT)
|-- auth-store.ts   Zustand store for the logged-in user
`-- cookies.ts       Tiny cookie helper (used by auth-store)

components/
|-- Navbar.tsx
|-- ServiceCard.tsx
`-- BookingStatusBadge.tsx

types/index.ts       Shared TypeScript types matching the backend's data shapes
proxy.ts              Route protection (runs before dashboard pages load)
```

## Notes for beginners

- Every page that needs data uses the simple `useEffect` + `useState` pattern --
  no extra data-fetching library, so it's easy to read top to bottom.
- Forms use plain `useState` + basic `if` checks for validation -- no schema library,
  to keep things approachable.
- Toast notifications (`react-hot-toast`) show success/error messages instead of
  `alert()` -- check `toast.success(...)` / `toast.error(...)` calls in each page.
