import { prisma } from './lib/prisma';
import { createPatient, getPatient, searchPatients, updatePatientPhone, deletePatient } from './patients';
import { createDoctor, listDoctorsBySpecialty, deleteDoctor } from './doctors';
import { bookAppointment, getAppointmentFull, getDoctorUpcomingAppointments, setAppointmentStatus } from './appointments';

async function main() {
  console.log('--- Patients ---');
  const patient = await createPatient({ fullName: 'Test Patient', phone: '7777777777' });
  console.log('Created:', patient.fullName, patient.patientId);
  const found = await getPatient(patient.patientId);
  console.log('Found:', found?.fullName);
  const updated = await updatePatientPhone(patient.patientId, '8888888888');
  console.log('Updated phone:', updated.phone);
  const results = await searchPatients('Test Patient');
  console.log('Search results:', results.length);

  console.log('--- Doctors ---');
  const doctor = await createDoctor({ fullName: 'Dr. Test', specialty: 'General Medicine' });
  console.log('Created:', doctor.fullName, doctor.doctorId);
  const gm = await listDoctorsBySpecialty('General Medicine');
  console.log('General Medicine doctors:', gm.length);

  console.log('--- Appointments ---');
  const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const appt = await bookAppointment(patient.patientId, doctor.doctorId, future);
  console.log(`Booked: ${appt.appointmentId} for ${patient.fullName}`);
  const full = await getAppointmentFull(appt.appointmentId);
  console.log(`Full fetch: ${full?.Patient.fullName} with ${full?.Doctor.fullName}`);
  const schedule = await getDoctorUpcomingAppointments(doctor.doctorId);
  console.log(`Doctor schedule: ${schedule.length} appointment(s)`);
  const cancelled = await setAppointmentStatus(appt.appointmentId, 'cancelled');
  console.log('Status updated to:', cancelled.status);

  console.log('--- Cleanup ---');
  await deletePatient(patient.patientId);
  await deleteDoctor(doctor.doctorId);
  console.log('Test data cleaned up.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());