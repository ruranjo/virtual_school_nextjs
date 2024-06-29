import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const { password, correo } = req.body;

  try {
    // Busca al usuario por cédula o correo
    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [
          { password: password },
          { correo: correo }
        ]
      }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Utiliza un secreto seguro para firmar el token
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      console.error('No se ha configurado un secreto JWT');
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Genera un token de acceso con una duración de 1 hora
    const token = jwt.sign({ id:usuario.id,  cedula: usuario.cedula, rolId: usuario.rolId }, secretKey, { expiresIn: '1h' });

    // Almacena el token en el encabezado de respuesta
    res.setHeader('Authorization', `Bearer ${token}`);

    // Retorna una respuesta exitosa con el token
    return res.status(200).json({ success: true, token: token });

  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
