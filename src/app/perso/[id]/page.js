'use client';
import { usePerso } from '../../../context/PersoDataContext';
import * as React from 'react';
import Image from 'next/image';

export default function perso({ params }) {
  const id = React.use(params).id;
  const {
    getAllPerso,
    getAllLoverPerso,
    getPersoStartWith,
    isLoading,
    error,
    getOneById,
  } = usePerso();

  console.log(`Slug : ${id}`);
  const perso = getOneById(id);
 
  console.log(`perso ${perso}`)
  const pathImg = `/assets/images/perso/${id}.webp`;

  return (
    <div>
      {/* <p>nom du perso : {perso.Nom} </p> */}
      <Image
        src={pathImg}
        width={100}
        height={100}
        alt="Image de profil "
      />
    </div>
  );
}
