import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="bg-[#f8fafe] grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 lg:gap-10 px-6 sm:px-8 lg:px-12 py-8 lg:py-10 rounded-3xl items-center justify-center  border border-blue-900">
        <div className="bg-blue-200 p-4 h-[340px] rounded-md flex flex-col items-center lg:items-start gap-5 ">
          <div id="locacion" className="rounded-md  shadow-md flex-grow w-full">
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Madrid&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            title="Google Maps"
            className="h-full"
          ></iframe>
          </div>
          <p className="text-sm text-center lg:text-left">
            españa - madrid
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-center rounded-md gap-3 ">
          <div id="redes" className="flex flex-col items-center justify-center lg:justify-start gap-5">
            <p className="text-lg font-medium">Redes</p>
            <div className="flex gap-8">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <BsFacebook className="text-3xl text-gray-500 hover:text-blue-500" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <BsTwitter className="text-3xl text-gray-500 hover:text-blue-500" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <BsInstagram className="text-3xl text-gray-500 hover:text-blue-500" />
            </a>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-center gap-3">
            <p className="text-lg font-medium">Desarrollado Por</p>
            <p className="text-sm">Ruranjo dev.</p>
            
          </div>
          <p className="text-lg font-medium">Legal</p>
          <p className="text-sm">Terms & Conditions</p>
          <p className="text-sm">Privacy policy</p>
          <p className="text-sm">En Propisito Del Desarrollo Comunitario | 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;


/*





*/