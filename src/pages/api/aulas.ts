import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return handleGet(req, res);
      case 'POST':
        return handlePost(req, res);
      case 'PUT':
        return handlePut(req, res);
      case 'DELETE':
        return handleDelete(req, res);
      default:
        return res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const aulas = await getAllAulas();
  res.status(200).json(aulas);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { profesorId, nombre, estudianteIds } = req.body;
  const nuevaAula = await createAula(profesorId, nombre, estudianteIds);
  res.status(201).json(nuevaAula);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { profesorId, nombre, estudianteIds } = req.body;
  const aulaActualizada = await updateAula(Number(id), { profesorId, nombre, estudianteIds });
  res.status(200).json(aulaActualizada);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const aulaEliminada = await deleteAula(Number(id));
  res.status(200).json(aulaEliminada);
}

async function createAula(profesorId: number, nombre: string, estudianteIds: number[]) {
  const aula = await prisma.aula.create({
    data: {
      profesorId,
      nombre,
      estudiantes: {
        connect: estudianteIds.map(id => ({ id })),
      },
    },
    include: {
      profesor: true,
      estudiantes: true,
    },
  });
  return aula;
}

async function getAllAulas() {
  const aulas = await prisma.aula.findMany({
    include: {
      profesor: true,
      estudiantes: true,
      actividades: true,
    },
  });
  return aulas;
}

async function updateAula(
  id: number,
  data: {
    profesorId?: number;
    nombre?: string;
    estudianteIds?: number[];
  }
) {
  const aula = await prisma.aula.update({
    where: { id },
    data: {
      profesorId: data.profesorId,
      nombre: data.nombre,
      estudiantes: data.estudianteIds ? {
        set: data.estudianteIds.map(id => ({ id })),
      } : undefined,
    },
    include: {
      profesor: true,
      estudiantes: true,
    },
  });
  return aula;
}

async function deleteAula(id: number) {
  const aula = await prisma.aula.delete({
    where: { id },
    include: {
      profesor: true,
      estudiantes: true,
    },
  });
  return aula;
}
