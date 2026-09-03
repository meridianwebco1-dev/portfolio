# Meridian Web Co.

This is a premium, high-performance portfolio website built with Next.js 15, React 19, Tailwind CSS v4, and Framer Motion.

## Features
- Fully responsive, premium design with glassmorphism and 60fps animations.
- Dark mode toggle with `next-themes`.
- Functional Contact form with local SQLite database (via Prisma) and Resend email delivery.
- Dynamic Portfolio Case Study routes (`/portfolio/[slug]`).
- Interactive Testimonials and Tech Stack marquee.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
# Database (Prisma SQLite - auto-generated)
DATABASE_URL="file:./dev.db"

# Resend API Key for Contact Form Emails
# Get your free key at https://resend.com
RESEND_API_KEY="your_resend_api_key_here"
```

### 3. Initialize Database
Initialize the SQLite database and Prisma client:
```bash
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
