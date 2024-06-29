import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { role } = req.query; // Obtener el parámetro 'role' de la URL

  try {
    switch (req.method) {
      case 'GET':
        return handleGet(req, res, role as string);
      case 'POST':
        return res.status(405).json({ error: 'Método no permitido' });
      case 'PUT':
        return res.status(405).json({ error: 'Método no permitido' });
      case 'DELETE':
        return res.status(405).json({ error: 'Método no permitido' });
      default:
        return res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, role: string) {
  const usuarios = await getAllUsuariosRole(role);
  res.status(200).json(usuarios);
}

async function getAllUsuariosRole(role: string): Promise<Usuario[]> {
  let usuarios: Usuario[];
  switch (role) {
    case 'profesor':
      usuarios = await prisma.usuario.findMany({
        include: {
          rol: true,
          profesor: true,
        },
        where: {
          rol: {
            nombre: role,
          },
        },
      });
      break;
    case 'estudiante':
      usuarios = await prisma.usuario.findMany({
        include: {
          rol: true,
          estudiante: true,
        },
        where: {
          rol: {
            nombre: role,
          },
        },
      });
      break;
    case 'representante':
      usuarios = await prisma.usuario.findMany({
        include: {
          rol: true,
          representante: true,
        },
        where: {
          rol: {
            nombre: role,
          },
        },
      });
      break;
    default:
      usuarios = [];
      break;
  }
  return usuarios;
}
