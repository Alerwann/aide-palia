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
          console.log(data)
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
    console.log(`persoData length ${persoData?.length}`);
  const getAllPerso = persoData ? Object.keys(persoData) : [];

  const extractNames = (data) => data.map((p) => p.Nom);

  const getPersoStartWith = (firstLetter) => {
    return getAllPerso.filter((nom) =>
      nom.toLowerCase().startsWith(firstLetter.toLowerCase())
    );
  };

  const getAllLoverPerso = () => {
    if (!persoData) return [];
    const objList = Object.values(persoData).filter((p) => p.Amour === true);
    return extractNames(objList);
  };

  return (
    <PersoContext.Provider
      value={{
        persoData,
        isLoading,
        error,
        getAllPerso,
        getAllLoverPerso,
        getPersoStartWith,
      }}
    >
      {children}
    </PersoContext.Provider>
  );
}

export const usePerso = () => useContext(PersoContext);