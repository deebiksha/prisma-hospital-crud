import { prisma } from './lib/prisma';

export const createDoctor = (data: { fullName: string; specialty: string; phone?: string }) =>
  prisma.doctor.create({ data });

export const getDoctor = (doctorId: number) =>
  prisma.doctor.findUnique({ where: { doctorId } });

export const listDoctorsBySpecialty = (specialty: string) =>
  prisma.doctor.findMany({ where: { specialty } });

export const deleteDoctor = (doctorId: number) =>
  prisma.doctor.delete({ where: { doctorId } });