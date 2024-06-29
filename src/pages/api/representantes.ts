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
  const { id_representante, id_representanteall } = req.query;

  if (id_representante) {
    return getEstudiantesByRepresentante(Number(id_representante), res);
  } else if (id_representanteall) {
    return getDetailedInfoByRepresentante(Number(id_representanteall), res);
  } else {
    const representantes = await getAllRepresentantes();
    return res.status(200).json(representantes);
  }
}


async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { usuarioId, direccion, ocupacion, estadoCivil, edad } = req.body;
  const nuevoRepresentante = await createRepresentante(usuarioId, direccion, ocupacion, estadoCivil, edad);
  res.status(201).json(nuevoRepresentante);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { usuarioId, direccion, ocupacion, estadoCivil, edad } = req.body;
  const representanteActualizado = await updateRepresentante(Number(id), {
    usuarioId,
    direccion,
    ocupacion,
    estadoCivil,
    edad,
  });
  res.status(200).json(representanteActualizado);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const representanteEliminado = await deleteRepresentante(Number(id));
  res.status(200).json(representanteEliminado);
}

async function createRepresentante(
  usuarioId: number,
  direccion: string,
  ocupacion: string,
  estadoCivil: string,
  edad: number
) {
  const representante = await prisma.representante.create({
    data: {
      usuarioId,
      direccion,
      ocupacion,
      estadoCivil,
      edad,
    },
  });
  return representante;
}

async function getAllRepresentantes() {
  const representantes = await prisma.representante.findMany({
    include: {
      usuario: true,
    },
  });
  return representantes;
}

async function updateRepresentante(
  id: number,
  data: {
    usuarioId?: number;
    direccion?: string;
    ocupacion?: string;
    estadoCivil?: string;
    edad?: number;
  }
) {
  const representante = await prisma.representante.update({
    where: { id },
    data,
  });
  return representante;
}

async function deleteRepresentante(id: number) {
  const representante = await prisma.representante.delete({
    where: { id },
  });
  return representante;
}

async function getEstudiantesByRepresentante(id_representante: number, res: NextApiResponse) {
  const representante = await prisma.representante.findUnique({
    where: { id: id_representante },
    include: {
      estudiantes: {
        include: {
          usuario: true,
        }
      }
    }
  });

  if (!representante) {
    return res.status(404).json({ error: 'Representante no encontrado' });
  }

  const estudiantesRelacionados = representante.estudiantes.map(estudiante => ({
    id: estudiante.id,
    usuarioId: estudiante.usuarioId,
    representanteId: estudiante.representanteId,
    usuario: estudiante.usuario // Datos del usuario relacionados
  }));

  return res.status(200).json(estudiantesRelacionados);
}

async function getDetailedInfoByRepresentante(id_representante: number, res: NextApiResponse) {
  const representante = await prisma.representante.findUnique({
    where: { id: id_representante },
    include: {
      estudiantes: {
        include: {
          usuario: true,
          aulas: {
            include: {
              profesor: {
                include: {
                  usuario: true,
                },
              },
              actividades: {
                include: {
                  notas: {
                    where: {
                      estudianteId: {
                        in: await prisma.estudiante.findMany({
                          where: { representanteId: id_representante },
                          select: { id: true },
                        }).then(estudiantes => estudiantes.map(est => est.id)),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!representante) {
    return res.status(404).json({ error: 'Representante no encontrado' });
  }

  const resultado = representante.estudiantes.map(estudiante => ({
    estudiante: {
      id: estudiante.id,
      usuario: estudiante.usuario,
      aulas: estudiante.aulas.map(aula => ({
        aula: {
          id: aula.id,
          nombre: aula.nombre,
          profesor: aula.profesor ? aula.profesor.usuario : null,
          actividades: aula.actividades.map(actividad => ({
            actividad: {
              id: actividad.id,
              name: actividad.name,
              fechaInicio: actividad.fechaInicio,
              fechaFinal: actividad.fechaFinal,
              comentario: actividad.comentario,
              entregado: actividad.entregado,
              notas: actividad.notas.map(nota => ({
                nota: {
                  id: nota.id,
                  ponderacion: nota.ponderacion,
                },
              })),
            },
          })),
        },
      })),
    },
  }));

  return res.status(200).json(resultado);
}
