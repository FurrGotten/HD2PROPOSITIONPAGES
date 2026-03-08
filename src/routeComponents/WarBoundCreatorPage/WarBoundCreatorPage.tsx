import { useEffect, useState } from 'react';
import { SmallColorPicker } from '@/components';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './components/db';

import HD2FULLICON from '@/assets/HD2_full_logo.png';
import './WarBoundCreatorPageStyle.css';

interface subItemType {
  id: string;
  name: string;
  slug: string;
}

interface itemType {
  id: string;
  header: string;
  width: number;
  subitems: subItemType[];
}

type itemsType = itemType[];

export function WarBoundCreatorPage() {
  // --- States ---
  const [settingOpen, setSettingOpen] = useState(true);
  const [items, setItems] = useState<itemsType>([]);
  const [legendary, setLegendary] = useState(false);
  const [firstArmourText, setFirstArmourText] = useState('');
  const [secondArmourText, setSecondArmourText] = useState('');
  const [bgHex, setBgHex] = useState('#1a2327');
  const [bordersHex, setBordersHex] = useState('#ff3131');
  const [glowHex, setGlowHex] = useState('#ff3131');
  const [headerBg1Hex, setHeaderBg1Hex] = useState('#1a1d21');
  const [headerBg2Hex, setHeaderBg2Hex] = useState('#25282c');
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Asset URL Management ---
  const allAssets = useLiveQuery(() => db.assets.toArray());
  const [assetUrls, setAssetUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!allAssets) return;
    const newUrls: Record<string, string> = {};
    allAssets.forEach(asset => {
      newUrls[asset.slug] = URL.createObjectURL(asset.blob);
    });
    setAssetUrls(newUrls);
    return () => {
      Object.values(newUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [allAssets]);

  // --- Initial Load ---
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const saved = await db.project.get('current');
        if (saved) {
          setItems(saved.items || []);
          setLegendary(saved.legendary);
          setFirstArmourText(saved.firstArmourText);
          setSecondArmourText(saved.secondArmourText);
          setBgHex(saved.bgHex);
          setBordersHex(saved.bordersHex);
          setGlowHex(saved.glowHex);
          setHeaderBg1Hex(saved.headerBg1Hex);
          setHeaderBg2Hex(saved.headerBg2Hex);
        }
      } catch (err) {
        console.error('Load failed', err);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSavedData();
  }, []);

  // --- Debounced Auto-Save ---
  useEffect(() => {
    // Only save if loaded AND the database is actually open
    if (!isLoaded || !db.isOpen()) return;

    const timeout = setTimeout(() => {
      // Double check openness inside the timeout
      if (!db.isOpen()) return;

      db.project.put({
        id: 'current',
        items,
        legendary,
        firstArmourText,
        secondArmourText,
        bgHex,
        bordersHex,
        glowHex,
        headerBg1Hex,
        headerBg2Hex
      }).catch(err => {
        // Ignore errors caused by the DB closing during a refresh
        if (err.name !== 'DatabaseClosedError') {
          console.error("Save error", err);
        }
      });
    }, 1000); // Increased to 1s to give the UI breathing room

    return () => clearTimeout(timeout);
  }, [isLoaded, items, legendary, firstArmourText, secondArmourText, bgHex, bordersHex, glowHex, headerBg1Hex, headerBg2Hex]);

  // --- Original Helper Functions ---
  const addItem = () => {
    const id = crypto.randomUUID();
    setItems([...items, { id, header: 'NEW ITEM', width: 15, subitems: [] }]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<itemType>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const updateSubItemName = (parentId: string, subItemId: string, newName: string) => {
    setItems(items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          subitems: item.subitems.map(si => si.id === subItemId ? { ...si, name: newName } : si)
        };
      }
      return item;
    }));
  };

  const addSubItem = (parentId: string) => {
    setItems(items.map(item => {
      if (item.id === parentId) {
        const subId = crypto.randomUUID();
        return {
          ...item,
          subitems: [...item.subitems, { id: subId, name: '', slug: `subitem-${subId}` }]
        };
      }
      return item;
    }));
  };

  const deleteSubItem = async (parentId: string, subItem: subItemType) => {
    try {
      await db.assets.where('slug').equals(subItem.slug).delete();
      setItems(prevItems => prevItems.map(item => {
        if (item.id === parentId) {
          return { ...item, subitems: item.subitems.filter(si => si.id !== subItem.id) };
        }
        return item;
      }));
    } catch (error) {
      console.error('Failed to delete sub-item image:', error);
    }
  };

  const handleFileUpload = async (slug: string, file: File | undefined) => {
    if (!file) return;

    try {
      // Use an explicit transaction to prevent "trans of null" collisions
      await db.transaction('rw', db.assets, async () => {
        // Find if it exists to overwrite properly
        const existing = await db.assets.where('slug').equals(slug).first();
        if (existing?.id) {
          await db.assets.update(existing.id, { blob: file });
        } else {
          await db.assets.put({ slug, blob: file });
        }
      });
    } catch (err) {
      // This catches the 'DexieError2' you saw in the console
      console.error("Upload transaction failed:", err);
    }
  };

  const resetProject = async () => {
    const confirmReset = window.confirm("Are you sure? This will delete all images and settings.");
    if (!confirmReset) return;

    try {
      // 1. Clear IndexedDB Tables
      await Promise.all([
        db.project.clear(),
        db.assets.clear()
      ]);

      // 2. Reset React States to Defaults
      setItems([]);
      setLegendary(false);
      setFirstArmourText('');
      setSecondArmourText('');
      setBgHex('#1a2327');
      setBordersHex('#ff3131');
      setGlowHex('#ff3131');
      setHeaderBg1Hex('#1a1d21');
      setHeaderBg2Hex('#25282c');

      // Optional: Force a page reload to ensure all Blob URLs are revoked
      // window.location.reload();
    } catch (error) {
      console.error("Failed to reset project:", error);
    }
  };

  if (!isLoaded) return <div className="loading-screen">INITIALIZING WARBOND...</div>;

  return (
    <section className="wbc-page-base">
      <section
        className="warbound-frame"
        onClick={() => setSettingOpen(!settingOpen)}
        style={{ backgroundColor: bgHex, backgroundImage: assetUrls['warbond-bg'] ? `url(${assetUrls['warbond-bg']})` : 'none' }}
      >
        <img className="hd-full-logo" src={HD2FULLICON} alt="HD2" />

        <div className={`warbond-header ${legendary && 'legendary'}`}>
          <div className="line line-left"></div>
          <span className="text">{legendary ? 'LEGENDARY' : 'PREMIUM'} WARBOND</span>
          <div className="line line-right"></div>
        </div>

        <div className="warbond-img-header" style={{ backgroundImage: `url(${assetUrls['header']})` }} />

        <div className="wb-content">
          <div className="wb-armor">
            <div className="frame-banner" style={{ background: `repeating-linear-gradient(135deg, ${headerBg1Hex}, ${headerBg1Hex} 10px, ${headerBg2Hex} 10px, ${headerBg2Hex} 15px)` }}>
              <span className="frame-banner-text">ARMOR SETS</span>
            </div>
            <div className="wb-armor-frame" style={{ border: `3px solid ${bordersHex}`, borderImage: `linear-gradient(to bottom, ${bordersHex} 35%, transparent 35%, transparent 65%, ${bordersHex} 65%) 1` }}>
              <div className="wb-armor-inner">
                <div className="bg-image-holder" style={{ filter: `drop-shadow(0 0 15px ${glowHex})`, backgroundImage: `url(${assetUrls['armour-main']})` }}>
                  {firstArmourText && <div className="sub-item-label">{firstArmourText}</div>}
                  {secondArmourText && <div className="sub-item-label">{secondArmourText}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="wb-items">
            {items.map((item) => (
              <div className="wb-item" style={{ width: item.width + '%' }} key={item.id}>
                <div className="frame-banner" style={{ background: `repeating-linear-gradient(135deg, ${headerBg1Hex}, ${headerBg1Hex} 10px, ${headerBg2Hex} 10px, ${headerBg2Hex} 15px)` }}>
                  <span className="frame-banner-text">{item.header}</span>
                </div>
                <div className="wb-item-frame" style={{ border: `3px solid ${bordersHex}`, borderImage: `linear-gradient(to bottom, ${bordersHex} 45%, transparent 45%, transparent 55%, ${bordersHex} 55%) 1` }}>
                  <div className="wb-item-inner">
                    {item.subitems.map((sub) => (
                      <div key={sub.id} className="subitem-preview-wrapper" style={{ width: 100 / item.subitems.length + '%' }}>
                        {assetUrls[sub.slug] && (
                          <div className="sub-item" style={{ filter: `drop-shadow(0 0 15px ${glowHex})`, backgroundImage: `url(${assetUrls[sub.slug]})` }}>
                            <div className="sub-item-label">{sub.name.toUpperCase()}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {settingOpen && (
        <section className="wbc-controls">
          <div className="wbc-base-settings column">
            <div className="wbc-select-basics space-between row">
              <div className="wbc-select-part column">
                <label>Upload Armour Image:</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload('armour-main', e.target.files?.[0])} />
              </div>
              <div className="wbc-select-part column">
                <label>Upload BG Image:</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload('warbond-bg', e.target.files?.[0])} />
              </div>
              <div className="wbc-select-part column">
                <label>Upload Header Image:</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload('header', e.target.files?.[0])} />
              </div>
              <div className="column">
                <input type="text" placeholder="ARMOUR 1" value={firstArmourText} onChange={(e) => setFirstArmourText(e.target.value)} />
                <input type="text" placeholder="ARMOUR 2" value={secondArmourText} onChange={(e) => setSecondArmourText(e.target.value)} />
              </div>
              <div className="column">
                <label>Legendary</label>
                <input type="checkbox" checked={legendary} onChange={(e) => setLegendary(e.target.checked)} />
              </div>
            </div>
            <div className="wbc-select-colors row">
              <div className="row"><label>BG</label><SmallColorPicker color={bgHex} onChange={setBgHex} /></div>
              <div className="row"><label>Border</label><SmallColorPicker color={bordersHex} onChange={setBordersHex} /></div>
              <div className="row"><label>Glow</label><SmallColorPicker color={glowHex} onChange={setGlowHex} /></div>
              <div className="row"><label>H-BG1</label><SmallColorPicker color={headerBg1Hex} onChange={setHeaderBg1Hex} /></div>
              <div className="row"><label>H-BG2</label><SmallColorPicker color={headerBg2Hex} onChange={setHeaderBg2Hex} /></div>
            </div>
          </div>

          <button className="add-item" onClick={addItem}>ADD ITEM</button>

          <div className="wbc-item-settings">
            {items.map((item) => (
              <div className="wbc-item-settings-row row" key={item.id}>
                <div className="column item-base-settings">
                  <input type="text" value={item.header} onChange={(e) => updateItem(item.id, { header: e.target.value })} />
                  <div className="row space-between">
                    <button onClick={() => updateItem(item.id, { width: Math.max(15, item.width - 1) })}>{'<'}</button>
                    <span>{item.width}%</span>
                    <button onClick={() => updateItem(item.id, { width: item.width + 1 })}>{'>'}</button>
                  </div>
                </div>
                <button className="delete-button" onClick={() => deleteItem(item.id)}>X</button>
                <button onClick={() => addSubItem(item.id)}>+ SUB ITEM</button>
                <div className="subitem-settings-list row">
                  {item.subitems.map((subitem) => (
                    <div className="wbc-subitem column" key={subitem.id}>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(subitem.slug, e.target.files?.[0])} />
                      <input type="text" value={subitem.name} onChange={(e) => updateSubItemName(item.id, subitem.id, e.target.value)} />
                      <button onClick={() => deleteSubItem(item.id, subitem)}>X</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="reset-button" onClick={resetProject} style={{ backgroundColor: '#ff3131', color: 'white', marginTop: '50px', width: '100%' }}>
            RESET ALL DATA
          </button>
        </section>
      )}
    </section>
  );
}
