import React from 'react';
import './WarBoundCreatorPageStyle.css';

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
  const [items, setItems] = React.useState<itemsType>([]);
  // const [armourImage, armourImage] = React.useState<string>('');

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
    <section className="warbound-frame">
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
          <div className="wb-armor-frame">
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
              <div className="wb-item-frame">
                <div className="wb-item-inner">

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="wbc-controls">
      <div className="wbc-base-settings">
        <div className="wbc-select-armour"></div>
        <div className="wbc-select-colors"></div>
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
