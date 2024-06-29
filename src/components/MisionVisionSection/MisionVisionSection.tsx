import React from "react";
import Image, { StaticImageData } from "next/image";
import { imgMision, imgVision } from "@/src/assets/assets";

interface CardOurValuesProps {
  iconSrc: StaticImageData;
  title: string;
  paragraph: string;
}

const CardOurValues: React.FC<CardOurValuesProps> = ({ iconSrc, title, paragraph }) => {
  return (
    <div className="flex flex-col w-full max-w-lg gap-5 h-full text-white border-[2px] border-white bg-secondary rounded-md p-4 shadow-md items-center justify-start">
      {title && <h3 className="text-2xl lg:text-4xl font-extrabold text-center bg-orange-500 w-full rounded-md">{title}</h3>}
      <Image
          src={iconSrc}
          alt={title}
          layout="intrinsic"
          width={420}
          height={360}
          className="rounded-md"
          objectFit="cover"
        />
      <div className="flex-grow flex justify-start  bg-orange-500   h-full rounded-md p-4">
        {paragraph && <p className="text-white font-medium text-start">{paragraph}</p>}
      </div>
    </div>
  );
};

const MisionVisionSection = () => {
  console.log("imgMision",imgMision)
  return (
    <div className="container mx-auto flex flex-col items-center gap-8 justify-center p-8 ">
      <div>
        <p className="text-3xl lg:text-5xl font-semibold text-white text-center mt-3">
          Misión y Visión
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16">
        <CardOurValues
          iconSrc={imgMision}
          title="Misión"
          paragraph="Nuestra misión es ofrecer servicios educativos de alta calidad que preparen a los estudiantes para los desafíos del futuro. Proveemos un ambiente de aprendizaje seguro y estimulante donde se fomenta el desarrollo académico, emocional y social de cada alumno. Nos comprometemos a utilizar métodos pedagógicos innovadores y recursos tecnológicos avanzados para garantizar una educación integral y personalizada que responda a las necesidades individuales de nuestros estudiantes."
        />
        <CardOurValues
          iconSrc={imgVision}
          title="Visión"
          paragraph="Nuestra visión es ser una institución educativa líder reconocida por la excelencia en la enseñanza y el aprendizaje. Aspiramos a desarrollar estudiantes con habilidades críticas, creativas y colaborativas, preparados para ser líderes en un mundo globalizado. Nos esforzamos por crear una comunidad educativa inclusiva y diversa donde cada miembro se sienta valorado y apoyado en su camino hacia el éxito académico y personal. Nos comprometemos a la mejora continua y a la innovación educativa para adaptarnos a las demandas cambiantes de la sociedad."
        />
      </div>
    </div>
  );
};

export default MisionVisionSection;
