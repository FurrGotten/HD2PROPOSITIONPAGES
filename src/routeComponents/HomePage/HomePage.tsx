import {Link} from 'react-router-dom';
import SpearIcon from '@/assets/spearRelatedAssets/FAF_SpearIcon.png';

import './HomeStyle.css';
import {Hologram} from '@/components';

export function HomePage() {
  return <section className="home-page-base">
    <div className="static-bg" />
    <div className="content">
      <div className="menu-row">
        <Link className="menu-link" to="/spear">
          <Hologram>
            <img src={SpearIcon} alt="FAF-SPEAR" />
          </Hologram>
        </Link>
        <Link className="menu-link" to="/close_sky_project">
          <Hologram>
            <div className="menu-noise-ico gray-noise" />
          </Hologram>
        </Link>
      </div>
      <div className="menu-row">
        <div className="menu-link">
          {/*<Link to="/">Home</Link>*/}
        </div>
      </div>
    </div>
  </section>;
}
