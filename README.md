# Prisma Hospital CRUD

Prisma CRUD for the existing `hospital_api` PostgreSQL database.

- Introspected with `npx prisma db pull` and cleaned (PascalCase models with `@@map`, camelCase fields with `@map`)
- CRUD for Patient, Doctor and Appointment
- Appointments are booked with nested `connect` and fetched with `include`

## Run

    npx prisma generate
    npx prisma db seed
    npx ts-node src/test.ts