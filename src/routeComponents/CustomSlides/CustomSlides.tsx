import { useEffect, useState, type JSX } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

// Components & Assets
import { TerminalEffects } from '@/components';
import { SlideWrapper } from '@/components/SlideWrapper';
import { Slide } from './components/Slide';
import { db, type SlideI } from './components/db';

// Styles
import './CustomSlidesStyle.css';

export function CustomSlidesPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'manual';

  // --- States ---
  const [items, setItems] = useState<SlideI[]>([]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [assetUrls, setAssetUrls] = useState<Record<string, string>>({});

  // --- Asset Management: Convert DB Blobs to usable URLs ---
  const allAssets = useLiveQuery(() => db.assets.toArray());

  useEffect(() => {
    if (!allAssets) return;
    const newUrls: Record<string, string> = {};
    allAssets.forEach((asset) => {
      newUrls[asset.slug] = URL.createObjectURL(asset.blob);
    });
    setAssetUrls(newUrls);

    return () => {
      Object.values(newUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [allAssets]);

  // --- Persistence: Load Project ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await db.project.get('custom-slides');
        if (saved) setItems(saved.items);
      } catch (err) {
        console.error("Failed to load slides:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // --- Persistence: Debounced Auto-Save ---
  useEffect(() => {
    if (!isLoaded || !db.isOpen()) return;

    const timeout = setTimeout(() => {
      db.project.put({ id: 'custom-slides', items }).catch((err) => {
        if (err.name !== 'DatabaseClosedError') console.error("Save error", err);
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [items, isLoaded]);

  // --- Handlers ---
  const addSlide = () => {
    const id = crypto.randomUUID();
    const newSlide: SlideI = {
      id,
      topHeader: 'NEW TOP HEADER',
      bottomHeader: 'NEW BOTTOM HEADER',
      imageSlug: `img-${id}`
    };
    setItems([...items, newSlide]);
  };

  const updateSlide = (id: string, updates: Partial<SlideI>) => {
    setItems(items.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSlide = async (id: string, slug?: string) => {
    if (slug) await db.assets.where('slug').equals(slug).delete();
    setItems(items.filter((s) => s.id !== id));
  };

  const handleFileUpload = async (slug: string, file: File | undefined) => {
    if (!file) return;
    try {
      await db.transaction('rw', db.assets, async () => {
        const existing = await db.assets.where('slug').equals(slug).first();
        if (existing?.id) {
          await db.assets.update(existing.id, { blob: file });
        } else {
          await db.assets.put({ slug, blob: file });
        }
      });
    } catch (err) {
      console.error("File upload failed:", err);
    }
  };

  // --- Rendering Logic ---
  const slideComponents = items.map((item) => (
    <Slide
      key={item.id}
      id={item.id}
      topHeader={item.topHeader}
      bottomHeader={item.bottomHeader}
      imageSlug={assetUrls[item.imageSlug || '']}
    />
  ));

  const pageModes: Record<string, JSX.Element | JSX.Element[]> = {
    'scroll': slideComponents,
    'manual': <SlideWrapper slides={slideComponents} />,
    'simple': slideComponents,
  };

  if (!isLoaded) return <div className="loading-screen">SYNCHRONIZING DATABANKS...</div>;

  return (
    <section className={`spear-page-base terminal-checker ${mode === 'simple' ? 'simple-spear-page-base' : ''}`}>
      {mode !== 'simple' && <TerminalEffects />}
      <div className="static-bg" />

      {/* Toggle Button for Editor */}
      <div
        className="editor-toggle-btn"
        onClick={() => setSettingOpen(!settingOpen)}
      />

      <div className="content">
        {pageModes[mode] || pageModes['manual']}
      </div>

      {/* --- Slide Editor Sidebar --- */}
      {settingOpen && (
        <aside className="wbc-controls slide-editor-sidebar">
          <div className="editor-header">
            <h3>SLIDE CONFIGURATOR</h3>
            <button className="add-item" onClick={addSlide}>+ ADD SLIDE</button>
          </div>

          <div className="wbc-item-settings">
            {items.map((slide) => (
              <div className="wbc-item-settings-row row" key={slide.id}>
                <div className="column full-width">
                  <div className="row space-between">
                    <small>ID: {slide.id.slice(0, 8)}</small>
                    <button className="delete-button" onClick={() => deleteSlide(slide.id, slide.imageSlug)}>REMOVE</button>
                  </div>

                  <input
                    type="text"
                    placeholder="Top Header Text"
                    value={slide.topHeader}
                    onChange={(e) => updateSlide(slide.id, { topHeader: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Bottom Header Text"
                    value={slide.bottomHeader}
                    onChange={(e) => updateSlide(slide.id, { bottomHeader: e.target.value })}
                  />

                  <div className="file-upload-zone">
                    <label>Background Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(slide.imageSlug!, e.target.files?.[0])}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </section>
  );
}
