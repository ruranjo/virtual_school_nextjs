"use client"
import { useState, useEffect } from "react";

import useUserStore from "@/src/store/store";

import { AuthComponent } from "@/src/components/AuthComponent";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { Sidebar } from "@/src/components/Admin/Sidebar";
import { NavbarAdmin } from "@/src/components/NavbarAdmin";
import { FooterAdmin } from "@/src/components/FooterAdmin";
import { useRouter } from "next/navigation";
import { Profesor } from "@/src/types/profesor.type";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { user, setProfesor } = useUserStore();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfesorData = async () => {
      if (!user) return;

      try {
        // Llama a la API para obtener los datos del profesor asociado al usuario
        const response = await fetch(`/api/profesores?id_usuario=${user.id}`);

        if (!response.ok) {
          throw new Error("Error al obtener datos del profesor");
        }

        // Parsea la respuesta como JSON
        const data: Profesor = await response.json();

        // Establece el profesor en el store
        setProfesor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfesorData();
  }, [user, setProfesor]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthComponent>
      <div className="flex flex-col lg:flex-row">
        <div className="bg-primary p-5 h-full lg:h-screen lg:w-1/4">
          <Sidebar isAdmin={false} />
        </div>
        <div className="flex-1 p-5 flex flex-col gap-3">
          <NavbarAdmin isAdmin={false} title={"PROFESOR: " + user?.firstName + " " + user?.lastName} />
          <div className="flex-grow overflow-auto bg-white rounded-md border-[2px] border-gray-300 px-5">
            {children}
          </div>
          <FooterAdmin />
        </div>
      </div>
    </AuthComponent>
  );
};

export default Layout;
