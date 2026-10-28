import { prisma } from './lib/prisma';

export const createPatient = (data: { fullName: string; phone?: string; dateOfBirth?: Date; gender?: string }) =>
  prisma.patient.create({ data });

export const getPatient = (patientId: number) =>
  prisma.patient.findUnique({ where: { patientId } });

export const searchPatients = (fragment: string) =>
  prisma.patient.findMany({
    where: { fullName: { contains: fragment, mode: 'insensitive' } },
  });

export const updatePatientPhone = (patientId: number, phone: string) =>
  prisma.patient.update({ where: { patientId }, data: { phone } });

export const deletePatient = (patientId: number) =>
  prisma.patient.delete({ where: { patientId } });