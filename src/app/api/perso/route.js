import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function GETGist() {
  const GIST_URL = process.env.LIEN_GITS;

  try {
    const response = await fetch(GIST_URL, { next: { revalidate: 3600 } });
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, {
      header: true,
      delimiter: ';',
      skip_empty_lines: true,
    });

    const gameData = {};
    parsed.data.forEach((row) => {
      gameData[row.Nom] = {
        id: row.id,
        discipline: row.Discipline,
        isRomanceable: row['Amour'] === true,
        cadeaux: [
          row['CadeauS1'],
          row['CadeauS2'],
          row['CadeauS3'],
          row['CadeauS4'],
        ],
        gouts: [
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
