'use client';
import Link from 'next/link';
import { usePerso } from '../../context/PersoDataContext'; 

export default function TestPage() {
  const { getAllPersoName, getAllLoverPerso, getPersoStartWith, getAllPersoObj, isLoading, error , persoData} =
    usePerso();

  // 1. Gestion de l'état de chargement
  if (isLoading )
    return <p style={{ padding: '20px' }}>Chargement des données...</p>;

  // 2. Gestion de l'erreur
  if (error)
    return <p style={{ color: 'red', padding: '20px' }}>Erreur : {error}</p>;

  console.log(`console de perso page ${Object.values(persoData).map((p)=>p.Cadeaux)}`);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Page de Test - Données de Palia</h1>

      <section>
        <h2>Tous les personnages ({getAllPersoName.length})</h2>
        <ul>
          {Object.values(persoData).map((perso) => (
            <li key={perso.Nom}>
              <Link href={`/perso/${perso.id}`}>{perso.Nom}</Link>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      <section>
        <h2>Les Amoureux (isRomanceable)</h2>
        <ul>
          {getAllLoverPerso().map((nom) => (
            <li key={nom}>{nom}</li>
          ))}
        </ul>
      </section>

      <hr />

      <section>
        <h2>Noms commençant par "A"</h2>
        <ul>
          {getPersoStartWith('A').map((nom) => (
            <li key={nom}>{nom}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
