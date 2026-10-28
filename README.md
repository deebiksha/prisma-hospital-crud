# Prisma Hospital CRUD

Prisma CRUD for the existing `hospital_api` PostgreSQL database.

- Introspected with `npx prisma db pull` and cleaned (PascalCase models with `@@map`, camelCase fields with `@map`)
- CRUD for Patient, Doctor and Appointment
- Appointments are booked with nested `connect` and fetched with `include`

## Setup

Create a `.env` file (see `.env.example`) with your `DATABASE_URL`.

    npm install
    npx prisma generate
    npx prisma db seed
    npm test

## Test output

![Test output](docs/test-output.png)