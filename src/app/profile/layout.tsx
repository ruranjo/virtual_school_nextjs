"use client"
import React, { ReactNode } from "react";
import { RxAvatar } from 'react-icons/rx';
import { User } from "@/src/types/types";
import { NavigationCard } from "@/src/components";
import { AuthComponent } from "@/src/components/AuthComponent";
import useUserStore from "@/src/store/store";
import Image from "next/image";
import { logoIconMd } from "@/src/assets/assets";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const user: User | null = useUserStore((state) => state.user);

  const getRole = (id_rol: number) => {
    switch (id_rol) {
      case 1:
        return "Representante";
      case 2:
        return "Estudiante";
      case 3:
        return "Profesor";
      default:
        return "Desconocido";
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <AuthComponent>
      <div className="md:flex py-8 flex-col mt-4 max-w-6xl mx-auto gap-6 mb-24 md:mb-0">
        <div className="flex  justify-between  border-[2px] border-white bg-secondary rounded-md mb-2">
          <div className="flex  items-center justify-center relative  rounded-md overflow-hidden p-4 gap-2">
            <Image src={logoIconMd} alt="logoIcon" width={50} height={50} className="bg-white rounded-md" />
            <a href="#" className="font-semibold text-base text-white">SOL EDUCATIVO</a>
          </div>
          <div className="flex items-center text-center text-white p-4">
            {getCurrentDate()}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="fixed bottom-0 w-full -mb-5 md:static md:w-1/4">
            <NavigationCard />
          </div>

          <div className="w-full flex flex-col bg-white shadow-md shadow-gray-300 rounded-md mb-5 transition-all duration-300 hover:shadow-lg md:w-2/4">
            <div className="border border-gray-300 p-4 rounded-md mx-4 md:mx-0 md:w-full">
              {children}
            </div>
          </div>

          <div className="w-full h-auto bg-blue-300 p-4 rounded-md self-start md:w-1/4">
            {user && (
              <div className="flex flex-col p-4">
                <div className="flex flex-col items-center mb-4 bg-secondary rounded-md text-white p-4 transition-all duration-300 hover:bg-secondary-light">
                  <RxAvatar className="w-16 h-16 rounded-full" />
                  <div className="mt-4 font-semibold text-center md:text-left">
                    <p>CI: {user.cedula}</p>
                    <p>Nombre: {user.firstName}</p>
                    <p>Apellido: {user.lastName}</p>
                  </div>
                </div>
                <p className="mb-2">Teléfono: {user.telefono}</p>
                <p className="mb-2">Email: {user.correo}</p>
                <p className="mb-2">Rol: {getRole(user.rolId)}</p>
                <p className="mb-2">Fecha de nacimiento: {user.birthdate}</p>
                <p className="mb-2">Género: {user.gender}</p>
                <p className="mb-2">Dirección: {user.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthComponent>
  );
}
