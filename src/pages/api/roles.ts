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
  const roles = await getAllRoles();
  res.status(200).json(roles);
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { nombre, descripcion } = req.body;
  const nuevoRol = await createRol(nombre, descripcion);
  res.status(201).json(nuevoRol);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, nombre, descripcion } = req.body;
  const rolActualizado = await updateRol(id, nombre, descripcion);
  res.status(200).json(rolActualizado);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const rolEliminado = await deleteRol(id);
  res.status(200).json(rolEliminado);
}

async function createRol(nombre: string, descripcion?: string) {
  const rol = await prisma.rol.create({
    data: {
      nombre,
      descripcion,
    },
  });
  return rol;
}

async function getRolById(id: number) {
  const rol = await prisma.rol.findUnique({
    where: { id },
  });
  return rol;
}

async function getAllRoles() {
  const roles = await prisma.rol.findMany();
  return roles;
}

async function updateRol(id: number, nombre?: string, descripcion?: string) {
  const rol = await prisma.rol.update({
    where: { id },
    data: {
      nombre,
      descripcion,
    },
  });
  return rol;
}

async function deleteRol(id: number) {
  const rol = await prisma.rol.delete({
    where: { id },
  });
  return rol;
}
