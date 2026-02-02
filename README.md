# EduBridge

A platform where students can find tutors and book sessions.

## What it does

- Students can browse tutors, filter by subject/price/rating, and book sessions
- Tutors can create profiles, set their availability, and manage bookings
- Admins can manage users, categories, and view all bookings

## Tech used

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui

**Backend:** Express.js, Prisma, PostgreSQL, better-auth

## Running locally

### Frontend

```bash
cd education-bridge-client
npm install
npm run dev
```

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend

```bash
cd education-bridge-server
npm install
npm run dev
```

Create `.env`:
```
DATABASE_URL=your_postgres_url
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Live demo

- Frontend: https://education-bridge-client.vercel.app
- Backend: https://education-bridge-server.vercel.app

## Features

- Email/password login
- Google/GitHub login
- Tutor search with filters
- Booking system
- Review system
- Admin dashboard
- Responsive design

