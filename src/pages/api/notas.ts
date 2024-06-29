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
  const { actividadId } = req.query;
  if (actividadId) {
    const notas = await getNotasByActividadId(Number(actividadId));
    return res.status(200).json(notas);
  } else {
    const notas = await getAllNotas();
    return res.status(200).json(notas);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { actividadId, profesorId, estudianteId, ponderacion } = req.body;
  const nuevaNota = await createNota(actividadId, profesorId, estudianteId, ponderacion);
  res.status(201).json(nuevaNota);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, ponderacion } = req.body;
  const notaActualizada = await updateNota(id, ponderacion);
  res.status(200).json(notaActualizada);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const notaEliminada = await deleteNota(id);
  res.status(200).json(notaEliminada);
}

async function createNota(actividadId: number, profesorId: number, estudianteId: number, ponderacion: number) {
  const nota = await prisma.nota.create({
    data: {
      actividadId,
      profesorId,
      estudianteId,
      ponderacion,
    },
  });
  return nota;
}

async function getAllNotas() {
  const notas = await prisma.nota.findMany({
    include: {
      actividad: true,
      profesor: true,
      estudiante: true,
    },
  });
  return notas;
}

async function getNotasByActividadId(actividadId: number) {
  const notas = await prisma.nota.findMany({
    where: { actividadId },
    include: {
      actividad: true,
      estudiante: {
        include:{
          usuario:true,
        }
      },
    },
  });
  return notas;
}

async function updateNota(id: number, ponderacion: number) {
  const nota = await prisma.nota.update({
    where: { id },
    data: {
      ponderacion,
    },
    include: {
      actividad: true,
      profesor: true,
      estudiante: true,
    },
  });
  return nota;
}

async function deleteNota(id: number) {
  const nota = await prisma.nota.delete({
    where: { id },
    include: {
      actividad: true,
      profesor: true,
      estudiante: true,
    },
  });
  return nota;
}
