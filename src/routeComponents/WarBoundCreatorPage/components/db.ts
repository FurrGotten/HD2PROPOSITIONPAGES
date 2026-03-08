import Dexie, { type EntityTable } from 'dexie';

export interface ImageAsset {
  id?: number;
  slug: string;
  blob: Blob;
}

export interface ProjectState {
  id: string;
  items: any[];
  legendary: boolean;
  firstArmourText: string;
  secondArmourText: string;
  bgHex: string;
  bordersHex: string;
  glowHex: string;
  headerBg1Hex: string;
  headerBg2Hex: string;
}

export const db = new Dexie('HD2CreatorDB') as Dexie & {
  assets: EntityTable<ImageAsset, 'id'>;
  project: EntityTable<ProjectState, 'id'>;
};

db.version(1).stores({
  assets: '++id, &slug',
  project: 'id'
});

// This is the TS-safe way to catch global database errors
db.on('close', (err) => {
  console.warn("Dexie Database Error:", err);
});
