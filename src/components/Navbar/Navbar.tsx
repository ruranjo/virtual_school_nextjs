"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { logoIcon } from '@/src/assets/assets';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleToggleChangeMenu = () =>{
    setNav(!nav);
  }

  return (
    <div className='flex sticky items-center justify-center bg-white h-20 mt-8 w-full md:w-[90%] px-4 rounded-md z-40'>



      <div className="flex w-full md:flex-row justify-between lg:justify-between items-center gap-5">
        <div className='flex items-end '>
          <div className="flex items-center relative w-full rounded-md overflow-hidden">
            <Image src={logoIcon} alt="logoIcon" width={50} height={50} />
            <Link href="/" passHref legacyBehavior>
              <a className="font-semibold  text-sm"> SOL EDUCATIVO</a>
            </Link>
          </div>
        </div>

        

        <ul className="hidden flex-col md:flex-row justify-center md:flex lg:justify-between items-center text-sm lg:text-base md:gap-2 lg:gap-5">
          <Link href="#mision" passHref legacyBehavior>
            <a className="hover:text-secondary">Mision</a>
          </Link>
          <Link href="#valores" passHref legacyBehavior>
            <a className="hover:text-secondary">Valores</a>
          </Link>
          <Link href="#estudiantes" passHref legacyBehavior>
            <a href="#" className="hover:text-secondary">Estudiantes</a>
          </Link>
          <Link href="#locacion" passHref legacyBehavior>
            <a className="hover:text-secondary">Locacion</a>
          </Link>
          <Link href="#redes" passHref legacyBehavior>
            <a className="hover:text-secondary">Redes</a>
          </Link>
        </ul>

        
      </div>
      
      <div onClick={handleToggleChangeMenu} className="cursor-pointer pr-4 z-50 text-gray-500 md:hidden">
        {nav ? <FaTimes size={30}/> : <FaBars size={30}/>}
      </div>
      

      <Link href="/login" legacyBehavior >
          <a className="btn m-1 md:m-4 text-white bg-secondary border-none p-3 hover:border hover:border-orange-900 hover:bg-orange-400 capitalize rounded-md">
            Entrar
          </a>
        </Link>

      
      
      {/* Navbar movil */}
      {nav && (
        
        <ul onClick={handleToggleChangeMenu} className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-gradient-to-b from-primary to-blue-500 text-white z-50">
          <Link href="#mision" passHref legacyBehavior>
            <a className="hover:text-secondary text-2xl mb-4">Mision</a>
          </Link>
          <Link href="#valores" passHref legacyBehavior>
            <a className="hover:text-secondary text-2xl mb-4">Valores</a>
          </Link>
          <Link href="#historia" passHref legacyBehavior>
            <a href="#" className="hover:text-secondary text-2xl mb-4">Historia</a>
          </Link>
          <Link href="#estudiantes" passHref legacyBehavior>
            <a href="#" className="hover:text-secondary text-2xl mb-4">Estudiantes</a>
          </Link>
          <Link href="#locacion" passHref legacyBehavior>
            <a className="hover:text-secondary text-2xl mb-4">Locacion</a>
          </Link>
          <Link href="#redes" passHref legacyBehavior>
            <a className="hover:text-secondary text-2xl mb-4">Redes</a>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
