import Dexie, { type Table } from 'dexie';

// --- Interfaces ---

export interface SlideI {
  id: string;
  topHeader?: string;
  bottomHeader?: string;
  imageSlug?: string;
}

export interface AssetData {
  id?: number;
  slug: string; // The identifier (e.g., 'slide-uuid')
  blob: Blob;   // The raw image file
}

export interface ProjectState {
  id: string;   // Use 'custom-slides' as the key
  items: SlideI[];
}

// --- Database Configuration ---

export class CustomSlidesDB extends Dexie {
  // 'project' stores the array of slide data
  project!: Table<ProjectState>;
  // 'assets' stores the actual images
  assets!: Table<AssetData>;

  constructor() {
    super('CustomSlidesDB');

    this.version(1).stores({
      project: 'id',
      assets: '++id, slug' // Indexing slug for fast retrieval
    });
  }
}

export const db = new CustomSlidesDB();
