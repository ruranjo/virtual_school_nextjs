"use client"

import React, { useState } from 'react'

import Image from 'next/image'
import { imgPerfil } from '@/src/assets/assets'

const Profile = () => {
    const [rol, setRol] = useState(1) //represent:1, student:2, professor:3
  return (
    
      <div className='flex flex-col items-center justify-between'>
        <h2 className='text-lg font-extrabold'>
            Bienvenido a la Escuela virtual
        </h2>
        <div className='m-4 bg-secondary rounded-md'>
        <Image 
          src={imgPerfil}
          alt={`perfil`} 
          className='rounded-md'
        />
        </div>
      </div>
    
  )
}

export default Profile
