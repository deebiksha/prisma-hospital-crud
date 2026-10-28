import { prisma } from './lib/prisma';

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  const d1 = await prisma.doctor.create({ data: { fullName: 'Dr. Asha Rao', specialty: 'Cardiology', phone: '9100000001' } });
  const d2 = await prisma.doctor.create({ data: { fullName: 'Dr. Vikram Shah', specialty: 'Pediatrics', phone: '9100000002' } });
  const p1 = await prisma.patient.create({ data: { fullName: 'Ravi Kumar', phone: '9000000001', dateOfBirth: new Date('1990-05-14'), gender: 'Male' } });
  const p2 = await prisma.patient.create({ data: { fullName: 'Meera Nair', phone: '9000000002', dateOfBirth: new Date('1985-11-02'), gender: 'Female' } });

  await prisma.appointment.create({ data: { appointmentDate: new Date('2026-12-01T10:00:00Z'), Patient: { connect: { patientId: p1.patientId } }, Doctor: { connect: { doctorId: d1.doctorId } } } });
  await prisma.appointment.create({ data: { appointmentDate: new Date('2026-12-02T11:30:00Z'), Patient: { connect: { patientId: p2.patientId } }, Doctor: { connect: { doctorId: d2.doctorId } } } });

  console.log('Seed complete:');
  console.log('Doctors:', await prisma.doctor.count());
  console.log('Patients:', await prisma.patient.count());
  console.log('Appointments:', await prisma.appointment.count());
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());