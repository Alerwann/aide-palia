'use client';
import { createContext, useContext, useState, useEffect } from 'react';

//nomme et définnit le context

const PersoContext = createContext();

//création du provider qui a comme paramètre children du layout
export function PersoProvider({ children }) {
  const [persoData, setPersoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // définition de la fonction de charge depuis le back en asynchrone
    async function initData() {
      setIsLoading(true);
      try {
        //appel du back
        const response = await fetch('/api/perso');
        //gestion des erreur
        if (!response.ok) {
          if (response.status === 404)
            throw new Error('Le fichier de données est introuvable.');
          if (response.status === 500)
            throw new Error('Le serveur rencontre un problème technique.');
          throw new Error('Une erreur inconnue est survenue.');
        }

        //si pas d'erreur on stock le json et supprime les erreurs eventuels
        const data = await response.json();
        console.log(data);
        setPersoData(data);
        setError(null);
      } catch (error) {
        //création du message d'erreur
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    //appel réel de la fonction init
    initData();
  }, []);

  // const getAllPersoName = persoData ? Object.keys(persoData) : [];
  const getAllId = persoData ? Object.keys(persoData) : [];

  console.log(`getallId : ${getAllId}`)
  const getAllPersoName= persoData? Object.values(persoData).map((p)=>p.Nom): []
  const getAllPersoObj = persoData?Object.values(persoData):[];
  const extractNames = (data) => data.map((p) => p.Nom);

  const getOneById = (id) => {
    const retunPerso = Object.entries(getAllPersoObj).find((perso) => perso.id == id)
    return retunPerso;
 }


  const getPersoStartWith = (firstLetter) => {
    return getAllPersoName.filter((nom) =>
      nom.toLowerCase().startsWith(firstLetter.toLowerCase())
    );
  };

  const getAllLoverPerso = () => {
    if (!persoData) return [];
    const objList = Object.values(persoData).filter((p) => p.Amour === true);
    return extractNames(objList);
  };

  const findPersoByName = (name) => {
    if (!persoData) return [];
    console.log(`name ${name.toLowerCase()}`);
    const findOne = Object.entries(persoData).filter(
      (p) => p[0].toLowerCase() == name.toLowerCase()
    );
    console.log(findOne[0][1]);
    // const findOne = Object.values(persoData).find((perso) => perso.name == name.toLowerCase());
    // console.log(Object.values(persoData).find((personnage)=>personnage.nom==name))
    // console.log(findOne !=null)
    return findOne[0][1];
  };

  const findPersoById = (id) => {
    if (!persoData) return [];
    const objToReturn = Object.entries(persoData);
    console.log(persoData);
    return objToReturn;
  };
  return (
    <PersoContext.Provider
      value={{
        persoData,
        isLoading,
        error,
        getAllId,
        getAllPersoName,
        getAllPersoObj,
        getOneById,
        getAllLoverPerso,
        getPersoStartWith,
        findPersoByName,
        findPersoById,
      }}
    >
      {children}
    </PersoContext.Provider>
  );
}

export const usePerso = () => useContext(PersoContext);
