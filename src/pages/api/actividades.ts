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
  const { id } = req.query;
  if (id) {
    return getActividadById(Number(id), res);
  } else {
    const actividades = await getAllActividades();
    return res.status(200).json(actividades);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { fechaInicio, fechaFinal, comentario, entregado, aulaId, name } = req.body;
  try {
    const nuevaActividad = await createActividad(fechaInicio, fechaFinal, aulaId, comentario, entregado, name);
    res.status(201).json(nuevaActividad);
  } catch (error) {
    console.error('Error al crear la actividad:', error);
    res.status(500).json({ error: 'Error al crear la actividad' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { fechaInicio, fechaFinal, comentario, entregado, name } = req.body;
  try {
    const actividadActualizada = await updateActividad(Number(id), {
      name,
      fechaInicio,
      fechaFinal,
      comentario,
      entregado,
    });
    res.status(200).json(actividadActualizada);
  } catch (error) {
    console.error('Error al actualizar la actividad:', error);
    res.status(500).json({ error: 'Error al actualizar la actividad' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const actividadEliminada = await deleteActividad(Number(id));
    res.status(200).json(actividadEliminada);
  } catch (error) {
    console.error('Error al eliminar la actividad:', error);
    res.status(500).json({ error: 'Error al eliminar la actividad' });
  }
}

async function createActividad(
  name: string,
  fechaInicio: Date,
  fechaFinal: Date,
  aulaId: number,
  comentario: string,
  entregado: boolean,
) {
  try {
    const actividad = await prisma.actividad.create({
      data: {
        name,
        fechaInicio,
        fechaFinal,
        comentario,
        entregado,
        aulaId,
      },
    });

    console.log(`Actividad creada: ${actividad.id}`);

    const estudiantes = await prisma.estudiante.findMany({
      where: {
        aulas: {
          some: {
            id: aulaId,
          },
        },
      },
    });

    if (estudiantes.length === 0) {
      console.error('No se encontraron estudiantes en el aula.');
    } else {
      console.log(`Estudiantes encontrados: ${estudiantes.length}`);
    }

    const aula = await prisma.aula.findUnique({
      where: { id: aulaId },
      include: { profesor: true },
    });

    if (!aula) {
      throw new Error('El aula no existe');
    }

    if (!aula.profesor) {
      throw new Error('El aula no tiene profesor asignado');
    }

    console.log(`Profesor encontrado: ${aula.profesor.id}`);

    const notas = estudiantes.map((estudiante) => ({
      actividadId: actividad.id,
      estudianteId: estudiante.id,
      profesorId: aula.profesor.id,
      ponderacion: 0,
    }));

    const notasCreadas = await prisma.nota.createMany({
      data: notas,
    });

    console.log(`Notas creadas: ${notasCreadas.count}`);

    return actividad;
  } catch (error) {
    console.error('Error en createActividad:', error);
    throw error;
  }
}

async function getAllActividades() {
  const actividades = await prisma.actividad.findMany({
    include: {
      aula: {
        include: {
          profesor: true,
        },
      },
    },
  });
  return actividades;
}

async function getActividadById(id: number, res: NextApiResponse) {
  try {
    const actividad = await prisma.actividad.findUnique({
      where: { id },
      include: {
        notas: {
          include: {
            estudiante: {
              include: {
                usuario: true,
              },
            },
          },
        },
        aula: {
          include: {
            profesor: true,
          },
        },
      },
    });

    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    return res.status(200).json(actividad);
  } catch (error) {
    console.error('Error al obtener la actividad:', error);
    return res.status(500).json({ error: 'Error al obtener la actividad' });
  }
}

async function updateActividad(
  id: number,
  data: {
    name?: string;
    fechaInicio?: Date;
    fechaFinal?: Date;
    comentario?: string;
    entregado?: boolean;
  }
) {
  const actividad = await prisma.actividad.update({
    where: { id },
    data,
  });
  return actividad;
}

async function deleteActividad(id: number) {
  const actividad = await prisma.actividad.delete({
    where: { id },
  });
  return actividad;
}
