import React from "react";
import { picProf1, picProf2, picProf3 } from "@/src/assets/assets";
import Image from "next/image";

const TeacherSection: React.FC = () => {
  const imageHeight = 360; // Ajusta esta altura según tus necesidades

  return (
    <div className="container mx-auto mt-16 py-8 text-black px-8 bg-white rounded-md">
      <p className="text-base lg:text-xl font-medium uppercase">
        nuestra gente
      </p>
      <p className="text-3xl lg:text-5xl font-semibold mt-3">
        Nuestro equipo
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 py-10 lg:py-20">
        <div className="bg-orange-500 rounded-md flex flex-col gap-5 items-center hover:bg-orange-600 transition duration-300">
          <p className="text-2xl text-white font-semibold">Profesores</p>
          <div className="relative w-full rounded-md overflow-hidden" style={{ height: `${imageHeight}px` }}>
            <Image
              src={picProf1}
              alt="Profesor"
              fill={true}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center hover:bg-gray-100 transition duration-300">
          <p className="text-2xl text-black font-semibold">Directivos</p>
          <div className="relative w-full rounded-md overflow-hidden" style={{ height: `${imageHeight}px` }}>
            <Image
              src={picProf2}
              alt="Directivo"
              fill={true}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="bg-blue-500 rounded-md flex flex-col gap-5 items-center hover:bg-blue-600 transition duration-300">
          <p className="text-2xl text-black font-semibold">Personal De Apoyo</p>
          <div className="relative w-full rounded-md overflow-hidden" style={{ height: `${imageHeight}px` }}>
            <Image
              src={picProf3}
              alt="Personal de Apoyo"
              fill={true}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSection;
