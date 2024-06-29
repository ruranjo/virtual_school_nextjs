import React from "react";
import Image, { StaticImageData } from "next/image";
import { iconV1, iconV2, iconV3 } from "@/src/assets/assets";

interface CardOurValuesProps {
  iconSrc: StaticImageData;
  title: string;
  paragraph: string;
}

const CardOurValues: React.FC<CardOurValuesProps> = ({ iconSrc, title, paragraph }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-4 text-white bg-secondary rounded-md shadow-md">
      <Image src={iconSrc} alt="icono de valor" />
      <h3 className="text-2xl font-extrabold text-center">{title}</h3>
      <p className="text-center">{paragraph}</p>
    </div>
  );
};

const ValuesSection = () => {
  return (
    <div className="container px-4 py-20 mx-auto text-center">
      <h2 className="mb-3 text-xl font-medium text-white">EXPLORA CON NOSOTROS</h2>
      <h1 className="mb-12 text-5xl font-semibold text-white">Principios Fundamentales</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        <CardOurValues
          iconSrc={iconV1}
          title="Innovación"
          paragraph="En nuestra institución, priorizamos la innovación en todos los aspectos. Fomentamos el pensamiento creativo y abrazamos nuevas ideas para impulsar el progreso y la excelencia."
        />
        <CardOurValues
          iconSrc={iconV2}
          title="Compromiso con la Comunidad"
          paragraph="Creemos en el poder de la comunidad. Nuestros programas están diseñados para fomentar conexiones fuertes y la participación activa, construyendo una red de apoyo para todos."
        />
        <CardOurValues
          iconSrc={iconV3}
          title="Sostenibilidad"
          paragraph="El compromiso con la sostenibilidad está en el corazón de nuestra misión. Nos esforzamos por implementar prácticas que promuevan el cuidado del medio ambiente y el bienestar a largo plazo."
        />
      </div>
    </div>
  );
};

export default ValuesSection;
