'use client';
import { usePerso } from '../context/PersoDataContext';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CardPerso() {
  const {
    getAllPerso,
    getAllLoverPerso,
    getPersoStartWith,
    isLoading,
    error,
    getOneById,
    persoData,
  } = usePerso();

  if (isLoading) return <p>Chargement...</p>;

  if (!persoData) return <p>Personnage non trouvé</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 ">
          {Object.values(persoData).map((perso) => (
              <Link
                  href={`/perso/${perso.id}`}
          key={perso.Nom}
          className="p-3 m-1 grid grid-cols-2 items-center border bg-amber-50 "
        >
          <h2 className='text-xl'> {perso.Nom}</h2>
          <Image
            src={`/assets/images/perso/${perso.id}.webp`}
            width={50}
            height={50}
            alt={`Image de profil ${perso.Nom}`}
          />
        </Link>
      ))}
    </div>
  );
}
