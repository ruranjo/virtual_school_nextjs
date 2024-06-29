// C:\Users\PC\Desktop\dashboard\dashboard_admin\src\utils\auth.ts

import jwt from 'jsonwebtoken';

// Verifica si process.env.JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
