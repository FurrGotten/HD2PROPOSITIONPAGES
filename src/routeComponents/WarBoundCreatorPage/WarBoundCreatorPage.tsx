import { useState }  from 'react';
import './WarBoundCreatorPageStyle.css';
import {SmallColorPicker} from '@/components';

interface itemType {
  id: string;
  header: string;
  width: number;
  subitems: {
    name: string;
    image: any;
  }[];
}

type itemsType = itemType[];

export function WarBoundCreatorPage() {
  const [items, setItems] = useState<itemsType>([]);
  // const [armourImage, armourImage] = useState<string>('');

  const [bgHex, setBgHex] = useState('#1a2327');
  const [bordersHex, setBordersHex] = useState('#ff3131');
  // const [glowHex, setGlowHex] = useState('#ff3131');
  // const [headerBg1Hex, setHeaderBg1Hex] = useState('#1a1d21');
  // const [headerBg2Hex, setHeaderBg2Hex] = useState('#25282c');

  // --- Helper Functions for State ---
  const addItem = () => {
    const newItem: itemType = {
      id: crypto.randomUUID(), // Generates a unique ID
      header: 'NEW ITEM',
      width: 15,
      subitems: [{name: 'test', image: ''}]
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

  return <section className="wbc-page-base">
    <section className="warbound-frame" style={{backgroundColor: bgHex}}>
      <div className="warbond-header">
        <div className="line line-left"></div>
        <span className="text">PREMIUM WARBOND</span>
        <div className="line line-right"></div>
      </div>
      <div className="wb-content">
        <div className="wb-armor">
          <div className="frame-banner">
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
            ) 1`,
          }}>
            <div className="wb-armor-inner">

            </div>
          </div>
        </div>
        <div className="wb-items">
          {items.map((item, index) => (
            <div className="wb-item" style={{width: item.width + '%'}} key={index + '-header'}>
              <div className="frame-banner">
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

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="wbc-controls">
      <div className="wbc-base-settings column">
        <div className="wbc-select-armour"></div>
        <div className="wbc-select-colors row">
          <div className="wbc-bg-color-select row">
            <div className="label">Background</div>
            <SmallColorPicker color={bgHex} onChange={setBgHex}/>

          </div>
          <div className="wbc-border-color-select row">
            <div className="label">Border</div>
            <SmallColorPicker color={bordersHex} onChange={setBordersHex}/>
          </div>
          <div className="wbc-glow-color-select row">
            <div className="label">Glow</div>
            <div className="color"/>
          </div>
          <div className="wbc-header-bg1-color-select row">
            <div className="label">header bg primary</div>
            <div className="color"/>
          </div>
          <div className="wbc-header-bg2-color-select row">
            <div className="label">header bg primary secondary</div>
            <div className="color"/>
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
          </div>
        ))}
      </div>
    </section>
  </section>;
}
