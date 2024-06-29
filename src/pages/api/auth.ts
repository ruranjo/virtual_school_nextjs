// pages/api/authenticate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const {  correo, password } = req.body;

  try {
    // Busca al usuario por cédula o correo
    const usuario = await prisma.usuario.findFirst({
      where: {
        correo: correo,
        password: password
      },
      include: {
        rol: true,
      },
    });

    

    if (!usuario || usuario.password !== password) { // Aquí deberías comparar con la contraseña cifrada
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log(process.env.JWT_SECRET)
    // Genera un token de acceso
    const token = jwt.sign(
        { cedula: usuario.cedula, rolId: usuario.rolId },
        process.env.JWT_SECRET || 's3cR3tK3y_wIthdfd!@lCh4r@ct3rdfdfsdf212793', // Provide a default value for JWT_SECRET
        { expiresIn: '1h' }
    );

    // Set the token in the Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);

    // Return a success response
    return res.status(200).json({ success: true, token: token, usuario: usuario});

  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
