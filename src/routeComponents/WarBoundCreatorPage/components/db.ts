import Dexie, { type EntityTable } from 'dexie';

export interface ImageAsset {
  id?: number;
  slug: string;
  blob: Blob;
}

// New interface for your project state
export interface ProjectState {
  id: string; // We'll use "current"
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
  project: EntityTable<ProjectState, 'id'>; // New table
};

db.version(1).stores({
  assets: '++id, &slug',
  project: 'id' // Primary key is just 'id'
});
