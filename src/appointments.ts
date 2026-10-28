import { prisma } from './lib/prisma';

export const bookAppointment = (patientId: number, doctorId: number, appointmentDate: Date) =>
  prisma.appointment.create({
    data: {
      appointmentDate,
      Patient: { connect: { patientId } },
      Doctor: { connect: { doctorId } },
    },
  });

export const getAppointmentFull = (appointmentId: number) =>
  prisma.appointment.findUnique({
    where: { appointmentId },
    include: { Patient: true, Doctor: true },
  });

export const getDoctorUpcomingAppointments = (doctorId: number) =>
  prisma.appointment.findMany({
    where: { doctorId, status: 'scheduled', appointmentDate: { gte: new Date() } },
    orderBy: { appointmentDate: 'asc' },
  });

export const setAppointmentStatus = (appointmentId: number, status: string) =>
  prisma.appointment.update({ where: { appointmentId }, data: { status } });