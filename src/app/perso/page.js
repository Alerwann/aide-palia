'use client';
import Link from 'next/link';
import { usePerso } from '../../context/PersoDataContext'; 
import CardPerso from '@/component/card_perso';


export default function AllPerso() {
  const { getAllPersoName, getAllLoverPerso, getPersoStartWith, getAllPersoObj, isLoading, error , persoData} =
    usePerso();

  
  if (isLoading )
    return <p style={{ padding: '20px' }}>Chargement des données...</p>;


  if (error)
    return <p style={{ color: 'red', padding: '20px' }}>Erreur : {error}</p>;



  return (
    <div >


   
        <h2 className='p-5 text-3xl text-center '>Liste des personnages ({getAllPersoName.length})</h2>
        
          <CardPerso/>

   
    </div>
  );
}
