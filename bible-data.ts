// Bible Louis Segond - Données complètes
// Ancien Testament + Nouveau Testament

export interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBook {
  name: string;
  abbreviation: string;
  chapters: number;
  testament: "OT" | "NT";
}

export const bibleBooks: BibleBook[] = [
  // Ancien Testament
  { name: "Genèse", abbreviation: "Gn", chapters: 50, testament: "OT" },
  { name: "Exode", abbreviation: "Ex", chapters: 40, testament: "OT" },
  { name: "Lévitique", abbreviation: "Lv", chapters: 27, testament: "OT" },
  { name: "Nombres", abbreviation: "Nb", chapters: 36, testament: "OT" },
  { name: "Deutéronome", abbreviation: "Dt", chapters: 34, testament: "OT" },
  { name: "Josué", abbreviation: "Jos", chapters: 24, testament: "OT" },
  { name: "Juges", abbreviation: "Jg", chapters: 21, testament: "OT" },
  { name: "Ruth", abbreviation: "Rt", chapters: 4, testament: "OT" },
  { name: "1 Samuel", abbreviation: "1S", chapters: 31, testament: "OT" },
  { name: "2 Samuel", abbreviation: "2S", chapters: 24, testament: "OT" },
  { name: "1 Rois", abbreviation: "1R", chapters: 22, testament: "OT" },
  { name: "2 Rois", abbreviation: "2R", chapters: 25, testament: "OT" },
  { name: "1 Chroniques", abbreviation: "1Ch", chapters: 29, testament: "OT" },
  { name: "2 Chroniques", abbreviation: "2Ch", chapters: 36, testament: "OT" },
  { name: "Esdras", abbreviation: "Esd", chapters: 10, testament: "OT" },
  { name: "Néhémie", abbreviation: "Né", chapters: 13, testament: "OT" },
  { name: "Esther", abbreviation: "Est", chapters: 10, testament: "OT" },
  { name: "Job", abbreviation: "Job", chapters: 42, testament: "OT" },
  { name: "Psaumes", abbreviation: "Ps", chapters: 150, testament: "OT" },
  { name: "Proverbes", abbreviation: "Pr", chapters: 31, testament: "OT" },
  { name: "Ecclésiaste", abbreviation: "Ec", chapters: 12, testament: "OT" },
  { name: "Cantique des Cantiques", abbreviation: "Ct", chapters: 8, testament: "OT" },
  { name: "Ésaïe", abbreviation: "Es", chapters: 66, testament: "OT" },
  { name: "Jérémie", abbreviation: "Jr", chapters: 52, testament: "OT" },
  { name: "Lamentations", abbreviation: "Lm", chapters: 5, testament: "OT" },
  { name: "Ézéchiel", abbreviation: "Ez", chapters: 48, testament: "OT" },
  { name: "Daniel", abbreviation: "Dn", chapters: 12, testament: "OT" },
  { name: "Osée", abbreviation: "Os", chapters: 14, testament: "OT" },
  { name: "Joël", abbreviation: "Jl", chapters: 3, testament: "OT" },
  { name: "Amos", abbreviation: "Am", chapters: 9, testament: "OT" },
  { name: "Abdias", abbreviation: "Ab", chapters: 1, testament: "OT" },
  { name: "Jonas", abbreviation: "Jon", chapters: 4, testament: "OT" },
  { name: "Michée", abbreviation: "Mi", chapters: 7, testament: "OT" },
  { name: "Nahum", abbreviation: "Na", chapters: 3, testament: "OT" },
  { name: "Habacuc", abbreviation: "Ha", chapters: 3, testament: "OT" },
  { name: "Sophonie", abbreviation: "So", chapters: 3, testament: "OT" },
  { name: "Aggée", abbreviation: "Ag", chapters: 2, testament: "OT" },
  { name: "Zacharie", abbreviation: "Za", chapters: 14, testament: "OT" },
  { name: "Malachie", abbreviation: "Ml", chapters: 4, testament: "OT" },
  
  // Nouveau Testament
  { name: "Matthieu", abbreviation: "Mt", chapters: 28, testament: "NT" },
  { name: "Marc", abbreviation: "Mc", chapters: 16, testament: "NT" },
  { name: "Luc", abbreviation: "Lc", chapters: 24, testament: "NT" },
  { name: "Jean", abbreviation: "Jn", chapters: 21, testament: "NT" },
  { name: "Actes", abbreviation: "Ac", chapters: 28, testament: "NT" },
  { name: "Romains", abbreviation: "Rm", chapters: 16, testament: "NT" },
  { name: "1 Corinthiens", abbreviation: "1Co", chapters: 16, testament: "NT" },
  { name: "2 Corinthiens", abbreviation: "2Co", chapters: 13, testament: "NT" },
  { name: "Galates", abbreviation: "Ga", chapters: 6, testament: "NT" },
  { name: "Éphésiens", abbreviation: "Ep", chapters: 6, testament: "NT" },
  { name: "Philippiens", abbreviation: "Ph", chapters: 4, testament: "NT" },
  { name: "Colossiens", abbreviation: "Col", chapters: 4, testament: "NT" },
  { name: "1 Thessaloniciens", abbreviation: "1Th", chapters: 5, testament: "NT" },
  { name: "2 Thessaloniciens", abbreviation: "2Th", chapters: 3, testament: "NT" },
  { name: "1 Timothée", abbreviation: "1Tm", chapters: 6, testament: "NT" },
  { name: "2 Timothée", abbreviation: "2Tm", chapters: 4, testament: "NT" },
  { name: "Tite", abbreviation: "Tt", chapters: 3, testament: "NT" },
  { name: "Philémon", abbreviation: "Phm", chapters: 1, testament: "NT" },
  { name: "Hébreux", abbreviation: "Hb", chapters: 13, testament: "NT" },
  { name: "Jacques", abbreviation: "Jc", chapters: 5, testament: "NT" },
  { name: "1 Pierre", abbreviation: "1P", chapters: 5, testament: "NT" },
  { name: "2 Pierre", abbreviation: "2P", chapters: 3, testament: "NT" },
  { name: "1 Jean", abbreviation: "1Jn", chapters: 5, testament: "NT" },
  { name: "2 Jean", abbreviation: "2Jn", chapters: 1, testament: "NT" },
  { name: "3 Jean", abbreviation: "3Jn", chapters: 1, testament: "NT" },
  { name: "Jude", abbreviation: "Jd", chapters: 1, testament: "NT" },
  { name: "Apocalypse", abbreviation: "Ap", chapters: 22, testament: "NT" },
];

// Exemple de versets pour quelques livres (données de démonstration)
// Dans une vraie app, vous téléchargeriez la Bible complète depuis une API ou un fichier JSON
export const bibleVerses: Record<string, Verse[]> = {
  "Genèse": [
    { book: "Genèse", chapter: 1, verse: 1, text: "Au commencement, Dieu créa les cieux et la terre." },
    { book: "Genèse", chapter: 1, verse: 2, text: "La terre était informe et vide; il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux." },
    { book: "Genèse", chapter: 1, verse: 3, text: "Dieu dit: Que la lumière soit! Et la lumière fut." },
  ],
  "Psaumes": [
    { book: "Psaumes", chapter: 23, verse: 1, text: "L'Éternel est mon berger: je ne manquerai de rien." },
    { book: "Psaumes", chapter: 23, verse: 2, text: "Il me fait reposer dans de verts pâturages, Il me dirige près des eaux tranquilles." },
    { book: "Psaumes", chapter: 23, verse: 3, text: "Il restaure mon âme, Il me conduit dans les sentiers de la justice, À cause de son nom." },
  ],
  "Matthieu": [
    { book: "Matthieu", chapter: 5, verse: 3, text: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!" },
    { book: "Matthieu", chapter: 5, verse: 4, text: "Heureux les affligés, car ils seront consolés!" },
    { book: "Matthieu", chapter: 5, verse: 5, text: "Heureux les débonnaires, car ils hériteront la terre!" },
  ],
  "Jean": [
    { book: "Jean", chapter: 3, verse: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
    { book: "Jean", chapter: 8, verse: 12, text: "Jésus leur parla de nouveau, disant: Je suis la lumière du monde; celui qui me suit ne marchera point dans les ténèbres, mais il aura la lumière de la vie." },
  ],
};

// Fonction pour obtenir les versets d'un livre
export function getVerses(bookName: string): Verse[] {
  return bibleVerses[bookName] || [];
}

// Fonction pour obtenir un verset spécifique
export function getVerse(bookName: string, chapter: number, verse: number): Verse | undefined {
  const verses = bibleVerses[bookName] || [];
  return verses.find(v => v.chapter === chapter && v.verse === verse);
}

// Fonction pour chercher des versets par texte
export function searchVerses(query: string): Verse[] {
  const results: Verse[] = [];
  const lowerQuery = query.toLowerCase();
  
  Object.values(bibleVerses).forEach(verses => {
    verses.forEach(verse => {
      if (verse.text.toLowerCase().includes(lowerQuery)) {
        results.push(verse);
      }
    });
  });
  
  return results;
}
