// components/AuthComponent.tsx
"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import jwt from 'jsonwebtoken';
import { LoadingSpinner } from '../LoadingSpinner';

interface AuthComponentProps {
  children: ReactNode;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Obtener el token desde el almacenamiento local (localStorage, sessionStorage, etc.)
    const token = localStorage.getItem('token');

    // Verificar si el token es válido.
    if (!token || !isValidToken(token)) {
      router.push('/login');
    } else {
      setIsLoading(false); // Token válido, dejar de cargar y mostrar contenido
    }
  }, [router]);

  // Función para verificar si el token es válido.
  const isValidToken = (token: string): boolean => {
    try {
      // Decodificar el token para verificar su validez.
      const decodedToken = jwt.decode(token);
      // Si el token se puede decodificar correctamente, lo consideramos válido.
      return !!decodedToken;
    } catch (error) {
      // Si hay algún error al decodificar el token, lo consideramos inválido.
      return false;
    }
  };

  // Mostrar un mensaje de carga mientras se verifica el token.
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Si el token es válido, renderizar los children.
  return <>{children}</>;
};

export default AuthComponent;