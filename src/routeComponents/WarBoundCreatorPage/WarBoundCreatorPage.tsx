import {useState} from 'react';
import {SmallColorPicker} from '@/components';
import {useLiveQuery} from 'dexie-react-hooks';
import {db} from './components/db';

import HD2FULLICON from '@/assets/HD2_full_logo.png';
import './WarBoundCreatorPageStyle.css';

interface subItemType {
  id: string;
  name: string;
  slug: string; // Used to link to IndexedDB
}

interface itemType {
  id: string;
  header: string;
  width: number;
  subitems: subItemType[];
}

type itemsType = itemType[];

export function WarBoundCreatorPage() {
  const [items, setItems] = useState<itemsType>([]);

  const [legendary, setLegendary] = useState(false);

  const [firstArmourText, setFirstArmourText] = useState('');
  const [secondArmourText, setSecondArmourText] = useState('');
  const [bgHex, setBgHex] = useState('#1a2327');
  const [bordersHex, setBordersHex] = useState('#ff3131');
  const [glowHex, setGlowHex] = useState('#ff3131');
  const [headerBg1Hex, setHeaderBg1Hex] = useState('#1a1d21');
  const [headerBg2Hex, setHeaderBg2Hex] = useState('#25282c');

  const allAssets = useLiveQuery(() => db.assets.toArray());

  // Helper to get URL for a specific part of the page
  const getImageUrl = (slug: string) => {
    const asset = allAssets?.find(a => a.slug === slug);
    return asset ? URL.createObjectURL(asset.blob) : null;
  };

  // --- Helper Functions for State ---
  const addItem = () => {
    const id = crypto.randomUUID();
    const newItem: itemType = {
      id,
      header: 'NEW ITEM',
      width: 15,
      subitems: []
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id: string) => {
    // Modify the array by filtering out the specific ID
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<itemType>) => {
    // Map creates a new array, ensuring we don't mutate state directly
    setItems(items.map(item =>
      item.id === id ? {...item, ...updates} : item
    ));
  };

  const updateSubItemName = (parentId: string, subItemId: string, newName: string) => {
    setItems(items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          subitems: item.subitems.map(si =>
            si.id === subItemId ? {...si, name: newName} : si
          )
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
          subitems: [...item.subitems, {
            id: subId,
            name: '',
            slug: `subitem-${subId}`
          }]
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
          return {
            ...item,
            subitems: item.subitems.filter(si => si.id !== subItem.id)
          };
        }
        return item;
      }));
    } catch (error) {
      console.error('Failed to delete sub-item image:', error);
    }
  };

  return <section className="wbc-page-base">
    <section className="warbound-frame"
             style={{backgroundColor: bgHex, backgroundImage: `url(${getImageUrl('warbond-bg')}`}}>
      <img className="hd-full-logo" src={HD2FULLICON} alt="HD2" />
      <div className={`warbond-header ${legendary && 'legendary'}`}>
        <div className="line line-left"></div>
        <span className="text">{legendary ? 'LEGENDARY' : 'PREMIUM'} WARBOND</span>
        <div className="line line-right"></div>
      </div>
      <div className="warbond-img-header">
        {getImageUrl('header') && <img src={getImageUrl('header') || ''} alt="Armour" />}
      </div>
      <div className="wb-content">
        <div className="wb-armor">
          <div className="frame-banner" style={{
            background: `repeating-linear-gradient(
              135deg,
            ${headerBg1Hex}, /* Start dark */ ${headerBg1Hex} 10px, /* End dark  */ ${headerBg2Hex} 10px, /* Start light */ ${headerBg2Hex} 15px
            )`
          }}>
            <span className="frame-banner-text">ARMOR SETS</span>
          </div>
          <div className="wb-armor-frame" style={{
            border: `3px solid  ${bordersHex}`,
            borderImage: `linear-gradient(
            to bottom,
            ${bordersHex} 35%,
            transparent 35%,
            transparent 65%,
            ${bordersHex} 65%
            ) 1`
          }}>
            <div className="wb-armor-inner">
              <div className="bg-image-holder" style={{
                filter: `drop-shadow(0 0 15px ${glowHex})`,
                backgroundImage: `url(${getImageUrl('armour-main')}`
              }}>
                {firstArmourText && <div className="sub-item-label">{firstArmourText}</div>}
                {secondArmourText && <div className="sub-item-label">{secondArmourText}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="wb-items">
          {items.map((item, index) => (
            <div className="wb-item" style={{width: item.width + '%'}} key={index + '-header'}>
              <div className="frame-banner" style={{
                background: `repeating-linear-gradient(
              135deg,
            ${headerBg1Hex}, /* Start dark */ ${headerBg1Hex} 10px, /* End dark  */ ${headerBg2Hex} 10px, /* Start light */ ${headerBg2Hex} 15px
            )`
              }}>
                <span className="frame-banner-text">{item.header}</span>
              </div>
              <div className="wb-item-frame" style={{
                border: `3px solid ${bordersHex}`,
                borderImage: `linear-gradient(
                to bottom,
                ${bordersHex} 45%,
                transparent 45%,
                transparent 55%,
                ${bordersHex} 55%
                ) 1`
              }}>
                <div className="wb-item-inner">
                  {item.subitems.map((sub) => (
                    <div key={sub.id} className="subitem-preview-wrapper"
                         style={{width: 100 / item.subitems.length + '%'}}>
                      {getImageUrl(sub.slug) && (
                        <div className="sub-item" style={{
                          filter: `drop-shadow(0 0 15px ${glowHex})`,
                          backgroundImage: `url(${getImageUrl(sub.slug)}`
                        }}>
                          <div className="sub-item-label">
                            {sub.name.toUpperCase()}
                          </div>
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
    <section className="wbc-controls">
      <div className="wbc-base-settings column">
        <div className="wbc-select-basics space-between row">
          <div className="wbc-select-part column">
            <label>Upload Armour Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  await db.assets.put({slug: 'armour-main', blob: file});
                }
              }}
            />
          </div>
          <div className="wbc-select-part column">
            <label>Upload BG Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  await db.assets.put({slug: 'warbond-bg', blob: file});
                }
              }}
            />
          </div>
          <div className="wbc-select-part column">
            <label>Upload Header Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  await db.assets.put({slug: 'header', blob: file});
                }
              }}
            />
          </div>
          <div className="column">
            <div className="row space-between">
              <div>First Armour name</div>
              <input type="text" placeholder="ARMOUR 1" onChange={(value) => {
                setFirstArmourText(value.currentTarget.value);
              }} defaultValue={firstArmourText} />
            </div>
            <div className="row space-between">
              <div style={{marginRight: 10}}>Second Armour name</div>
              <input type="text" placeholder="ARMOUR 2" onChange={(value) => {
                setSecondArmourText(value.currentTarget.value);
              }} defaultValue={secondArmourText} />
            </div>
          </div>
          <div className="column">
            <div className="row space-between">
              <div>Legendary</div>
              <input type="checkbox" checked={legendary} onChange={(value) => {
                setLegendary(value.currentTarget.checked);
              }} />
            </div>
          </div>
        </div>
        <div className="wbc-select-colors row">
          <div className="wbc-bg-color-select row">
            <div className="label">Background</div>
            <SmallColorPicker color={bgHex} onChange={setBgHex} />
          </div>
          <div className="wbc-border-color-select row">
            <div className="label">Border</div>
            <SmallColorPicker color={bordersHex} onChange={setBordersHex} />
          </div>
          <div className="wbc-glow-color-select row">
            <div className="label">Glow</div>
            <SmallColorPicker color={glowHex} onChange={setGlowHex} />
          </div>
          <div className="wbc-header-bg1-color-select row">
            <div className="label">header bg primary</div>
            <SmallColorPicker color={headerBg1Hex} onChange={setHeaderBg1Hex} />
          </div>
          <div className="wbc-header-bg2-color-select row">
            <div className="label">header bg secondary</div>
            <SmallColorPicker color={headerBg2Hex} onChange={setHeaderBg2Hex} />
          </div>
        </div>
      </div>
      <button className="add-item"
              onClick={addItem}>
        ADD ITEM
      </button>
      <div className="wbc-item-settings">
        {items.map((item, index) => (
          <div className="wbc-item-settings-row row" key={index + '-setting'}>
            <div className="column item-base-settings">
              <input type="text" placeholder="HEADER" onChange={(value) => {
                items[index].header = value.currentTarget.value;
                setItems([...items]);
              }} defaultValue={item.header} />
              <div className="row space-between item-width-setting">
                <button onClick={() => {
                  updateItem(item.id, {width: Math.max(15, item.width - 1)});
                }}>{'<'}</button>
                <button onClick={() => updateItem(item.id, {width: item.width + 1})}>{'>'}</button>
              </div>
            </div>
            <button className="delete-button" onClick={() => deleteItem(item.id)}>X</button>
            <button onClick={() => addSubItem(item.id)}>+ SUB ITEM</button>
            <div className="subitem-settings-list row">
              {item.subitems.map((subitem) => (
                <div className="wbc-subitem space-between column" key={subitem.id}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) await db.assets.put({slug: subitem.slug, blob: file});
                    }}
                  />
                  <input
                    type="text"
                    placeholder="ITEM NAME"
                    value={subitem.name}
                    onChange={(e) => updateSubItemName(item.id, subitem.id, e.target.value)}
                    className="subitem-name-input"
                  />
                  <button
                    className="delete-sub-btn"
                    onClick={() => deleteSubItem(item.id, subitem)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </section>;
}
