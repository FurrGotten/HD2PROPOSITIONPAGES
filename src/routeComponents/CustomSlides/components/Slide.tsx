import '@/routeComponents/SpearPage/components/CommonStyles.css';
import {Hologram} from '@/components';

import type {SlideI} from './db';

export function Slide ({id, topHeader, bottomHeader, imageSlug}: SlideI) {
  return <section key={id} className="common-spear-base intro-spear-base">
    {topHeader && <div className="text-holder">
      <h1>{topHeader}</h1>
      <h1 className="critical-info"></h1>
    </div>}
    {imageSlug && <div className="image-holder">
      <Hologram>
        <div
          className="slide-image-bg"
          style={{
            height: '40vh', // Adjust height as needed
            width: '100vw',
            backgroundImage: `url(${imageSlug})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
      </Hologram>
    </div>}
    {bottomHeader && <div className="text-holder">
      <h1>{bottomHeader}</h1>
      <h1 className="critical-info"></h1>
    </div>}
  </section>;
}
