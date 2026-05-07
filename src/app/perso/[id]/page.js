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
      <div className="w-full  flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl"> {perso.Nom} </h1>
        <Image src={pathImg} width={100} height={100} alt="Image de profil " />
        {perso.Amour && (
          <div>
            <p>❤️‍🔥Je suis ouvert(e) aux relations amoureuses</p>
          </div>
        )}
      </div>
      <div className="m-10 w-full grid grid-row-1 md:grid-cols-2  g  bg-amber-300">
        <h2 className="p-5 text-3xl text-center content-center border-2 ">
          Cadeaux de la semaines
        </h2>

        <div className=" flex flex-col md:flex-row items-center border-2 ">
          {perso.Cadeaux.filter((cadeau) => cadeau && cadeau !== '').map(
            (cadeau, index) => (
              <li className="list-none p-5" key={index}>
                {cadeau}
              </li>
            )
          )}
        </div>
        <h2 className="p-5 text-3xl text-center content-center border-2">
          Idées de cadeaux quotidiens
        </h2>

        <div className="flex flex-col md:flex-row items-center border-2">
          {perso.Gouts.filter((gouts) => gouts && gouts !== '').map(
            (gouts, index) => (
              <li className="list-none p-5" key={index}>
                {gouts}
              </li>
            )
          )}
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-3xl text-center">Planning</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        {Object.values(perso.planning).map((horaire, index) => (
          <div className="m-3 p-2 h-full" key={index}>
            <h3 className="font-bold text-center border-2 bg-green-100">
              {index}H
            </h3>
            <p className="h-full border-2 text-center content-center bg-amber-100">{horaire}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
