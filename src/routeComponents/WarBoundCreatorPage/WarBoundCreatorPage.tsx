import React from 'react';
import './WarBoundCreatorPageStyle.css';

interface itemType {
  header: string;
  subitems: {
    name: string;
    image: any;
  }[];
}

type itemsType = itemType[];

export function WarBoundCreatorPage() {
  const [items, setItems] = React.useState<itemsType>([]);
  // const [armourImage, armourImage] = React.useState<string>('');

  console.log(items, setItems);

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
          <div className="wb-item">
            <div className="frame-banner">
              <span className="frame-banner-text">ITEM</span>
            </div>
            <div className="wb-item-frame">
              <div className="wb-item-inner">

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>;
}
