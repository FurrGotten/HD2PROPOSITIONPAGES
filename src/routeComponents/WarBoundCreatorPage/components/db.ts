import Dexie, { type EntityTable } from 'dexie';

export interface ImageAsset {
  id?: number;
  slug: string;
  blob: Blob;
}

export const db = new Dexie('HD2CreatorDB') as Dexie & {
  assets: EntityTable<ImageAsset, 'id'>;
};

db.version(1).stores({
  assets: '++id, &slug' // slug is unique so we can easily find specific images
});
