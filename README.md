# Heavy Equipment Inspection System

A Next.js App Router application for administering and conducting heavy equipment inspections (track, wheel, and support), user management, verification workflows, and reporting/export.

## Features

- Role-based areas (Admin, Leader, Mechanic) with ProtectedRoute
- Inspections with detailed forms for Track, Wheel (tractor), and Support equipment
- Verification flow and inspection detail/edit views
- Admin user management: list, create, edit, delete (with confirmation)
- Reports & Analytics: charts, filters, and CSV export with inline Download on the table (with date range)

## Tech Stack

- Next.js App Router (Next.js runtime), React, TypeScript
- shadcn/ui components + Tailwind CSS
- Recharts for charts
- Prisma schema (PostgreSQL) for data modeling

## Project Structure

- `app/` routes (pages, API routes)
- `components/` shared UI and forms
- `lib/` utilities (export, schemas)
- `prisma/schema.prisma` data models
- `public/` assets

## Exporting Reports

- On Reports page, use the quick date filter or select a custom Date From / Date To.
- Click the “Download” button above the table. The CSV includes a UTF‑8 BOM for Excel and headers tailored to match Excel-style expectations (Date, HM, Type, etc.).

## Prisma Models

- Users, Equipment, Inspections, Verification, Detailed inspection data per type, Attachments, Maintenance, AuditLog, SystemSetting.
- Added helpful indexes and cascade behavior for performance and integrity. Review `prisma/schema.prisma` before generating a client in your environment.

## Running and Deploying

This project runs in v0’s Next.js preview. Publish to Vercel from v0 when ready. To install code locally, export via GitHub or download the ZIP from the block and run with your preferred Next.js setup.
