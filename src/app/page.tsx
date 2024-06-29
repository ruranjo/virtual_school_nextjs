"use client"
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Landing } from "../components"; // Importa solo el componente Landing si Profile ya no se usará directamente
import useUserStore from "../store/store";

// Simulación de una función de verificación de autenticación
const isAuthenticated = () => {
  // Implementa aquí tu lógica de autenticación
  // Por ejemplo, podrías verificar un token en el local storage o una cookie
  return true; // Cambia esto según tu lógica de autenticación
};

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) {
      if (isAuthenticated()) {
        router.push("/profile");
      } else {
        router.push("/login");
      }
    }
  }, [isLoggedIn, router]);

  return (
    <>
      {
        !isLoggedIn && 
        <main className="py-4 !scroll-smooth">
          <Landing />
        </main>
      }
    </>
  );
}