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
  const estudiantes = await getAllEstudiantes();
  res.status(200).json(estudiantes);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { usuarioId, representanteId } = req.body;
  const nuevoEstudiante = await createEstudiante(usuarioId, representanteId);
  res.status(201).json(nuevoEstudiante);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { usuarioId, representanteId } = req.body;
  const estudianteActualizado = await updateEstudiante(Number(id), {
    usuarioId,
    representanteId,
  });
  res.status(200).json(estudianteActualizado);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const estudianteEliminado = await deleteEstudiante(Number(id));
  res.status(200).json(estudianteEliminado);
}

async function createEstudiante(
  usuarioId: number,
  representanteId: number
) {
  const estudiante = await prisma.estudiante.create({
    data: {
      usuarioId,
      representanteId,
    },
    include: {
      usuario: true,
      representante: true,
    },
  });
  return estudiante;
}

async function getAllEstudiantes() {
  const estudiantes = await prisma.estudiante.findMany({
    include: {
      usuario: true,
      representante: true,
    },
  });
  return estudiantes;
}

async function updateEstudiante(
  id: number,
  data: {
    usuarioId?: number;
    representanteId?: number;
  }
) {
  const estudiante = await prisma.estudiante.update({
    where: { id },
    data,
    include: {
      usuario: true,
      representante: true,
    },
  });
  return estudiante;
}

async function deleteEstudiante(id: number) {
  const estudiante = await prisma.estudiante.delete({
    where: { id },
    include: {
      usuario: true,
      representante: true,
    },
  });
  return estudiante;
}
