# LeadDesk Mini

A production-ready, minimal lead capture and management dashboard built with Next.js 15, MongoDB, and NextAuth.

## Project Overview

LeadDesk Mini provides a highly focused tool for collecting client project inquiries via a public landing page. The submissions are securely saved to MongoDB and can be managed internally by an authenticated administrator through a protected dashboard.

## Features

- **Public Lead Capture:** Clean, responsive landing page to collect names, emails, budgets, and project details.
- **Client & Server Validation:** Ensures data integrity using Zod and React Hook Form.
- **Secure Authentication:** Email and hashed password login powered by NextAuth (Auth.js v5).
- **Protected Dashboard:** Middleware-secured admin route (`/admin`) restricting unauthorized access.
- **Lead Management:** Instantly search, filter, and patch lead statuses (New, Contacted, Closed) on the dashboard without page reloads.
- **Dark Mode Support:** Seamless system/manual dark mode toggling with a premium black-and-white aesthetic.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** NextAuth.js v5 (Credentials Provider), bcryptjs
- **Validation:** React Hook Form, Zod

## Folder Structure

```text
├── app/
│   ├── admin/          # Protected dashboard routes
│   ├── api/            # Route handlers (auth, leads)
│   ├── login/          # Public authentication page
│   ├── layout.js       # Global layout & NextThemes wrapper
│   └── page.js         # Public landing page (Lead Capture)
├── components/         # Reusable UI components (Header, Forms, Dashboard)
├── lib/                # Database connection & validation schemas
├── models/             # Mongoose schemas (Lead, User)
├── scripts/            # Database initialization tools
├── public/assets/      # Static images and logos
├── auth.js             # NextAuth v5 core configuration
└── middleware.js       # Route protection logic