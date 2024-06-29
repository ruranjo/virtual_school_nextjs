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
  const { id_usuario } = req.query;

  try {
    if (id_usuario) {
      // Obtener el profesor asociado al id_usuario
      const profesor = await getProfesorByUserId(Number(id_usuario));
      
      if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado para el usuario dado' });
      }
      
      return res.status(200).json(profesor);
    } else {
      // Obtener todos los profesores
      const profesores = await getAllProfesores();
      return res.status(200).json(profesores);
    }
  } catch (error) {
    console.error('Error al obtener datos del profesor:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}

async function getProfesorByUserId(id_usuario: number) {
  // Buscar el profesor asociado al id_usuario
  const profesor = await prisma.profesor.findUnique({
    where: { usuarioId: id_usuario },
    include: {
      usuario: true,
      aulas: {
        include: {
          estudiantes: {
            include: {
              usuario: true,
              representante: {
                include: {
                  usuario: true,
                },
              },
            },
          },
          actividades: true,
        },
      },
    },
  });
  return profesor;
}

async function getAllProfesores() {
  // Obtener todos los profesores
  const profesores = await prisma.profesor.findMany({
    include: {
      usuario: true,
    },
  });
  return profesores;
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { usuarioId, codigo, grado, area } = req.body;
  const nuevoProfesor = await createProfesor(usuarioId, codigo, grado, area);
  res.status(201).json(nuevoProfesor);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { usuarioId, codigo, grado, area } = req.body;
  const profesorActualizado = await updateProfesor(Number(id), {
    usuarioId,
    codigo,
    grado,
    area,
  });
  res.status(200).json(profesorActualizado);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const profesorEliminado = await deleteProfesor(Number(id));
  res.status(200).json(profesorEliminado);
}

async function createProfesor(
  usuarioId: number,
  codigo: string,
  grado: string,
  area: string
) {
  const profesor = await prisma.profesor.create({
    data: {
      usuarioId,
      codigo,
      grado,
      area,
    },
  });
  return profesor;
}

async function updateProfesor(
  id: number,
  data: {
    usuarioId?: number;
    codigo?: string;
    grado?: string;
    area?: string;
  }
) {
  const profesor = await prisma.profesor.update({
    where: { id },
    data,
  });
  return profesor;
}

async function deleteProfesor(id: number) {
  const profesor = await prisma.profesor.delete({
    where: { id },
  });
  return profesor;
}
