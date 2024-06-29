"use client"; // cliente navegador cuando usa hook react, sino todo en el sevidor sin palabara sin hook servidor copila antes el documento y lo envia al servidor
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { imgLogin } from '@/src/assets/assets';
import useUserStore from '@/src/store/store';
import { User } from '@/src/types/types';



const LoginPage: React.FC = () => {
  const setUser = useUserStore(state => state.setUser);
  const router = useRouter();
  const [correo, setCorreo] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, password })
      });

      const data: { success: boolean, token: string, usuario: User, error: string } = await response.json();

      if (response.ok) {
        toast.success('¡Inicio de sesión exitoso!');
        localStorage.setItem('token', data.token); // Guarda el token
        setUser(data.usuario); // Guarda el usuario en el store
        //console.log(data.usuario);
        
        console.log(data.usuario.rol.nombre);
        
        switch (data.usuario.rol.nombre) {
          case "admin":
            router.push('/admin');
            break;
          case "profesor":
            router.push('/profesor');
            break;
          case "representante":
            router.push('/profile');
            break;
          
          default:
            router.push('/login');
            break;
        }
      } else {
        toast.error(data.error || 'Credenciales incorrectas. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      toast.error('Ocurrió un error. Por favor, intenta nuevamente.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Bienvenido de nuevo</span>
          <span className="font-light text-gray-400 mb-8">
            ¡Bienvenido de nuevo! Por favor ingresa tus datos
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Correo electrónico</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="correo"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Contraseña</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <span className="font-bold text-md">¿Olvidaste tu contraseña?</span>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-secondary text-white p-2 rounded-lg mb-6 border hover:bg-white hover:text-secondary hover:border hover:border-gray-300 transition-colors duration-300"
          >
            Iniciar sesión
          </button>

        </div>
        <div className="relative">
          <div className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover">
            <Image
              src={imgLogin}
              alt="Visual de inicio de sesión"
              fill
              objectFit="cover"
              className="rounded-r-2xl"
            />
          </div>
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              Estamos orgullosos de nuestra escuela Bienvenidos a tu hogar, tu escuela.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
