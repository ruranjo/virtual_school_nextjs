import React, { ReactNode } from "react";
import { NavigationCard } from "../NavigationCard";
import useUserStore from "@/src/store/store";
// Asegúrate de importar la interfaz desde el archivo correcto

import { RxAvatar } from 'react-icons/rx'; // Importa el ícono de avatar (ajusta la importación según tu configuración)
import { User } from "@/src/types/types";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const user: User | null = useUserStore((state) => state.user); // Obtén el usuario del store

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

  let rightColumnClasses = "mx-4 md:mx-0 md:w-full border border-red-900";

  return (
    <div className="md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0">
      <div className="fixed md:static w-full bottom-0 md:w-3/12 -mb-5">
        <NavigationCard />
      </div>
      <div className="w-full flex flex-col bg-white shadow-md shadow-gray-300 rounded-md mb-5">
        <div className="w-full h-auto  flex ">
          {/* Muestra información del usuario */}
          {user && (
            <div className="flex flex-col p-4">
              <div className="flex items-center mb-4 bg-secondary rounded-md text-white p-4">
                
                  <RxAvatar className="w-16 h-16 rounded-full" />
                
                <div className="ml-4 font-semibold ">
                  <p>CI: {user.cedula}</p>
                  <p>Nombre: {user.firstName}</p>
                  <p>Apellido: {user.lastName}</p>
                </div>
              </div>
              <p>Teléfono: {user.telefono}</p>
              <p>Email: {user.correo}</p>
              <p>Rol: {getRole(user.rolId)}</p>
              <p>Fecha de nacimiento: {user.birthdate}</p>
              <p>Género: {user.gender}</p>
              <p>Dirección: {user.address}</p>
            </div>
          )}
        </div>

        <div className={rightColumnClasses}>{children}</div>
      </div>
    </div>
  );
}
