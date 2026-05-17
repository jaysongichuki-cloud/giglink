# GigLink

**Connecting students to quick gigs** — a student-friendly freelance marketplace built with React, JSON Server, and Firebase Auth.

<!-- ![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Tests](https://img.shields.io/badge/coverage-%E2%89%A530%25-green) -->

## Features

- Post, edit, and delete gigs
- Browse and search gigs by keyword and category
- Apply for gigs and track application status
- Protected dashboard for gig owners and applicants
- Google & GitHub sign-in (Firebase)
- Fully responsive layout (mobile + desktop)
- Data persisted via JSON Server (no `localStorage` / browser cache)
- CI/CD with GitHub Actions → Vercel

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, React Router, Tailwind CSS |
| API | JSON Server (`db.json`) |
| Auth | Firebase (Google + GitHub) |
| Tests | Vitest, React Testing Library |
| Deploy | GitHub Actions, Vercel / Netlify |

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase (dedicated GigLink project)

GigLink uses its **own** Firebase project — do not reuse credentials from other apps.

**Option A — automated (recommended):**

```bash
npm run firebase:setup
```

This logs you into Firebase CLI, creates project `giglink-student`, writes `.env`, and prints the console link to enable Google/GitHub sign-in.

**Option B — manual:**

1. [Create a Firebase project](https://console.firebase.google.com/) named **GigLink**
2. Add a **Web app**, copy config into `.env` (see `.env.example`)
3. **Authentication → Sign-in method** → enable **Google** and **GitHub**
4. **Authentication → Settings** → ensure `localhost` is an authorized domain

### 3. Run locally

Starts JSON Server (port 3001) and Vite (port 5173) together:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). API requests proxy through `/api` → `http://localhost:3001`.

### 4. Run tests

```bash
npm run test:coverage
```

Coverage thresholds are set to **30%** minimum in `vite.config.js`.

## Application flow

1. **Home** — overview and call-to-action
2. **Browse gigs** — search/filter listings (public)
3. **Gig detail** — view job, apply when signed in
4. **Login** — Google or GitHub via Firebase
5. **Dashboard** — manage your gigs, applications, and incoming applicants
6. **Post / Edit gig** — protected routes for gig owners

## Deployment

### GitHub Actions secrets

| Secret | Purpose |
|--------|---------|
| `VITE_FIREBASE_*` | Firebase config for production build |
| `VERCEL_TOKEN` | Vercel deploy token |
| `VERCEL_ORG_ID` | Vercel team/org ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

Set repository variable `VITE_API_URL` to your hosted JSON Server URL in production.

### Semantic versioning

This project follows [SemVer](https://semver.org/). The initial release is **v1.0.0**:

```bash
git tag -a v1.0.0 -m "Release v1.0.0 — GigLink MVP"
git push origin v1.0.0
```

See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## Project requirements checklist

| Requirement | Status |
|-------------|--------|
| React routing |  React Router v7 |
| Social authentication |  Firebase Google + GitHub |
| GitHub Actions deployment |  `.github/workflows/` |
| Fully responsive |  Tailwind CSS |
| Data persistence (no localStorage) |  JSON Server |
| 30% test coverage |  Vitest thresholds |
| Standard application flow |  Home → Browse → Detail → Apply → Dashboard |
| Semantic versioning release |  v1.0.0 |

## License

MIT
