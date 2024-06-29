import { imgStudents } from "@/src/assets/assets";
import Image from "next/image";
import React from "react";

const StudentsSection: React.FC = () => {
  const imageHeight = 260; // Ajusta esta altura según tus necesidades

  return (
    <div className="container mx-auto mt-12 px-4">
      <div>
        <p className="text-white text-base lg:text-xl font-medium uppercase">
          NUESTROS ALUMNOS
        </p>
        <p className="text-white text-3xl lg:text-5xl font-medium capitalize mt-3">
          Testimonios de nuestros estudiantes
        </p>
      </div>
      <div className="flex flex-col lg:flex-row bg-secondary justify-center lg:justify-between items-center gap-6 mt-8 p-8 rounded-md">
        <div className="border-[5px] border-white p-6 rounded-md flex-shrink-0">
          <div className="relative w-60 h-60 lg:w-96 lg:h-96 rounded-md overflow-hidden">
            <Image src={imgStudents} alt="estudiante" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-start text-white bg-orange-500 p-6 rounded-md lg:ml-12">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
            LUCÍA GARCÍA
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-slate-200 rounded-md p-4">
              <p className="text-blue-900 font-bold">
                Lincenciatura
              </p>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-2xl">
            Mi experiencia en esta escuela ha sido increíble. Los profesores son muy dedicados y siempre están dispuestos a ayudar. Gracias a ellos, estoy preparada para enfrentar nuevos desafíos académicos con confianza.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentsSection;
