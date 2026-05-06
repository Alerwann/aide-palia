import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function GET() {
  const GIST_URL = process.env.LIEN_GITS;

  try {
    const response = await fetch(GIST_URL, { next: { revalidate: 3600 } });
    // const response = await fetch(GIST_URL, { cache: 'no-store' });

    const csvText = await response.text();
    // console.log(`cvs text : ${csvText} `)
    const parsed = Papa.parse(csvText, {
      header: true,
      delimiter: ';',
      skip_empty_lines: true,
    });
    // console.log(`cvs parsed : ${Object.keys(parsed).error} `)

    const gameData = {};
    parsed.data.forEach((row) => {
      gameData[row['id']] = {
        Nom : row['Nom'],
        id: row['id'],
        Discipline: row['Discipline'],
        Amour: row['Amour'] === true || row['Amour'] === 'true',
        Cadeaux: [
          row['CadeauS1'],
          row['CadeauS2'],
          row['CadeauS3'],
          row['CadeauS4'],
        ],
        Gouts: [
          row['Gouts1'],
          row['Gouts2'],
          row['Gouts3'],
          row['Gouts4'],
          row['Gouts5'],
        ].filter((g) => g),
        planning: Object.fromEntries(
          Object.entries(row).filter(([key]) => key.startsWith('h'))
        ),
      };
    });
    return NextResponse.json(gameData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur de chargement' },
      { status: 500 }
    );
  }
}
