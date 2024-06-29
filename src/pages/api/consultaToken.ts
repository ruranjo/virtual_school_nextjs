// pages/api/authenticate.ts
/*
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const {  token } = req.body;
  try{
    
jwt.verify(token, process.env.JWT_SECRET || 's3cR3tK3y_wIthdfd!@lCh4r@ct3rdfdfsdf212793', (err, decoded) => {
    if (err) {
        console.error('Error al verificar el token:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
    console.log('Token decodificado:', decoded);
});

    return res.status(200).json({ success: true, token: token, usuario: usuario});

  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

*/

