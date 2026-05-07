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
    persoData,
  } = usePerso();

  console.log(`Slug : ${id}`);
  if (isLoading) return <p>Chargement...</p>;
  const perso = persoData[id];

  const pathImg = `/assets/images/perso/${id}.webp`;
  if (!perso) return <p>Personnage non trouvé</p>;
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full  flex flex-row gap-5 justify-center items-center">
        <Image src={pathImg} width={100} height={100} alt="Image de profil " />
        <h2 className="text-3xl"> {perso.Nom} </h2>
      </div>
      <div className="m-10 w-full grid grid-row-1 md:grid-cols-2  gap-5  bg-amber-300">
        <h2 className="text-3xl text-center">Cadeaux de la semaines</h2>

        <div className="m-5 flex flex-row ">
          {perso.Cadeaux.filter((cadeau) => cadeau && cadeau !== '').map(
            (cadeau, index) => (
              <li className="list-none p-5" key={index}>
                {cadeau}
              </li>
            )
          )}
        </div>
        <h2 className="text-3xl text-center">Idées de cadeaux quotidiens</h2>

        <div className="flex flex-row ">
          {perso.Gouts.filter((gouts) => gouts && gouts !== '').map(
            (gouts, index) => (
              <li className="list-none p-5" key={index}>
                {gouts}
              </li>
            )
          )}
        </div>
      </div>
    </div>
  );
}
